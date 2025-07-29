'use server';

import { z } from 'zod';
import { generateShortCode } from '@/ai/flows/generate-short-code';
import { addLink, isShortCodeTaken } from '@/lib/db';
import {NextRequest, NextResponse} from 'next/server';

// Common headers for CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const postRequestSchema = z.object({
  originalUrl: z.string().url({ message: 'A valid URL must be provided.' }),
  customAlias: z
    .string()
    .regex(/^[a-zA-Z0-9_-]*$/, {
      message: 'Only letters, numbers, hyphens and underscores are allowed.',
    })
    .max(30, "Alias must be 30 characters or less.")
    .optional()
    .transform(v => v === "" ? undefined : v),
});

const getRequestSchema = z.object({
  url: z.string().url({ message: 'A valid URL must be provided in the `url` query parameter.' }),
});

async function shortenUrl(originalUrl: string, customAlias?: string): Promise<{shortUrl: string, shortCode: string, originalUrl: string} | {message: string, status: number}> {
  let shortCode = customAlias;
  try {
    if (shortCode) {
      const isTaken = await isShortCodeTaken(shortCode);
      if (isTaken) {
        return { message: 'This custom alias is already taken. Please choose another one.', status: 409 };
      }
    } else {
      let retries = 3;
      let isTaken = true;
      let generatedCode: string | undefined = undefined;
      while (retries > 0 && isTaken) {
        const result = await generateShortCode({ originalUrl });
        generatedCode = result.shortCode.replace(/[^a-zA-Z0-9_-]/g, '');
        isTaken = await isShortCodeTaken(generatedCode);
        if (isTaken) {
          console.warn(`Generated short code ${generatedCode} is already taken. Retrying...`);
        }
        retries--;
      }
      if (isTaken) {
        return { message: 'Could not generate a unique short link. Please try again.', status: 500 };
      }
      shortCode = generatedCode;
    }

    if (!shortCode) {
       return { message: 'Short code generation failed.', status: 500 };
    }

    await addLink(originalUrl, shortCode);

    const host = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const newShortUrl = `${host}/${shortCode}`;
    
    return { shortUrl: newShortUrl, originalUrl, shortCode };

  } catch (error) {
    console.error(error);
    return { message: 'An unexpected error occurred. Please try again.', status: 500 };
  }
}

// Handler for preflight OPTIONS requests
export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 204, // No Content
    headers: corsHeaders,
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const validatedFields = getRequestSchema.safeParse({
    url: searchParams.get('url'),
  });

  if (!validatedFields.success) {
    const error = validatedFields.error.flatten().fieldErrors.url?.[0];
    return NextResponse.json({ message: error || 'Invalid request.' }, { status: 400, headers: corsHeaders });
  }

  const result = await shortenUrl(validatedFields.data.url);
  
  if ('status' in result) {
      return NextResponse.json({ message: result.message }, { status: result.status, headers: corsHeaders });
  }

  return NextResponse.json(result, { status: 200, headers: corsHeaders });
}


export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ message: 'Invalid JSON body.' }, { status: 400, headers: corsHeaders });
  }

  const validatedFields = postRequestSchema.safeParse(body);

  if (!validatedFields.success) {
    return NextResponse.json({ message: 'Invalid request body.', errors: validatedFields.error.flatten().fieldErrors }, { status: 400, headers: corsHeaders });
  }

  const { originalUrl, customAlias } = validatedFields.data;
  const result = await shortenUrl(originalUrl, customAlias);
  
  if ('status' in result) {
    return NextResponse.json({ message: result.message }, { status: result.status, headers: corsHeaders });
  }
  
  return NextResponse.json(result, { status: 201, headers: corsHeaders });
}
