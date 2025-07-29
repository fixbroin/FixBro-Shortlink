import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tighter text-primary font-headline md:text-7xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Your Privacy is Important to Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">1. Information We Collect</h2>
              <p>
                We collect the original URL you provide for shortening. We do not require user accounts, so we do not collect personal information like your name or email address. We may collect anonymous usage data to improve our service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">2. How We Use Information</h2>
              <p>
                The primary use of the information we collect is to provide and maintain the Service. The original URL is stored and associated with the generated short link. We may use anonymous analytics to understand service usage and make improvements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">3. Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, so long as those parties agree to keep this information confidential.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">4. Data Storage</h2>
              <p>
                All link data is stored securely in our database. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">5. Changes to This Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
