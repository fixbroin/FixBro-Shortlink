import Link from 'next/link';
import { Link2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground mt-auto">
      <div className="container mx-auto p-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Link2 className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg font-headline text-foreground">FixBro Shortlink</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/api" className="hover:text-primary transition-colors">API Docs</Link>
          </nav>
          <div className="text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} FixBro Shortlink. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
