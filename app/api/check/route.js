import { NextResponse } from "next/server";
import { checkGoDaddyAvailability, getGoDaddySuggestions } from "@/lib/godaddy";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const domainQuery = searchParams.get("domain");

    if (!domainQuery) {
      return NextResponse.json(
        { error: "Domain parameter is required." },
        { status: 400 }
      );
    }

    // Basic domain normalization & clean-up
    let domain = domainQuery.toLowerCase().trim();
    
    // Auto-remove protocol and 'www.' if present
    domain = domain.replace(/^(https?:\/\/)?(www\.)?/, "");

    // Simple regex validation for basic domain name format
    const domainRegex = /^[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!domainRegex.test(domain)) {
      return NextResponse.json(
        { error: "Invalid domain format. Please enter a valid domain (e.g., example.com)." },
        { status: 400 }
      );
    }

    // Call our GoDaddy API integration (with its built-in fallback)
    const availability = await checkGoDaddyAvailability(domain);
    
    // Get suggestions
    const suggestions = await getGoDaddySuggestions(domain);

    return NextResponse.json({
      domain: availability.domain,
      available: availability.available,
      suggestions: suggestions,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("API Route Check Error:", error);
    return NextResponse.json(
      { error: "Internal server error while checking domain." },
      { status: 500 }
    );
  }
}
