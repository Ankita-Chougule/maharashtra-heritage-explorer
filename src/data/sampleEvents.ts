export interface HeritageEvent {
  id: string;
  title: string;
  marathiTitle: string;
  fortLocation: string;
  date: string;
  time: string;
  category: 'Commemoration' | 'Eco-Trek' | 'Academic Seminar' | 'Photography Workshop';
  organizer: string;
  description: string;
  capacity: string;
  isDemoData: true;
}

export const SAMPLE_HERITAGE_EVENTS: HeritageEvent[] = [
  {
    id: "evt-01",
    title: "Shiv Jayanti Heritage Trek & Bastion Walk",
    marathiTitle: "शिवजयंती वारसा पदभ्रमण व बुरूज संवाद",
    fortLocation: "Shivneri Fort, Junnar",
    date: "19 February 2026",
    time: "06:00 AM – 12:30 PM",
    category: "Commemoration",
    organizer: "Maharashtra Heritage Explorer & Junnar Heritage Trust",
    description: "Annual commemorative academic walk through all seven gateways of Shivneri, exploring 17th-century fortification geometry, water storage engineering, and historical archival lectures.",
    capacity: "45 Participants (Sample Registration)",
    isDemoData: true
  },
  {
    id: "evt-02",
    title: "Maratha Military Architecture & Stone Masonry Colloquium",
    marathiTitle: "मराठा लष्करी दुर्गशास्त्र व दगडी बांधकाम परिसंवाद",
    fortLocation: "Raigad Fort, Mahad",
    date: "12 March 2026",
    time: "09:30 AM – 04:00 PM",
    category: "Academic Seminar",
    organizer: "Sahyadri Fort Studies Circle & Heritage Research Society",
    description: "An on-site symposium analyzing master architect Hiroji Indulkar's acoustic planning in the Rajsabha court, defensive blind turns, and seismic resistance in basalt fortresses.",
    capacity: "60 Researchers & Students",
    isDemoData: true
  },
  {
    id: "evt-03",
    title: "Monsoon Flora & Conservation Cleanliness Trail",
    marathiTitle: "सिंहगड संवर्धन स्वच्छता व वनौषधी अभ्यास मोहीम",
    fortLocation: "Sinhagad Fort, Pune",
    date: "28 March 2026",
    time: "07:00 AM – 11:30 AM",
    category: "Eco-Trek",
    organizer: "Pune Trekking Youth Guild",
    description: "A community clean-up drive removing plastic debris along the Kalyan Darwaja ridge combined with a guided study of endemic Western Ghats medicinal plants.",
    capacity: "80 Volunteers",
    isDemoData: true
  },
  {
    id: "evt-04",
    title: "Night Sky Astrophotography & Stargazing on Western Ramparts",
    marathiTitle: "प्रतापगड खगोलदर्शन व रात्रकालीन छायाचित्रण कार्यशाळा",
    fortLocation: "Pratapgad Fort, Satara",
    date: "14 April 2026",
    time: "06:30 PM – 11:00 PM",
    category: "Photography Workshop",
    organizer: "Western Ghats Visual Archives Group",
    description: "An evening photography workshop capturing the silhouette of Maratha battlements against the Milky Way core with guided long-exposure field techniques.",
    capacity: "25 Photographers",
    isDemoData: true
  }
];
