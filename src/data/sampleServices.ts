export interface TourismServiceItem {
  id: string;
  title: string;
  marathiTitle: string;
  category: 'Tickets' | 'Treks' | 'Guides';
  summary: string;
  features: string[];
  pricingIndication: string;
  coverage: string;
  isDemoService: true;
}

export const TOURISM_SERVICES: TourismServiceItem[] = [
  {
    id: "srv-01",
    title: "Official Heritage Fort E-Pass & Entry Permits",
    marathiTitle: "किल्ला प्रवेश ई-पास व अधिकृत तिकिटे",
    category: "Tickets",
    summary: "Streamlined single-window digital pass booking for ASI protected and state historical fort monuments across Maharashtra.",
    features: [
      "Fast-track QR code entry at monument gates (e.g., Raigad, Shivneri)",
      "Integrated ropeway passes for senior citizens and families",
      "Digital conservation fee contribution receipt",
      "Real-time fort visitor threshold updates to avoid overcrowding"
    ],
    pricingIndication: "ASI standard rates (₹20 – ₹25 Indian, ₹300 Foreign)",
    coverage: "Raigad, Shivneri, Murud-Janjira, Sindhudurg",
    isDemoService: true
  },
  {
    id: "srv-02",
    title: "Certified Local Historian & Mavala Guides",
    marathiTitle: "प्रमाणित स्थानिक इतिहास संशोधक व मार्गदर्शक",
    category: "Guides",
    summary: "Connect with authentic local community guides trained in Maratha history, oral ballads (Powada), architectural intricacies, and regional folklore.",
    features: [
      "Bilingual tours in fluent Marathi and English",
      "Accredited by Maharashtra Tourism Development Corporation (MTDC)",
      "Deep exploration of hidden cisterns, escape routes, and secret sally ports",
      "Direct remuneration supporting indigenous rural youth and families"
    ],
    pricingIndication: "Standard guided rate: ₹600 – ₹1200 per group session",
    coverage: "All major Sahyadri forts",
    isDemoService: true
  },
  {
    id: "srv-03",
    title: "Curated Sahyadri Eco-Treks & Heritage Trails",
    marathiTitle: "मार्गदर्शित सह्याद्री पदभ्रमण व पर्यावरण मोहिमा",
    category: "Treks",
    summary: "Safety-certified mountain treks designed for beginners to seasoned hikers, with zero-waste leave-no-trace protocols.",
    features: [
      "First-aid certified mountain trek leaders",
      "Authentic village homestay and traditional Pithla-Bhakri meal stops",
      "Detailed elevation maps, GPS trail logs, and water source indices",
      "Strict eco-friendly plastic collection kits included for every trekker"
    ],
    pricingIndication: "From ₹850 – ₹1800 per day trek (inclusive of guide & meal)",
    coverage: "Rajgad, Harishchandragad, Torna, Sinhagad",
    isDemoService: true
  }
];
