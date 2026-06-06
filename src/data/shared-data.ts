export interface District {
  name: string;
  zone: {
    en: string;
    kn: string;
  };
}

export interface APMCPrice {
  crop: {
    en: string;
    kn: string;
  };
  market: {
    en: string;
    kn: string;
  };
  price: string;
  unit: {
    en: string;
    kn: string;
  };
  trend: "up" | "stable" | "down";
  time: {
    en: string;
    kn: string;
  };
}

export interface GovtScheme {
  name: {
    en: string;
    kn: string;
  };
  deadline: {
    en: string;
    kn: string;
  };
}

// Karnataka Districts with automatic Agro-Climatic Zone mapping
export const karnatakaDistricts: District[] = [
  { name: "Mandya", zone: { en: "Southern Dry Zone", kn: "ದಕ್ಷಿಣ ಒಣ ವಲಯ" } },
  { name: "Shivamogga", zone: { en: "Malnad / Hill Zone", kn: "ಮಲೆನಾಡು / ಗುಡ್ಡಗಾಡು ವಲಯ" } },
  { name: "Vijayapura", zone: { en: "Northern Dry Zone", kn: "ಉತ್ತರ ಒಣ ವಲಯ" } },
  { name: "Udupi", zone: { en: "Coastal Zone", kn: "ಕರಾವಳಿ ವಲಯ" } },
  { name: "Chikmagalur", zone: { en: "Malnad / Hill Zone", kn: "ಮಲೆನಾಡು / ಗುಡ್ಡಗಾಡು ವಲಯ" } },
  { name: "Kolar", zone: { en: "Eastern Dry Zone", kn: "ಪೂರ್ವ ಒಣ ವಲಯ" } },
];

export const cropOptions = ["Ragi", "Sugarcane", "Jowar", "Paddy", "Coconut", "Arecanut", "Coffee"];

// APMC Prices matching the mockup exactly
export const apmcPrices: APMCPrice[] = [
  { 
    crop: { en: "Sugarcane (ಕಬ್ಬು)", kn: "ಕಬ್ಬು (Sugarcane)" }, 
    market: { en: "Mandya APMC", kn: "ಮಂಡ್ಯ APMC" }, 
    price: "₹3,200", 
    unit: { en: "/ Ton", kn: "/ ಟನ್" }, 
    trend: "up", 
    time: { en: "Updated 2h ago", kn: "೨ ಗಂಟೆಗಳ ಹಿಂದೆ" } 
  },
  { 
    crop: { en: "Ragi (ರಾಗಿ)", kn: "ರಾಗಿ (Ragi)" }, 
    market: { en: "Mysuru APMC", kn: "ಮೈಸೂರು APMC" }, 
    price: "₹3,800", 
    unit: { en: "/ Qtl", kn: "/ ಕ್ವಿಂಟಾಲ್" }, 
    trend: "stable", 
    time: { en: "Updated 3h ago", kn: "೩ ಗಂಟೆಗಳ ಹಿಂದೆ" } 
  },
  { 
    crop: { en: "Jowar (ಜೋಳ)", kn: "ಜೋಳ (Jowar)" }, 
    market: { en: "Hassan APMC", kn: "ಹಾಸನ APMC" }, 
    price: "₹2,950", 
    unit: { en: "/ Qtl", kn: "/ ಕ್ವಿಂಟಾಲ್" }, 
    trend: "down", 
    time: { en: "Updated 1h ago", kn: "೧ ಗಂಟೆಯ ಹಿಂದೆ" } 
  },
  { 
    crop: { en: "Arecanut (ಅಡಿಕೆ)", kn: "ಅಡಿಕೆ (Arecanut)" }, 
    market: { en: "Shivamogga APMC", kn: "ಶಿವಮೊಗ್ಗ APMC" }, 
    price: "₹48,500", 
    unit: { en: "/ Qtl", kn: "/ ಕ್ವಿಂಟಾಲ್" }, 
    trend: "up", 
    time: { en: "Updated 4h ago", kn: "೪ ಗಂಟೆಗಳ ಹಿಂದೆ" } 
  },
];

// Govt Schemes
export const governmentSchemes: GovtScheme[] = [
  { 
    name: { en: "PM-KISAN: 17th Installment", kn: "ಪಿಎಂ-ಕಿಸಾನ್: ೧೭ನೇ ಕಂತು" }, 
    deadline: { en: "Disbursed / Complete", kn: "ಪೂರ್ಣಗೊಂಡಿದೆ" } 
  },
  { 
    name: { en: "Pradhan Mantri Fasal Bima Yojana (Crop Insurance)", kn: "ಪ್ರಧಾನ ಮಂತ್ರಿ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆ (ಬೆಳೆ ವಿಮೆ)" }, 
    deadline: { en: "Apply before July 31st", kn: "ಜುಲೈ ೩೧ ರ ಒಳಗೆ" } 
  },
  { 
    name: { en: "Krishi Bhagya: Farm Pond Subsidy (Karnataka Govt)", kn: "ಕೃಷಿ ಭಾಗ್ಯ: ಕೃಷಿ ಹೊಂಡ ಸಬ್ಸಿಡಿ ಯೋಜನೆ" }, 
    deadline: { en: "Ongoing registration", kn: "ನೋಂದಣಿ ಚಾಲನೆಯಲ್ಲಿದೆ" } 
  },
  { 
    name: { en: "Ganga Kalyana: Free Borewell & Pump scheme", kn: "ಗಂಗಾ ಕಲ್ಯಾಣ: ಉಚಿತ ಕೊಳವೆ ಬಾವಿ ಯೋಜನೆ" }, 
    deadline: { en: "Apply by June 30th", kn: "ಜೂನ್ ೩೦ ರ ಒಳಗೆ" } 
  },
];
