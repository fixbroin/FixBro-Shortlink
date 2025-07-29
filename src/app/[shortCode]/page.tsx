import { getLinkByShortCode } from '@/lib/db';
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';

export default async function ShortCodeRedirectPage({ params }: { params: { shortCode: string } }) {
  if (!params.shortCode) {
    notFound();
  }

  const link = await getLinkByShortCode(params.shortCode);

  if (link && link.originalUrl) {
    // In a production app, you would also increment a 'clicks' counter here.
    redirect(link.originalUrl);
  } else {
    notFound();
  }
}
