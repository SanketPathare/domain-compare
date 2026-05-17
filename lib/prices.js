import pricesData from "./prices.json";

// Registrar configuration loaded from JSON configuration database
export const REGISTRARS = pricesData.registrars;

// Backup prices loaded from JSON database in case of API failure
export const BACKUP_PRICES = pricesData.backupPrices;

/**
 * Dynamically builds an affiliate URL with proper parameters based on registrar
 * @param {string} registrarId - The unique ID of the registrar (porkbun, godaddy, etc.)
 * @param {string} domain - The target domain name (e.g. example.com)
 * @returns {string} Fully formatted affiliate URL
 */
export function getAffiliateUrl(registrarId, domain) {
  const utmSource = "domaincompare";
  const utmMedium = "referral";
  
  // Fetch codes dynamically from environment (no hardcoded fallback placeholders)
  const porkbunCode = process.env.NEXT_PUBLIC_PORKBUN_AFFILIATE_CODE || process.env.PORKBUN_AFFILIATE_CODE || "";
  const godaddyCode = process.env.NEXT_PUBLIC_GODADDY_AFFILIATE_CODE || process.env.GODADDY_AFFILIATE_CODE || "";
  const namecheapId = process.env.NEXT_PUBLIC_NAMECHEAP_AFFILIATE_ID || process.env.NAMECHEAP_AFFILIATE_ID || "";
  const hostingerCode = process.env.NEXT_PUBLIC_HOSTINGER_AFFILIATE_CODE || process.env.HOSTINGER_AFFILIATE_CODE || "";

  const baseParams = `utm_source=${utmSource}&utm_medium=${utmMedium}`;

  switch (registrarId) {
    case "porkbun": {
      let url = `https://porkbun.com/checkout/register?domain=${encodeURIComponent(domain)}&${baseParams}`;
      if (porkbunCode) url += `&coupon=${encodeURIComponent(porkbunCode)}`;
      return url;
    }
      
    case "namecheap": {
      let url = `https://www.namecheap.com/domains/registration/results/?domain=${encodeURIComponent(domain)}&${baseParams}`;
      if (namecheapId) url += `&affID=${encodeURIComponent(namecheapId)}`;
      return url;
    }
      
    case "godaddy": {
      let url = `https://www.godaddy.com/domainsearch/find?domainToCheck=${encodeURIComponent(domain)}&${baseParams}`;
      if (godaddyCode) url += `&isc=${encodeURIComponent(godaddyCode)}`;
      return url;
    }
      
    case "hostinger": {
      let url = `https://www.hostinger.com/domain-name-search?domain=${encodeURIComponent(domain)}&${baseParams}`;
      if (hostingerCode) url += `&ref=${encodeURIComponent(hostingerCode)}`;
      return url;
    }
      
    default:
      return `https://porkbun.com/checkout/register?domain=${encodeURIComponent(domain)}&${baseParams}`;
  }
}
