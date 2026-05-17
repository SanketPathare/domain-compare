// Registrar configuration with badges, ratings, theme colors, and API modes.
export const REGISTRARS = [
  {
    name: "Porkbun",
    id: "porkbun",
    badge: "CHEAPEST",
    rating: 4.8,
    color: "#f97316", // Porkbun orange
    baseAffiliateUrl: "https://porkbun.com/checkout/register",
    api: "live"
  },
  {
    name: "Namecheap",
    id: "namecheap",
    badge: "POPULAR",
    rating: 4.7,
    color: "#ef4444", // Namecheap red
    baseAffiliateUrl: "https://www.namecheap.com/domains/registration/results/",
    api: "hardcoded"
  },
  {
    name: "GoDaddy",
    id: "godaddy",
    badge: "TRUSTED",
    rating: 4.5,
    color: "#22c55e", // GoDaddy green
    baseAffiliateUrl: "https://www.godaddy.com/domainsearch/find",
    api: "live"
  },
  {
    name: "Hostinger",
    id: "hostinger",
    badge: "BEST VALUE",
    rating: 4.6,
    color: "#a855f7", // Hostinger purple
    baseAffiliateUrl: "https://www.hostinger.com/domain-name-search",
    api: "hardcoded"
  }
];

// Hardcoded backup prices in case of API failure or for "hardcoded" registrars
export const BACKUP_PRICES = {
  porkbun: {
    com: { register: 8.49, renew: 10.99 },
    net: { register: 9.49, renew: 11.99 },
    org: { register: 9.49, renew: 11.99 },
    io:  { register: 39.99, renew: 44.99 },
    co:  { register: 9.99, renew: 24.99 },
    ai:  { register: 79.99, renew: 84.99 }
  },
  namecheap: {
    com: { register: 8.99, renew: 13.99 },
    net: { register: 12.99, renew: 14.99 },
    org: { register: 9.99, renew: 13.99 },
    io:  { register: 39.99, renew: 49.99 },
    co:  { register: 9.99, renew: 26.99 },
    ai:  { register: 89.99, renew: 94.99 }
  },
  godaddy: {
    com: { register: 11.99, renew: 21.99 },
    net: { register: 12.99, renew: 22.99 },
    org: { register: 9.99, renew: 22.99 },
    io:  { register: 44.99, renew: 54.99 },
    co:  { register: 14.99, renew: 29.99 },
    ai:  { register: 99.99, renew: 109.99 }
  },
  hostinger: {
    com: { register: 9.99, renew: 14.99 },
    net: { register: 9.99, renew: 14.99 },
    org: { register: 9.99, renew: 14.99 },
    io:  { register: 39.99, renew: 49.99 },
    co:  { register: 9.99, renew: 24.99 },
    ai:  { register: 79.99, renew: 89.99 }
  }
};

/**
 * Dynamically builds an affiliate URL with proper parameters based on registrar
 * @param {string} registrarId - The unique ID of the registrar (porkbun, godaddy, etc.)
 * @param {string} domain - The target domain name (e.g. example.com)
 * @returns {string} Fully formatted affiliate URL
 */
export function getAffiliateUrl(registrarId, domain) {
  const utmSource = "domaincompare";
  const utmMedium = "referral";
  
  // Fetch codes from environment (or default backup if not set)
  const porkbunCode = process.env.NEXT_PUBLIC_PORKBUN_AFFILIATE_CODE || process.env.PORKBUN_AFFILIATE_CODE || "YOUR_CODE";
  const godaddyCode = process.env.NEXT_PUBLIC_GODADDY_AFFILIATE_CODE || process.env.GODADDY_AFFILIATE_CODE || "YOUR_CODE";
  const namecheapId = process.env.NEXT_PUBLIC_NAMECHEAP_AFFILIATE_ID || process.env.NAMECHEAP_AFFILIATE_ID || "YOUR_ID";
  const hostingerCode = process.env.NEXT_PUBLIC_HOSTINGER_AFFILIATE_CODE || process.env.HOSTINGER_AFFILIATE_CODE || "YOUR_CODE";

  switch (registrarId) {
    case "porkbun":
      return `https://porkbun.com/checkout/register?domain=${encodeURIComponent(domain)}&coupon=${porkbunCode}&utm_source=${utmSource}&utm_medium=${utmMedium}`;
      
    case "namecheap":
      return `https://www.namecheap.com/domains/registration/results/?domain=${encodeURIComponent(domain)}&affID=${namecheapId}&utm_source=${utmSource}&utm_medium=${utmMedium}`;
      
    case "godaddy":
      return `https://www.godaddy.com/domainsearch/find?domainToCheck=${encodeURIComponent(domain)}&isc=${godaddyCode}&utm_source=${utmSource}&utm_medium=${utmMedium}`;
      
    case "hostinger":
      return `https://www.hostinger.com/domain-name-search?domain=${encodeURIComponent(domain)}&ref=${hostingerCode}&utm_source=${utmSource}&utm_medium=${utmMedium}`;
      
    default:
      return `https://porkbun.com/checkout/register?domain=${encodeURIComponent(domain)}&utm_source=${utmSource}&utm_medium=${utmMedium}`;
  }
}
