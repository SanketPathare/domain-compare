/**
 * Porkbun API Client
 * Official API documentation: https://porkbun.com/api
 */

import { BACKUP_PRICES } from "./prices";

const PORKBUN_API_URL = "https://porkbun.com/api/json/v3";

/**
 * Helper to check if credentials are valid (i.e. not empty, not placeholders)
 */
function hasValidCredentials() {
  const key = process.env.PORKBUN_API_KEY;
  const secret = process.env.PORKBUN_SECRET_KEY;
  
  return key && secret && key !== "your_key" && secret !== "your_secret";
}

/**
 * Fetches pricing for all TLDs from Porkbun API or falls back to static configurations
 * @returns {Promise<Record<string, {register: number, renew: number}>>}
 */
export async function getPorkbunPrices() {
  if (!hasValidCredentials()) {
    console.warn("Porkbun API credentials missing or placeholder. Using backup prices.");
    return BACKUP_PRICES.porkbun;
  }

  try {
    const res = await fetch(`${PORKBUN_API_URL}/pricing/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        apikey: process.env.PORKBUN_API_KEY,
        secretkey: process.env.PORKBUN_SECRET_KEY
      }),
      next: { revalidate: 3600 } // Cache prices for 1 hour to prevent rate limiting
    });

    if (!res.ok) {
      throw new Error(`Porkbun Pricing API responded with status ${res.status}`);
    }

    const data = await res.json();
    
    if (data.status !== "SUCCESS" || !data.pricing) {
      throw new Error(data.message || "Porkbun API returned unsuccessful status.");
    }

    // Format Porkbun pricing to match our standard shape
    const formattedPrices = {};
    const tlds = ["com", "net", "org", "io", "co", "ai"];
    
    tlds.forEach(tld => {
      if (data.pricing[tld]) {
        formattedPrices[tld] = {
          register: parseFloat(data.pricing[tld].registration),
          renew: parseFloat(data.pricing[tld].renewal)
        };
      } else {
        // Fallback to hardcoded if specific TLD is missing from live API response
        formattedPrices[tld] = BACKUP_PRICES.porkbun[tld];
      }
    });

    return formattedPrices;
  } catch (error) {
    console.error("Porkbun pricing fetch error:", error);
    // Graceful fallback to backup prices
    return BACKUP_PRICES.porkbun;
  }
}
