import { services, site } from './content';

// Keep search identity on the public domain, including builds on preview URLs.
export const siteUrl = 'https://usman-farooqi.vercel.app';
export const seoTitle = 'Usman Farooqi | Web Developer & AI Chatbots in Lahore';
export const seoDescription = 'Usman Farooqi, web developer and project manager in Lahore, Pakistan. Custom-coded websites, WordPress development, AI chatbots and website management.';

export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person', '@id': `${siteUrl}/#person`,
      name: site.name, url: `${siteUrl}/`, jobTitle: site.role,
      description: seoDescription,
      image: `${siteUrl}/assets/usman-portrait.jpg`,
      sameAs: [site.linkedin],
      homeLocation: { '@type': 'Place', name: site.location },
      knowsAbout: ['Web development', 'WordPress', 'Custom website development', 'AI chatbots', 'Website management', 'Project management'],
    },
    {
      '@type': 'WebSite', '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`, name: 'Usman Farooqi Portfolio',
      inLanguage: 'en', publisher: { '@id': `${siteUrl}/#person` },
    },
    {
      '@type': 'ProfilePage', '@id': `${siteUrl}/#profile`,
      url: `${siteUrl}/`, name: seoTitle, description: seoDescription,
      isPartOf: { '@id': `${siteUrl}/#website` },
      mainEntity: { '@id': `${siteUrl}/#person` }, inLanguage: 'en',
    },
    {
      '@type': 'OfferCatalog', '@id': `${siteUrl}/#service-catalog`,
      name: 'Website development and digital services',
      itemListElement: services.map(service => ({
        '@type': 'Offer', itemOffered: {
          '@type': 'Service', name: service.title, description: service.body,
          url: `${siteUrl}/#services`, provider: { '@id': `${siteUrl}/#person` },
        },
      })),
    },
  ],
};
