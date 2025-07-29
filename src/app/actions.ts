'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { generateShortCode } from '@/ai/flows/generate-short-code';
import { addLink, isShortCodeTaken } from '@/lib/db';

const formSchema = z.object({
  originalUrl: z.string().url({ message: 'Please enter a valid URL.' }),
  customAlias: z
    .string()
    .regex(/^[a-zA-Z0-9_-]*$/, {
      message: 'Only letters, numbers, hyphens and underscores are allowed.',
    })
    .max(30, "Alias must be 30 characters or less.")
    .optional()
    .transform(v => v === "" ? undefined : v),
});

type State = {
  shortUrl: string;
  message: string;
  type: 'success' | 'error';
};

export async function createShortLink(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = formSchema.safeParse({
    originalUrl: formData.get('originalUrl'),
    customAlias: formData.get('customAlias'),
  });

  if (!validatedFields.success) {
    return {
      shortUrl: '',
      message: validatedFields.error.flatten().fieldErrors.originalUrl?.[0] || validatedFields.error.flatten().fieldErrors.customAlias?.[0] || 'Invalid input.',
      type: 'error',
    };
  }
  
  const { originalUrl, customAlias } = validatedFields.data;
  let shortCode = customAlias;

  try {
    if (shortCode) {
      const isTaken = await isShortCodeTaken(shortCode);
      if (isTaken) {
        return { shortUrl: '', message: 'This custom alias is already taken. Please choose another one.', type: 'error' };
      }
    } else {
      let retries = 3;
      let isTaken = true;
      let generatedCode: string | undefined = undefined;
      while (retries > 0 && isTaken) {
        const result = await generateShortCode({ originalUrl });
        generatedCode = result.shortCode.replace(/[^a-zA-Z0-9_-]/g, '');
        isTaken = await isShortCodeTaken(generatedCode);
        if(isTaken) {
            console.warn(`Generated short code ${generatedCode} is already taken. Retrying...`);
        }
        retries--;
      }
      if(isTaken) {
        return { shortUrl: '', message: 'Could not generate a unique short link. Please try again.', type: 'error' };
      }
      shortCode = generatedCode;
    }

    if (!shortCode) {
        throw new Error("Short code generation failed.");
    }

    await addLink(originalUrl, shortCode);
    
    const host = headers().get('host') || 'FixBro Shortlink';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const newShortUrl = `${protocol}://${host}/${shortCode}`;

    return { shortUrl: newShortUrl, message: 'Link shortened successfully!', type: 'success' };
  } catch (error) {
    console.error(error);
    return { shortUrl: '', message: 'An unexpected error occurred. Please try again.', type: 'error' };
  }
}
