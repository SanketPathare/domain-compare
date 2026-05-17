/**
 * GoDaddy API Client
 * Official API documentation: https://developer.godaddy.com/
 */

// Default URLs (can be overridden by GODADDY_API_URL environment variable)
let activeApiUrl = process.env.GODADDY_API_URL || "https://api.godaddy.com/v1";
let isUrlVerified = false;

/**
 * Helper to check if credentials are valid (i.e. not empty, not placeholders)
 */
function hasValidCredentials() {
  const key = process.env.GODADDY_API_KEY;
  const secret = process.env.GODADDY_API_SECRET;
  
  return key && secret && key !== "your_key" && secret !== "your_secret";
}

/**
 * Resolves the correct API endpoint (Production vs OTE sandbox) based on credential validity
 */
async function getVerifiedApiUrl(key, secret) {
  if (isUrlVerified || process.env.GODADDY_API_URL) return activeApiUrl;
  
  try {
    const res = await fetch(`https://api.godaddy.com/v1/domains/available?domain=google.org`, {
      method: "GET",
      headers: {
        "Authorization": `sso-key ${key}:${secret}`,
        "Accept": "application/json"
      }
    });
    
    if (res.status === 401 || res.status === 403) {
      activeApiUrl = "https://api.ote-godaddy.com/v1";
    } else if (res.status === 400) {
      try {
        const errJson = await res.json();
        if (errJson.code === "UNABLE_TO_AUTHENTICATE") {
          activeApiUrl = "https://api.ote-godaddy.com/v1";
        }
      } catch (e) {
        activeApiUrl = "https://api.ote-godaddy.com/v1";
      }
    } else {
      activeApiUrl = "https://api.godaddy.com/v1";
    }
  } catch (err) {
    activeApiUrl = "https://api.ote-godaddy.com/v1";
  }
  
  isUrlVerified = true;
  console.log(`[GoDaddy API] Dynamically verified base URL: ${activeApiUrl}`);
  return activeApiUrl;
}

/**
 * Checks domain availability using the GoDaddy API or a smart fallback
 * @param {string} domain - Domain name to check (e.g. google.com)
 * @returns {Promise<{available: boolean, domain: string, price?: number}>}
 */
export async function checkGoDaddyAvailability(domain) {
  if (!hasValidCredentials()) {
    console.warn("GoDaddy API credentials missing or placeholder. Using mock data.");
    
    const cleanDomain = domain.toLowerCase().trim();
    const popularTaken = ["google", "facebook", "twitter", "microsoft", "apple", "amazon", "netflix", "github", "openai", "vercel"];
    const nameWithoutTld = cleanDomain.split(".")[0];
    const isPopular = popularTaken.includes(nameWithoutTld);
    const isShort = nameWithoutTld.length <= 4;
    
    let available = true;
    if (isPopular) {
      available = false;
    } else if (isShort) {
      available = Math.random() > 0.85;
    } else {
      const charSum = nameWithoutTld.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
      available = charSum % 3 !== 0;
    }

    return {
      domain: cleanDomain,
      available: available,
    };
  }

  const key = process.env.GODADDY_API_KEY;
  const secret = process.env.GODADDY_API_SECRET;
  const baseUrl = await getVerifiedApiUrl(key, secret);

  try {
    const res = await fetch(`${baseUrl}/domains/available?domain=${encodeURIComponent(domain)}`, {
      method: "GET",
      headers: {
        "Authorization": `sso-key ${key}:${secret}`,
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
      price: data.price ? data.price / 1000000 : null
    };
  } catch (error) {
    console.error("GoDaddy availability check error:", error);
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
    const alternateTlds = ["com", "net", "org", "io", "co", "ai", "tech", "app", "dev", "xyz"];
    const suffixes = ["hq", "app", "get", "go", "try", "online", "hub", "world", "plus", "link"];
    
    const suggestions = [];

    alternateTlds.forEach(tld => {
      if (tld !== originalTld) {
        suggestions.push(`${name}.${tld}`);
      }
    });

    suffixes.forEach(suffix => {
      suggestions.push(`${name}${suffix}.${originalTld}`);
      suggestions.push(`${suffix}${name}.${originalTld}`);
    });

    return suggestions.sort(() => 0.5 - Math.random()).slice(0, 6);
  }

  const key = process.env.GODADDY_API_KEY;
  const secret = process.env.GODADDY_API_SECRET;
  const baseUrl = await getVerifiedApiUrl(key, secret);

  try {
    const res = await fetch(`${baseUrl}/domains/suggest?query=${encodeURIComponent(name)}&tlds=${originalTld}&limit=8`, {
      method: "GET",
      headers: {
        "Authorization": `sso-key ${key}:${secret}`,
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
    return [
      `${name}hq.${originalTld}`,
      `${name}app.${originalTld}`,
      `get${name}.${originalTld}`,
      `${name}.${originalTld === "com" ? "net" : "com"}`
    ];
  }
}
