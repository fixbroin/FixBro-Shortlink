
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const pages = [
  '/',
  '/about',
  '/api',
  '/privacy',
  '/terms',
];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://s.wecanfix.in';

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => {
    return `
      <url>
        <loc>${`${siteUrl}${page}`}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
    `;
  }).join('')}
</urlset>`;

fs.writeFileSync(path.resolve(__dirname, 'public/sitemap.xml'), sitemap);

console.log('Sitemap generated successfully!');
