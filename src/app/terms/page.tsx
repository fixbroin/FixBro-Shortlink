import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tighter text-primary font-headline md:text-7xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome to FixBro Shortlink!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">1. Acceptance of Terms</h2>
              <p>
                By accessing or using FixBro Shortlink (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">2. Use of the Service</h2>
              <p>
                You agree not to use the Service to shorten URLs that link to content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable. We reserve the right to remove any link without notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">3. Disclaimer of Warranties</h2>
              <p>
                The Service is provided on an "as is" and "as available" basis. We make no warranty that the service will be uninterrupted, timely, secure, or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">4. Limitation of Liability</h2>
              <p>
                In no event shall FixBro Shortlink be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">5. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
