'use server';

/**
 * @fileOverview This file contains the Genkit flow for generating a short code from a given URL using generative AI.
 *
 * - generateShortCode - A function that generates a short code for a given URL.
 * - GenerateShortCodeInput - The input type for the generateShortCode function.
 * - GenerateShortCodeOutput - The return type for the generateShortCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateShortCodeInputSchema = z.object({
  originalUrl: z.string().url().describe('The original URL to shorten.'),
});
export type GenerateShortCodeInput = z.infer<typeof GenerateShortCodeInputSchema>;

const GenerateShortCodeOutputSchema = z.object({
  shortCode: z.string().length(6, {message: "Short code must be 6 characters."}).regex(/^[a-zA-Z0-9]*$/, {message: "Short code must be alphanumeric."}).describe('A 6-character alphanumeric short code.'),
});
export type GenerateShortCodeOutput = z.infer<typeof GenerateShortCodeOutputSchema>;

export async function generateShortCode(input: GenerateShortCodeInput): Promise<GenerateShortCodeOutput> {
  return generateShortCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateShortCodePrompt',
  input: {schema: GenerateShortCodeInputSchema},
  output: {schema: GenerateShortCodeOutputSchema},
  prompt: `You are a short code generator. Given a URL, you will generate a random, unique, 6-character alphanumeric short code.

URL: {{{originalUrl}}}

Short Code:`,
});

const generateShortCodeFlow = ai.defineFlow(
  {
    name: 'generateShortCodeFlow',
    inputSchema: GenerateShortCodeInputSchema,
    outputSchema: GenerateShortCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
