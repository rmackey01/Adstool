export type CreativeCategory =
  | "House Wash"
  | "Roof Clean"
  | "Driveway Clean"
  | "Gutter Clean"
  | "Fence / Deck"
  | "Commercial";

export type CreativeAngle =
  | "Before / After"
  | "Pain Point"
  | "Social Proof"
  | "Seasonal"
  | "Authority"
  | "Local Offer";

export type CreativeFormat = "Static" | "Carousel" | "Video";

export type CreativeItem = {
  id: string;
  title: string;
  category: CreativeCategory;
  angle: CreativeAngle;
  format: CreativeFormat;
  badge: string;
  hook: string;
  summary: string;
  researchNotes: string[];
  copy: {
    headline: string;
    primaryText: string;
    cta: string;
  };
  visualDirection: string;
  deliverables: string[];
};

export const categories: CreativeCategory[] = [
  "House Wash",
  "Roof Clean",
  "Driveway Clean",
  "Gutter Clean",
  "Fence / Deck",
  "Commercial",
];

export const angles: CreativeAngle[] = [
  "Before / After",
  "Pain Point",
  "Social Proof",
  "Seasonal",
  "Authority",
  "Local Offer",
];

export const formats: CreativeFormat[] = ["Static", "Carousel", "Video"];

export const creativeItems: CreativeItem[] = [
  {
    id: "house-wash-trust",
    title: "Trusted House Wash Proof Pack",
    category: "House Wash",
    angle: "Social Proof",
    format: "Static",
    badge: "Top 1%",
    hook: "Homeowners buy trust before they buy pressure washing.",
    summary:
      "A credibility-first layout that leads with reviews, service area, and a clean before/after proof block.",
    researchNotes: [
      "High-performing home service ads often lead with proof, not price.",
      "The strongest hook is local relevance plus a simple service promise.",
      "Clear service-area cues improve click intent for neighborhood buyers.",
    ],
    copy: {
      headline: "Your Home Can Look New Again This Week",
      primaryText:
        "Streaks, mildew, and grime build up fast in the South. Our house wash restores curb appeal without damaging siding, paint, or landscaping.",
      cta: "Get a Free Estimate",
    },
    visualDirection:
      "Split-screen exterior image with a bold proof ribbon, star-rating badge, and a brandable CTA bar.",
    deliverables: [
      "Editable PSD-style layout",
      "Primary text variants",
      "Headline variants",
      "Brand kit overlay slots",
    ],
  },
  {
    id: "roof-clean-safety",
    title: "Roof Cleaning Safety Angle",
    category: "Roof Clean",
    angle: "Authority",
    format: "Carousel",
    badge: "Agency Favorite",
    hook: "The roof cleaning offer that feels professional, not aggressive.",
    summary:
      "Positions the business as the safe choice with method, materials, and warranty language.",
    researchNotes: [
      "Authority framing outperforms generic cleaning language in higher-ticket services.",
      "Roof buyers need reassurance about plant protection and treatment methods.",
      "Education-led creatives tend to reduce pricing objections.",
    ],
    copy: {
      headline: "Safe Roof Cleaning for Lasting Results",
      primaryText:
        "We use a low-pressure roof cleaning process designed to remove organic growth, protect shingles, and leave your property looking cared for.",
      cta: "Book Roof Evaluation",
    },
    visualDirection:
      "Three-panel carousel: problem, method, result, with icon callouts and a polished contractor aesthetic.",
    deliverables: [
      "Carousel slide structure",
      "Editable caption bank",
      "Logo and color swap zones",
      "Compliance note block",
    ],
  },
  {
    id: "driveway-before-after",
    title: "Driveway Before / After Breakout",
    category: "Driveway Clean",
    angle: "Before / After",
    format: "Video",
    badge: "Scroll Stopper",
    hook: "One dramatic transformation does most of the selling.",
    summary:
      "Uses a simple reveal structure that is easy to brand and easy to adapt for reels or stories.",
    researchNotes: [
      "Before/after demos remain one of the fastest ways to communicate value.",
      "Fast visual payoff supports short-form video placements.",
      "Simple CTA language works best when the transformation is obvious.",
    ],
    copy: {
      headline: "Watch This Driveway Come Back to Life",
      primaryText:
        "Years of oil, tire marks, and algae disappear with our professional driveway clean. It is the easiest way to refresh the front of your property.",
      cta: "See Pricing",
    },
    visualDirection:
      "Fast cut reveal with a swipe transition, spray sound cues, and overlaid neighborhood proof text.",
    deliverables: [
      "Video script",
      "Hook variations",
      "Thumbnail text",
      "Editable end card",
    ],
  },
  {
    id: "gutter-seasonal",
    title: "Seasonal Gutter Clean Reminder",
    category: "Gutter Clean",
    angle: "Seasonal",
    format: "Static",
    badge: "Lead Gen",
    hook: "The best gutter ad reminds people before a problem becomes expensive.",
    summary:
      "Seasonal offer that ties leaf buildup and water overflow to simple homeowner urgency.",
    researchNotes: [
      "Seasonality increases relevance for maintenance-based services.",
      "Problem education is stronger than generic discount language here.",
      "A clean checklist visual helps users understand the scope immediately.",
    ],
    copy: {
      headline: "Gutter Cleaning Before the Next Heavy Rain",
      primaryText:
        "Clogged gutters can lead to overflow, stains, and water damage. Get your gutters cleared and flowing before the weather turns.",
      cta: "Reserve Service",
    },
    visualDirection:
      "Calendar-led hero with a checklist overlay, service icons, and a weather-based urgency strip.",
    deliverables: [
      "Static ad layout",
      "Offer swap block",
      "Brand-safe disclaimer area",
      "Lead form prompt",
    ],
  },
  {
    id: "fence-local-offer",
    title: "Fence and Deck Local Offer",
    category: "Fence / Deck",
    angle: "Local Offer",
    format: "Carousel",
    badge: "Easy Sell",
    hook: "A local offer with a backyard transformation angle.",
    summary:
      "A flexible promo concept that can be used for decks, fences, patios, and outdoor living spaces.",
    researchNotes: [
      "Outdoor living projects convert well when they feel seasonal and local.",
      "Offer framing works when tied to service area and fast turnaround.",
      "Carousel format helps show texture change and finish quality.",
    ],
    copy: {
      headline: "Restore Your Fence or Deck This Weekend",
      primaryText:
        "Sun, mold, and weather wear down outdoor wood fast. We clean and brighten wood surfaces so your yard feels ready for guests again.",
      cta: "Check Availability",
    },
    visualDirection:
      "Warm backyard lifestyle photography with strong typography, local badge, and product-style texture focus.",
    deliverables: [
      "Carousel copy",
      "Promo badge options",
      "Editable quote card",
      "Color palette guidance",
    ],
  },
  {
    id: "commercial-authority",
    title: "Commercial Property Authority Pack",
    category: "Commercial",
    angle: "Authority",
    format: "Static",
    badge: "High Ticket",
    hook: "Commercial buyers want reliability, process, and professionalism.",
    summary:
      "A B2B-oriented layout built around insured service, scheduling confidence, and property-maintenance outcomes.",
    researchNotes: [
      "Commercial service ads need operational credibility more than emotional copy.",
      "Decision makers respond to clean process language and fast response times.",
      "This type of offer benefits from a more polished, restrained design system.",
    ],
    copy: {
      headline: "Commercial Pressure Washing with a Professional Standard",
      primaryText:
        "Keep storefronts, sidewalks, and facilities clean with a reliable pressure washing partner that shows up on time and works around operations.",
      cta: "Request Bid",
    },
    visualDirection:
      "Muted industrial palette, facility imagery, and a concise scope-of-work panel.",
    deliverables: [
      "Bid request pack",
      "Facility use cases",
      "Service scope bullets",
      "Brand kit slotting",
    ],
  },
];

export const libraryStats = [
  { label: "Creative Packs", value: "48+" },
  { label: "Service Niches", value: "6" },
  { label: "Download Formats", value: "3" },
  { label: "Research Notes", value: "150+" },
];

export const workflowSteps = [
  "Subscribe and create a brand kit.",
  "Browse the library by service or angle.",
  "Open a pack and review the research notes.",
  "Apply brand colors, logo, service area, and offer.",
  "Download the editable creative pack or export a ready-to-use version.",
];

export const compliancePrinciples = [
  "Use public ads as inspiration, not as copy targets.",
  "Rewrite wording, structure, and layout before export.",
  "Show source research internally for context only.",
  "Flag claims that need review before a campaign goes live.",
];

export const brandKitDefaults = {
  businessName: "Coastal Wash Co.",
  logoLabel: "CW",
  primaryColor: "#0f766e",
  accentColor: "#f97316",
  phoneNumber: "(555) 214-9008",
  serviceArea: "Charlotte, NC and surrounding neighborhoods",
  offer: "Free estimate with same-week scheduling",
};
