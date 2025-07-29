import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Frown } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-background">
      <Frown className="w-24 h-24 text-primary" />
      <h2 className="mt-6 text-4xl font-bold font-headline">Link Not Found</h2>
      <p className="mt-2 text-lg text-muted-foreground">Sorry, the link you are looking for does not exist or has expired.</p>
      <Button asChild className="mt-8 text-lg py-6 px-8 bg-accent hover:bg-accent/90 text-accent-foreground">
        <Link href="/">Create a new link</Link>
      </Button>
    </div>
  );
}
