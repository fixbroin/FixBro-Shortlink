
"use client";

import { useState, useEffect, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useFormStatus } from "react-dom";
import { Copy, Check, Link as LinkIcon, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createShortLink } from "@/app/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  originalUrl: z.string().url({ message: "Please enter a valid URL." }),
  customAlias: z
    .string()
    .regex(/^[a-zA-Z0-9_-]*$/, {
      message: "Only letters, numbers, hyphens and underscores are allowed.",
    })
    .max(30, "Alias must be 30 characters or less.")
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

const initialState = {
  shortUrl: "",
  message: "",
  type: "success" as "success" | "error",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-6">
      {pending ? "Shortening..." : "Shorten URL"}
    </Button>
  );
}

export default function URLShortenerForm() {
  const [state, formAction] = useActionState(createShortLink, initialState);
  const [isCopied, setIsCopied] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originalUrl: "",
      customAlias: "",
    },
  });
  
  useEffect(() => {
    if (state.type === 'success' && state.shortUrl) {
      form.reset();
    }
  }, [state, form]);

  const handleCopy = () => {
    if (state.shortUrl) {
      navigator.clipboard.writeText(state.shortUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <Card id="shorten" className="w-full mt-8 shadow-2xl bg-card/80 backdrop-blur-sm border-2 border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2 text-2xl font-headline">
          <LinkIcon className="w-8 h-8 text-primary" />
          Create a Short Link
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={formAction} className="space-y-6">
            <FormField
              control={form.control}
              name="originalUrl"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Long URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your long URL here"
                      {...field}
                      className="py-6 text-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customAlias"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Custom Alias (Optional)</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center">
                       <span className="absolute left-3 text-muted-foreground text-sm">/</span>
                       <Input
                        placeholder="e.g., my-cool-link"
                        {...field}
                        className="py-6 text-lg pl-8"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton />
          </form>
        </Form>

        {state.message && (
          <div className="mt-4">
             {state.type === 'error' ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{state.message}</AlertDescription>
                </Alert>
             ) : (
                state.shortUrl && (
                  <Alert variant="default" className="border-primary/50 bg-primary/10">
                     <AlertCircle className="h-4 w-4" />
                     <AlertTitle>Success!</AlertTitle>
                     <AlertDescription>
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
                        <a 
                          href={state.shortUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="font-bold text-primary hover:underline break-all"
                        >
                          {state.shortUrl}
                        </a>
                        <Button onClick={handleCopy} size="sm" variant="outline">
                          {isCopied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                          {isCopied ? "Copied!" : "Copy"}
                        </Button>
                      </div>
                     </AlertDescription>
                  </Alert>
                )
             )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
