import URLShortenerForm from '@/components/url-shortener-form';

export default function Home() {
  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-5xl font-bold tracking-tighter text-primary font-headline md:text-7xl">
          FixBro Shortlink
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">
          The simplest way to shorten your long URLs. Fast, easy, and free.
        </p>
        <URLShortenerForm />
      </div>
    </div>
  );
}
