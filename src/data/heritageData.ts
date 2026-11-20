export interface HeritageCategory {
  id: string;
  title: string;
  marathiTitle: string;
  iconName: string;
  description: string;
  marathiDescription: string;
  itemCount: number;
  highlightItems: string[];
}

export const HERITAGE_CATEGORIES: HeritageCategory[] = [
  {
    id: "forts",
    title: "Forts and Historical Places",
    marathiTitle: "किल्ले आणि ऐतिहासिक ठिकाणे",
    iconName: "Shield",
    description: "Hill forts, sea forts, royal palaces, ancient rock-cut caves, and monumental heritage structures across the Sahyadri range and Konkan coast.",
    marathiDescription: "सह्याद्री पर्वत आणि कोकण किनारपट्टीवरील गिरिदुर्ग, जलदुर्ग, ऐतिहासिक राजवाडे आणि प्राचीन लेण्या.",
    itemCount: 350,
    highlightItems: ["Raigad Fort", "Shivneri Fort", "Sindhudurg Sea Fort", "Ajanta & Ellora Caves", "Shanivar Wada"]
  },
  {
    id: "history",
    title: "History and Historical Personalities",
    marathiTitle: "इतिहास आणि ऐतिहासिक व्यक्तिमत्त्वे",
    iconName: "BookOpen",
    description: "Chhatrapati Shivaji Maharaj, Peshwas, great Maratha generals, freedom fighters, social reformers, and pivotal eras shaping Maharashtra.",
    marathiDescription: "छत्रपती शिवाजी महाराज, पेशवे, थोर सेनापती, स्वातंत्र्य सेनानी, समाजसुधारक आणि मराठा साम्राज्याचा गौरवशाली इतिहास.",
    itemCount: 120,
    highlightItems: ["Chhatrapati Shivaji Maharaj", "Mahatma Jyotirao Phule", "Savitribai Phule", "Dr. B. R. Ambedkar", "Lokmanya Tilak"]
  },
  {
    id: "festivals",
    title: "Festivals, Fairs, and Traditions",
    marathiTitle: "सण, उत्सव आणि परंपरा",
    iconName: "Calendar",
    description: "Ganeshotsav, Gudi Padwa, Ashadhi Wari pilgrimage, Kojagiri, Nagpanchami, village jatras, and traditional cultural observances.",
    marathiDescription: "गणेशोत्सवाचा आनंद, गुढी पाडव्याचा उत्साह, आषाढी वारीची परंपरा आणि ग्रामोत्सव.",
    itemCount: 45,
    highlightItems: ["Ganeshotsav", "Ashadhi Wari (Pandharpur)", "Gudi Padwa", "Makar Sankranti", "Pola Festival"]
  },
  {
    id: "folk-arts",
    title: "Folk Arts and Performing Arts",
    marathiTitle: "लोककला आणि रंगभूमी",
    iconName: "Music",
    description: "Lavani, Powada martial ballads, Tamasha theatre, Gondhal, Bharud, Dhol Tasha Pathak, and traditional folk instruments like Sambhal and Tuntuna.",
    marathiDescription: "लावणी, पोवाडा, तमाशा, गोंधळ, भारुड आणि पारंपरिक ढोल-ताशा पथक.",
    itemCount: 30,
    highlightItems: ["Powada Ballads", "Lavani Tradition", "Tamasha Folk Theatre", "Dhol Tasha Rhythm", "Gondhal & Bharud"]
  },
  {
    id: "culinary",
    title: "Food and Culinary Heritage",
    marathiTitle: "महाराष्ट्रीयन खाद्यसंस्कृती",
    iconName: "Utensils",
    description: "Puran Poli, Modak, Misal Pav, Pithla Bhakri, Kolhapuri Tambda-Pandhra Rassa, Malvani fish curries, and traditional festive delicacies.",
    marathiDescription: "पुरणपोळी, मोदक, पिठलं-भाकरी, मिसळ पावाचा तडका आणि कोकणी मालवणी जेवण.",
    itemCount: 85,
    highlightItems: ["Ukadiche Modak", "Puran Poli", "Kolhapuri Misal", "Malvani Fish Curry", "Pithla Bhakri & Thecha"]
  },
  {
    id: "clothing-crafts",
    title: "Traditional Clothing and Handicrafts",
    marathiTitle: "पारंपरिक वेशभूषा आणि हस्तकला",
    iconName: "Scissors",
    description: "Paithani silk sarees, Nauvari sarees, Kolhapuri chappals, Warli tribal paintings, Himru shawls, and Bidriware metal craft.",
    marathiDescription: "पैठणी साडी, नऊवारी, कोल्हापुरी चप्पल, वारली चित्रकला आणि हिमावर शाल.",
    itemCount: 50,
    highlightItems: ["Paithani Silk Saree", "Nauvari (Lugade)", "Warli Tribal Art", "Kolhapuri Chappal", "Bidri Metalcraft"]
  },
  {
    id: "languages-dialects",
    title: "Languages and Regional Dialects",
    marathiTitle: "भाषा आणि प्रादेशिक बोलीभाषा",
    iconName: "Languages",
    description: "Standard Marathi (शुद्ध मराठी), Ahirani (Khandesh), Malvani (Konkan), Varhadi (Vidarbha), Dangri, and distinctions from Devanagari script.",
    marathiDescription: "शुद्ध मराठी, अहिराणी, मालवणी, वरहाडी बोलीभाषा आणि देवनागरी लिपीची समृद्ध परंपरा.",
    itemCount: 15,
    highlightItems: ["Standard Marathi", "Ahirani (Khandesh)", "Malvani (Konkan)", "Varhadi (Vidarbha)", "Devanagari Script"]
  },
  {
    id: "modi-script",
    title: "Modi Script and Historical Documents",
    marathiTitle: "मोडी लिपी आणि ऐतिहासिक दस्तऐवज",
    iconName: "FileText",
    description: "The historical Modi cursive script used in Maratha administrative documents, royal royal letters (Patras), land grants, and archival archives.",
    marathiDescription: "छत्रपतींच्या काळातील महसुली आणि राजकीय दस्तऐवजांची ऐतिहासिक मोडी लिपी.",
    itemCount: 40,
    highlightItems: ["Modi Script Manuscripts", "Royal Sanads & Patras", "Peswe Dafter Records", "Archival Transcription Tools"]
  },
  {
    id: "literature-saints",
    title: "Literature and Saint Traditions",
    marathiTitle: "संत परंपरा आणि मराठी साहित्य",
    iconName: "Feather",
    description: "Sant Dnyaneshwar, Sant Tukaram, Samarth Ramdas Swami, Mahanubhav Panth, Warkari sampradaya, Abhangas, and classical Marathi literature.",
    marathiDescription: "संत ज्ञानेश्वर, संत तुकाराम महाराज, वारकरी संप्रदाय, अभंगवाणी आणि समृद्ध मराठी साहित्य.",
    itemCount: 70,
    highlightItems: ["Dnyaneshwari", "Tukaram Gatha", "Warkari Bhakti Movement", "Shiv Bharat Epic", "Samarth Ramdas Stotram"]
  },
  {
    id: "tourism-events",
    title: "Tourism and Cultural Events",
    marathiTitle: "पर्यटन आणि सांस्कृतिक कार्यक्रम",
    iconName: "Compass",
    description: "Certified local guides, heritage trails, monsoon trekking tours, cultural festivals, folk dance performances, and visitor amenities.",
    marathiDescription: "प्रमाणित स्थानिक मार्गदर्शक, ऐतिहासिक पर्यटन वाटा, ट्रेकिंग ट्रेल्स आणि सांस्कृतिक उत्सव.",
    itemCount: 60,
    highlightItems: ["Certified Local Guides", "Trekking Trails & Passes", "Heritage Walking Tours", "Folk Art Festivals", "Monsoon Camping"]
  }
];

export interface HeritageArtifactItem {
  id: string;
  categoryId: string;
  title: string;
  marathiTitle: string;
  periodOrEra: string;
  region: string;
  significance: string;
  marathiSignificance: string;
  details: string[];
  referenceSource: string;
  image?: string;
}

export const HERITAGE_ARTIFACTS: HeritageArtifactItem[] = [
  {
    id: "art-1",
    categoryId: "history",
    title: "Coronation of Chhatrapati Shivaji Maharaj (1674)",
    marathiTitle: "छत्रपती शिवाजी महाराजांचा राज्याभिषेक (१६७४)",
    periodOrEra: "Maratha Swarajya Era",
    region: "Raigad Fort",
    significance: "Established Hindavi Swarajya as a sovereign recognized empire with formal coronation rituals at Raigad.",
    marathiSignificance: "६ जून १६७४ रोजी रायगडावर झालेला ऐतिहासिक राज्याभिषेक, ज्याने सार्वभौम स्वराज्याची स्थापना केली.",
    details: [
      "Conducted by Gaga Bhatt on Jyeshtha Shuddha Trayodashi.",
      "Symbolized liberation from foreign sultanates and establishment of self-rule.",
      "Minted the Hon and Shivrai coins in gold and copper."
    ],
    referenceSource: "Sabhasad Bakhar (1697) & Shiv Digvijay"
  },
  {
    id: "art-2",
    categoryId: "festivals",
    title: "Ashadhi Wari Pilgrimage to Pandharpur",
    marathiTitle: "आषाढी एकादशी वारी परंपरा",
    periodOrEra: "Centuries-old Warkari Tradition",
    region: "Alandi / Dehu to Pandharpur",
    significance: "One of the world's largest peaceful spiritual pilgrimages where millions of Warkaris walk chanting 'Dnyanba Tukaram'.",
    marathiSignificance: "वारकरी संप्रदायाची पंढरपूरची पाई वारी, जिथे लाखो वारकरी 'ज्ञानबा-तुकाराम' नामाचा गजर करत चालतात.",
    details: [
      "Palkhis of Sant Dnyaneshwar (from Alandi) and Sant Tukaram (from Dehu).",
      "Promotes equality, brotherhood, and devotion (Bhakti Marg).",
      "Recognized for intangible cultural heritage values."
    ],
    referenceSource: "Maharashtra Cultural Department Records"
  },
  {
    id: "art-3",
    categoryId: "folk-arts",
    title: "Powada Martial Ballad Tradition",
    marathiTitle: "ऐतिहासिक पोवाडा परंपरा",
    periodOrEra: "Maratha Battlefields & Royal Courts",
    region: "Western Maharashtra / Raigad",
    significance: "Heroic ballad poetry narrating battles, valor of warriors like Tanaji Malusare, Baji Prabhu Deshpande, and Netaji Palkar.",
    marathiSignificance: "शिवकालीन पराक्रमाची गाथा सांगणारी वीररसात्मक पोवाडा कला.",
    details: [
      "Earliest notable powada is 'Afzal Khancha Vadh' by Agindas (1659).",
      "Uses instruments like Daf and Tuntuna to create driving martial rhythms.",
      "Served as oral history and morale booster for Maratha soldiers."
    ],
    referenceSource: "Historical Bakhars & Maratha Folklore Archives"
  },
  {
    id: "art-4",
    categoryId: "culinary",
    title: "Traditional Maharashtrian Thali & Festivities",
    marathiTitle: "परंपरागत महाराष्ट्रीयन जेवण आणि पदार्थ",
    periodOrEra: "Agro-Ecological Heritage",
    region: "Statewide (Konkan, Desh, Vidarbha, Khandesh)",
    significance: "A balanced culinary tradition utilizing seasonal millets, lentils, coconut, peanuts, and Goda masala.",
    marathiSignificance: "पुरणपोळी, मोदक, पिठलं-भाकरी आणि खमंग मसाल्यांची समृद्ध महाराष्ट्रीयन खाद्यसंस्कृती.",
    details: [
      "Ukadiche Modak prepared during Ganeshotsav with jaggery and fresh coconut.",
      "Puran Poli served with warm ghee and Katachi Amti.",
      "Use of native spices like Goda Masala and Malvani Malvani Kanda Lasun masala."
    ],
    referenceSource: "Maharashtra Gazetteer of Food & Agro-Traditions"
  },
  {
    id: "art-5",
    categoryId: "clothing-crafts",
    title: "Paithani Handloom Silk Weaving",
    marathiTitle: "पैठणी रेशमी साडी कला",
    periodOrEra: "Satavahana Dynasty to Peshwa Era",
    region: "Paithan (Chhatrapati Sambhajinagar)",
    significance: "Handwoven pure silk sarees featuring gold zari peacock and lotus pallus, passed down through generations of master artisans.",
    marathiSignificance: "पैठणची जगप्रसिद्ध सोन्याच्या जरीची पारंपरिक पैठणी साडी.",
    details: [
      "Woven using pure mulberry silk and real gold/silver zari thread.",
      "Features characteristic motifs like Asavali (flowering vine), Mor (peacock), and Tota-Maina.",
      "Geographical Indication (GI) tagged heritage craft."
    ],
    referenceSource: "Handloom Census of Maharashtra & ASI Records"
  },
  {
    id: "art-6",
    categoryId: "modi-script",
    title: "Modi Script Administration Documents",
    marathiTitle: "मोडी लिपीचे ऐतिहासिक दस्तऐवज",
    periodOrEra: "13th to 20th Century AD",
    region: "Pune State Archives (Peshwa Daftar)",
    significance: "Cursive script designed for rapid writing of Marathi administrative records, land deeds, and military intelligence.",
    marathiSignificance: "छत्रपती आणि पेशव्यांच्या काळातील जलद लेखनासाठी वापरली जाणारी मोडी लिपी.",
    details: [
      "Characterized by interconnected loops and strokes to speed up quill writing.",
      "Tens of thousands of historical letters preserved in Pune Archives.",
      "Workshops and digitization projects run by historians to transcribe Modi records."
    ],
    referenceSource: "Pune State Archives & Bharat Itihas संशोधक मंडळ"
  },
  {
    id: "art-7",
    categoryId: "literature-saints",
    title: "Warkari Saint Literature (Abhangwani)",
    marathiTitle: "संत साहित्याची अमृतवाणी (अभंग)",
    periodOrEra: "13th to 17th Century AD",
    region: "Pandharpur & Dehu",
    significance: "Democratized spiritual knowledge by writing in Prakrit Marathi instead of Sanskrit, fostering social harmony.",
    marathiSignificance: "संतांच्या अभंगांनी मराठी भाषेला आणि लोकमानसाला दिलेली आध्यात्मिक समृद्धी.",
    details: [
      "Dnyaneshwari written by Sant Dnyaneshwar in 1290 AD.",
      "Gatha composed by Sant Tukaram containing over 4,000 abhangs.",
      "Chokhamela, Eknath, and Janabai emphasized equality of all human beings."
    ],
    referenceSource: "Warkari Literary Corpus & Critical Editions"
  }
];
