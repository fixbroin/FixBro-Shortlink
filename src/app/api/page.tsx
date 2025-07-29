import { Code, Terminal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function ApiDocsPage() {
  const domain = process.env.NEXT_PUBLIC_SITE_URL || 'http://your-domain.com';

  const simpleExampleRequest = `
fetch('${domain}/api/shorten?url=https://your-long-url.com')
  .then(res => res.json())
  .then(data => console.log(data.shortUrl));
  `;
  
  const advancedExampleRequest = `
fetch('${domain}/api/shorten', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    originalUrl: 'https://example.com/my-super-long-url-to-shorten',
    customAlias: 'my-cool-link' // optional
  }),
})
.then(res => res.json())
.then(data => console.log(data));
  `;

  const exampleResponse = `
{
  "shortUrl": "${domain}/my-cool-link",
  "originalUrl": "https://example.com/my-super-long-url-to-shorten",
  "shortCode": "my-cool-link"
}
  `;
  
  return (
    <main className="flex min-h-screen w-full flex-col items-center p-4 bg-background">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
            <h1 className="text-5xl font-bold tracking-tighter text-primary font-headline md:text-7xl">
                FixBro Shortlink API
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                Integrate our URL shortening service into your own application.
            </p>
            <Button asChild className="mt-6">
                <Link href="/">Back to Home</Link>
            </Button>
        </div>

        <Card className="shadow-lg mb-8">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                    <Code className="w-8 h-8 text-primary"/>
                    Simple API (GET Request)
                </CardTitle>
                <CardDescription>
                    The easiest way to shorten a URL without any complex setup.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                        <Terminal className="w-5 h-5"/>
                        HTTP Request
                    </h3>
                    <div className="flex items-center gap-4">
                        <Badge variant="secondary">GET</Badge>
                        <code className="text-sm bg-muted p-2 rounded-md">/api/shorten?url=&lt;YOUR_URL&gt;</code>
                    </div>
                </div>
                 <div>
                    <h3 className="font-semibold text-lg mb-2">Query Parameters</h3>
                    <div className="space-y-2 text-sm">
                        <p><code className="bg-muted p-1 rounded-sm">url</code> (string, required): The URL you want to shorten. Make sure it's URL-encoded.</p>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-lg mb-2">Example Usage (JavaScript)</h3>
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                        <code>{simpleExampleRequest.trim()}</code>
                    </pre>
                </div>
            </CardContent>
        </Card>

        <Separator className="my-12"/>

        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                    <Code className="w-8 h-8 text-primary"/>
                    Advanced API (POST Request)
                </CardTitle>
                <CardDescription>
                    For more control, including setting custom aliases for your links.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                        <Terminal className="w-5 h-5"/>
                        HTTP Request
                    </h3>
                    <div className="flex items-center gap-4">
                        <Badge>POST</Badge>
                        <code className="text-sm bg-muted p-2 rounded-md">/api/shorten</code>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-lg mb-2">Request Body (JSON)</h3>
                    <div className="space-y-2 text-sm">
                        <p><code className="bg-muted p-1 rounded-sm">originalUrl</code> (string, required): The URL you want to shorten.</p>
                        <p><code className="bg-muted p-1 rounded-sm">customAlias</code> (string, optional): A custom alias for your short link.</p>
                    </div>
                </div>
                
                <div>
                    <h3 className="font-semibold text-lg mb-2">Example Usage (JavaScript)</h3>
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                        <code>{advancedExampleRequest.trim()}</code>
                    </pre>
                </div>

                <div>
                    <h3 className="font-semibold text-lg mb-2">Example Success Response</h3>
                     <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                        <code>{exampleResponse.trim()}</code>
                    </pre>
                </div>
            </CardContent>
        </Card>

      </div>
    </main>
  );
}
