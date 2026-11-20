export type SourceType = 
  | 'Government Gazetteer'
  | 'Archival Document'
  | 'Historical Book'
  | 'Scholarly Article'
  | 'Historical Novel'
  | 'Field Survey & ASI Report';

export type VerificationStatus = 
  | 'Verified'
  | 'Under Review'
  | 'Pending Verification'
  | 'Rejected';

export interface ReferenceSource {
  id: string;
  title: string;
  marathiTitle: string;
  authorOrIssuingBody: string;
  sourceType: SourceType;
  publicationYear?: string;
  editionOrVolume?: string;
  locationOrUrl?: string;
  pageOrSection?: string;
  categoryId: string; // Belongs to 1 of 10 heritage categories
  verificationStatus: VerificationStatus;
  notes?: string; // Clear distinction between documented fact, interpretation, or literary fiction
}

export const OFFICIAL_REFERENCE_SOURCES: ReferenceSource[] = [
  {
    id: "ref-01",
    title: "Maharashtra State District Gazetteers: Raigad District",
    marathiTitle: "महाराष्ट्र शासन जिल्हा गॅझेटिअर: रायगड जिल्हा",
    authorOrIssuingBody: "Gazetteers Department, Government of Maharashtra",
    sourceType: "Government Gazetteer",
    publicationYear: "1964 (Revised Edition)",
    editionOrVolume: "Volume 24",
    locationOrUrl: "https://gazetteers.maharashtra.gov.in",
    pageOrSection: "Chapter 19: Places of Interest - Raigad Fort, pp. 815-842",
    categoryId: "forts",
    verificationStatus: "Verified",
    notes: "Official topographical and historical record compiled by the Maharashtra State Gazetteers Department."
  },
  {
    id: "ref-02",
    title: "Sabhasad Bakhar (1697)",
    marathiTitle: "सभासद बखर (१६९७)",
    authorOrIssuingBody: "Krishnaji Anant Sabhasad",
    sourceType: "Archival Document",
    publicationYear: "1697 AD (1619 Saka)",
    editionOrVolume: "Edited by K. N. Sane",
    locationOrUrl: "https://archives.maharashtra.gov.in",
    pageOrSection: "Section: Chhatrapati Shivaji Maharaj Coronation & Fort Administration",
    categoryId: "history",
    verificationStatus: "Verified",
    notes: "Contemporary primary chronicle composed shortly after Chhatrapati Shivaji Maharaj's death at Jinji."
  },
  {
    id: "ref-03",
    title: "Ramchandra Pant Amatya's Ajnyapatra (1715)",
    marathiTitle: "रामचंद्रपंत अमात्यकृत आज्ञापत्र (१७१५)",
    authorOrIssuingBody: "Ramchandra Pant Amatya",
    sourceType: "Archival Document",
    publicationYear: "1715 AD",
    editionOrVolume: "Maratha Statecraft Treatise",
    locationOrUrl: "https://archives.maharashtra.gov.in",
    pageOrSection: "Chapter 8: Durgagadh Nirupan (Fort Architecture & Defense)",
    categoryId: "forts",
    verificationStatus: "Verified",
    notes: "Official Maratha treatise on fort selection, rainwater cisterns (Devtaki), and military logistics."
  },
  {
    id: "ref-04",
    title: "Shivaji and His Times",
    marathiTitle: "शिवाजी अँड हिज टाइम्स",
    authorOrIssuingBody: "Sir Jadunath Sarkar",
    sourceType: "Historical Book",
    publicationYear: "1919 (5th Edition 1952)",
    editionOrVolume: "Orient Longman Critical Edition",
    pageOrSection: "Chapter IV: Coronation of Shivaji & Fort Networks, pp. 200-225",
    categoryId: "history",
    verificationStatus: "Verified",
    notes: "Rigorous scholarly analysis based on Persian, Marathi, Portuguese, and English Factory records."
  },
  {
    id: "ref-05",
    title: "Archaeological Survey of India (ASI) Monument Records: Sindhudurg & Janjira",
    marathiTitle: "भारतीय पुरातत्त्व सर्वेक्षण (ASI) स्मारक नोंदवही",
    authorOrIssuingBody: "Archaeological Survey of India, Mumbai Circle",
    sourceType: "Field Survey & ASI Report",
    publicationYear: "2018",
    editionOrVolume: "State Protected & Central Protected Monuments Report",
    locationOrUrl: "https://asimumbaicircle.bihar.gov.in", // ASI official portal
    pageOrSection: "Monuments of Konkan Division - Forts & Water Harvesting",
    categoryId: "forts",
    verificationStatus: "Verified",
    notes: "Physical architectural surveys documenting stone masonry joints, lead foundations, and marine bastions."
  },
  {
    id: "ref-06",
    title: "Shriman Yogi (Historical Novel)",
    marathiTitle: "श्रीमान योगी (ऐतिहासिक कादंबरी)",
    authorOrIssuingBody: "Ranjit Desai",
    sourceType: "Historical Novel",
    publicationYear: "1968",
    editionOrVolume: "Deshmukh & Company Publishers",
    pageOrSection: "Literary portrayal of Shivaji Maharaj's life and coronation",
    categoryId: "literature-saints",
    verificationStatus: "Verified",
    notes: "LITERARY REFERENCE: Acclaimed historical novel. Provides rich narrative dramatization, but fictionalized dialogue and dramatized scenes must not be presented as primary archival facts."
  },
  {
    id: "ref-07",
    title: "Maharashtra Gazetteer of Folk Arts & Performing Traditions",
    marathiTitle: "महाराष्ट्र लोककला व रंगभूमी गॅझेटिअर",
    authorOrIssuingBody: "Department of Cultural Affairs, Government of Maharashtra",
    sourceType: "Government Gazetteer",
    publicationYear: "1988",
    pageOrSection: "Section III: Powada, Lavani, Tamasha and Bharud Folk Instruments",
    categoryId: "folk-arts",
    verificationStatus: "Verified",
    notes: "Official documentation of traditional performers, Dhol-Tasha, Powada bards, and folk instruments."
  },
  {
    id: "ref-08",
    title: "Peshwa Daftar Manuscripts (Modi Script Archives)",
    marathiTitle: "पेशवे दप्तर मोडी लिपी दस्तऐवज",
    authorOrIssuingBody: "Pune State Archives (Bharat Itihas Sanshodhak Mandal)",
    sourceType: "Archival Document",
    publicationYear: "18th Century AD (Digitized 2021)",
    locationOrUrl: "https://archives.maharashtra.gov.in",
    pageOrSection: "Jamav Section - Modi Script Tax & Fort Provisions",
    categoryId: "modi-script",
    verificationStatus: "Verified",
    notes: "Primary cursive Modi documents detailing grain supplies, arsenal records, and royal decrees."
  },
  {
    id: "ref-09",
    title: "Student Researcher Submission: Local Fort Water Quality Study",
    marathiTitle: "विद्यार्थी संशोधन नोंद: स्थानिक दुर्ग जलसाठा अभ्यास",
    authorOrIssuingBody: "Student Researcher Cohort",
    sourceType: "Field Survey & ASI Report",
    publicationYear: "2026",
    categoryId: "forts",
    verificationStatus: "Under Review",
    notes: "FIELD SUBMISSION: Submitted by registered student researchers. Pending formal review and verification by authorized historical reviewer."
  }
];
