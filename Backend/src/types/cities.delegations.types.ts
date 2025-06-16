// Define the main Emirates as constants
const AbuDhabiEmirate = "Abu Dhabi";
const DubaiEmirate = "Dubai";
const SharjahEmirate = "Sharjah";
const AjmanEmirate = "Ajman";
const UmmAlQuwainEmirate = "Umm Al-Quwain";
const RasAlKhaimahEmirate = "Ras Al Khaimah";
const FujairahEmirate = "Fujairah";

// Export the Emirates as categories
export const cities = {
  [AbuDhabiEmirate]: AbuDhabiEmirate,
  [DubaiEmirate]: DubaiEmirate,
  [SharjahEmirate]: SharjahEmirate,
  [AjmanEmirate]: AjmanEmirate,
  [UmmAlQuwainEmirate]: UmmAlQuwainEmirate,
  [RasAlKhaimahEmirate]: RasAlKhaimahEmirate,
  [FujairahEmirate]: FujairahEmirate,
};

// Export the delegations (cities) as sub-categories
export const delegations = {
  [AbuDhabiEmirate]: [
    "Abu Dhabi Central",
    "Al Ain",
    "Madinat Zayed",
    "Ruwais",
    "Ghayathi",
    "Liwa",
    "Al Dhafra",
    "Al Wathba",
    "Al Shahama",
  ],

  [DubaiEmirate]: [
    "Dubai Central",
    "Jebel Ali",
    "Hatta",
    "Al Awir",
    "Al Khawaneej",
    "Mirdif",
  ],

  [SharjahEmirate]: [
    "Sharjah Central",
    "Khor Fakkan",
    "Dibba Al-Hisn",
    "Kalba",
    "Al Dhaid",
    "Al Madam",
    "Mleiha",
  ],

  [AjmanEmirate]: [
    "Ajman Central",
    "Masfout",
    "Manama",
  ],

  [UmmAlQuwainEmirate]: [
    "Umm Al-Quwain Central",
    "Falaj Al Mualla",
  ],

  [RasAlKhaimahEmirate]: [
    "Ras Al Khaimah Central",
    "Al Rams",
    "Al Jazirah Al Hamra",
    "Digdaga",
    "Ghalilah",
    "Masafi",
  ],

  [FujairahEmirate]: [
    "Fujairah Central",
    "Dibba Al-Fujairah",
    "Masafi",
    "Mirbah",
    "Sakamkam",
  ],
};