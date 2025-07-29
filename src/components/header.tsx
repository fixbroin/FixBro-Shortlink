import Link from 'next/link';
import { Button } from './ui/button';
import { Link2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-card shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl font-headline">
          <Link2 className="w-6 h-6" />
          FixBro Shortlink
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/about">About</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/api">API</Link>
          </Button>
        </nav>
        <Button asChild className="bg-accent hover:bg-secondary text-accent-foreground hover:text-black">
          <Link href="/#shorten">Shorten a Link</Link>
        </Button>
      </div>
    </header>
  );
}
