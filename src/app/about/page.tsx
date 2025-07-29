import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Rocket } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tighter text-primary font-headline md:text-7xl">
            About FixBro Shortlink
          </h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto">
            We believe in making the web a more connected and accessible place, one short link at a time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex flex-col items-center gap-4 text-2xl">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To provide a fast, simple, and reliable URL shortening service for everyone, from individuals to large enterprises.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex flex-col items-center gap-4 text-2xl">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We envision a world where sharing information is seamless. Our technology empowers users to share links effortlessly across any platform.
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex flex-col items-center gap-4 text-2xl">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Rocket className="w-8 h-8 text-primary" />
                </div>
                Our Technology
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Built with modern, scalable technologies including Next.js and Firebase, and powered by generative AI for unique link creation.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
