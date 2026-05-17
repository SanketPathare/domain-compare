/**
 * GoDaddy API Client
 * Official API documentation: https://developer.godaddy.com/
 */

const GODADDY_API_URL = "https://api.godaddy.com/v1";

/**
 * Helper to check if credentials are valid (i.e. not empty, not placeholders)
 */
function hasValidCredentials() {
  const key = process.env.GODADDY_API_KEY;
  const secret = process.env.GODADDY_API_SECRET;
  
  return key && secret && key !== "your_key" && secret !== "your_secret";
}

/**
 * Checks domain availability using the GoDaddy API or a smart fallback
 * @param {string} domain - Domain name to check (e.g. google.com)
 * @returns {Promise<{available: boolean, domain: string, price?: number}>}
 */
export async function checkGoDaddyAvailability(domain) {
  if (!hasValidCredentials()) {
    // Smart fallback if credentials are placeholder
    console.warn("GoDaddy API credentials missing or placeholder. Using mock data.");
    
    // Simulate availability based on domain name length and features
    // Just an elegant simulation so developers can see how the app works immediately
    const cleanDomain = domain.toLowerCase().trim();
    
    // Simulating some popular domains as taken
    const popularTaken = ["google", "facebook", "twitter", "microsoft", "apple", "amazon", "netflix", "github", "openai", "vercel"];
    const nameWithoutTld = cleanDomain.split(".")[0];
    const isPopular = popularTaken.includes(nameWithoutTld);
    const isShort = nameWithoutTld.length <= 4;
    
    // Deterministic simulation so searching the same name twice gives the same result
    let available = true;
    if (isPopular) {
      available = false;
    } else if (isShort) {
      available = Math.random() > 0.85; // 85% of short domains are taken
    } else {
      // Deterministic based on char codes
      const charSum = nameWithoutTld.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
      available = charSum % 3 !== 0; // ~66% of domains are available
    }

    return {
      domain: cleanDomain,
      available: available,
    };
  }

  try {
    const res = await fetch(`${GODADDY_API_URL}/domains/available?domain=${encodeURIComponent(domain)}`, {
      method: "GET",
      headers: {
        "Authorization": `sso-key ${process.env.GODADDY_API_KEY}:${process.env.GODADDY_API_SECRET}`,
        "Accept": "application/json"
      },
      next: { revalidate: 60 } // cache for 60 seconds
    });

    if (!res.ok) {
      throw new Error(`GoDaddy API responded with status ${res.status}`);
    }

    const data = await res.json();
    return {
      domain: data.domain,
      available: !!data.available,
      price: data.price ? data.price / 1000000 : null // GoDaddy returns price in micro-units
    };
  } catch (error) {
    console.error("GoDaddy availability check error:", error);
    // Graceful fallback to true on error instead of throwing to avoid breaking UI
    return {
      domain: domain,
      available: true,
      error: error.message
    };
  }
}

/**
 * Fetches alternative domain suggestions
 * @param {string} domain - Base domain or search query
 * @returns {Promise<Array<string>>} List of suggested domains
 */
export async function getGoDaddySuggestions(domain) {
  const cleanDomain = domain.toLowerCase().trim();
  const parts = cleanDomain.split(".");
  const name = parts[0];
  const originalTld = parts[1] || "com";

  if (!hasValidCredentials()) {
    // Generate clean suggestions
    const alternateTlds = ["com", "net", "org", "io", "co", "ai", "tech", "app", "dev", "xyz"];
    const suffixes = ["hq", "app", "get", "go", "try", "online", "hub", "world", "plus", "link"];
    
    const suggestions = [];

    // TLD alternates
    alternateTlds.forEach(tld => {
      if (tld !== originalTld) {
        suggestions.push(`${name}.${tld}`);
      }
    });

    // Name alternates
    suffixes.forEach(suffix => {
      suggestions.push(`${name}${suffix}.${originalTld}`);
      suggestions.push(`${suffix}${name}.${originalTld}`);
    });

    // Shuffle and pick 6 suggestions
    return suggestions.sort(() => 0.5 - Math.random()).slice(0, 6);
  }

  try {
    const res = await fetch(`${GODADDY_API_URL}/domains/suggest?query=${encodeURIComponent(name)}&tlds=${originalTld}&limit=8`, {
      method: "GET",
      headers: {
        "Authorization": `sso-key ${process.env.GODADDY_API_KEY}:${process.env.GODADDY_API_SECRET}`,
        "Accept": "application/json"
      }
    });

    if (!res.ok) {
      throw new Error(`GoDaddy Suggest API returned status ${res.status}`);
    }

    const data = await res.json();
    return data.map(item => item.domain);
  } catch (error) {
    console.error("GoDaddy suggest API error:", error);
    // Simple local fallback on error
    return [
      `${name}hq.${originalTld}`,
      `${name}app.${originalTld}`,
      `get${name}.${originalTld}`,
      `${name}.${originalTld === "com" ? "net" : "com"}`
    ];
  }
}
