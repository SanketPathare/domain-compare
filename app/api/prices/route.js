import { NextResponse } from "next/server";
import { getPorkbunPrices } from "@/lib/porkbun";
import { BACKUP_PRICES, REGISTRARS, getAffiliateUrl } from "@/lib/prices";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawTld = searchParams.get("tld") || "";
    
    // Normalize TLD (e.g., remove starting dot: .com -> com)
    const tld = rawTld.toLowerCase().replace(/^\./, "").trim();

    // Fetch Porkbun prices (returns live prices or falls back to backup)
    const porkbunPrices = await getPorkbunPrices();

    // Combine all price configurations
    const combinedPrices = {
      porkbun: porkbunPrices,
      namecheap: BACKUP_PRICES.namecheap,
      godaddy: BACKUP_PRICES.godaddy,
      hostinger: BACKUP_PRICES.hostinger
    };

    // If no TLD is requested, return the entire nested price matrix
    if (!tld) {
      return NextResponse.json({
        prices: combinedPrices,
        timestamp: new Date().toISOString()
      });
    }

    // List of supported TLDs
    const supportedTlds = ["com", "net", "org", "io", "co", "ai"];
    
    // Fallback to "com" if TLD is not supported/recognized
    const activeTld = supportedTlds.includes(tld) ? tld : "com";

    // Map the registrar list with the corresponding pricing details for this specific TLD
    const results = REGISTRARS.map(registrar => {
      const registrarId = registrar.id;
      
      // Get price details from combined prices
      const registrarPricing = combinedPrices[registrarId]?.[activeTld] || BACKUP_PRICES[registrarId][activeTld];
      
      // Generate the custom affiliate link for this search domain + registrar
      const domainName = searchParams.get("domain") || `example.${activeTld}`;
      const affiliateLink = getAffiliateUrl(registrarId, domainName);

      return {
        id: registrar.id,
        name: registrar.name,
        badge: registrar.badge,
        rating: registrar.rating,
        color: registrar.color,
        api: registrar.api,
        tld: activeTld,
        register: registrarPricing.register,
        renew: registrarPricing.renew,
        affiliate: affiliateLink
      };
    });

    return NextResponse.json({
      tld: activeTld,
      domain: searchParams.get("domain") || "",
      results: results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("API Route Prices Error:", error);
    return NextResponse.json(
      { error: "Internal server error while fetching prices." },
      { status: 500 }
    );
  }
}
