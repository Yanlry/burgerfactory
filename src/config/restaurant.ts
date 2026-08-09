export const RESTAURANT_PHONE = "+33985057803";
export const RESTAURANT_PHONE_DISPLAY = "09 85 05 78 03";

export const restaurantConfig = {
  name: "Burger Factory",
  phone: RESTAURANT_PHONE,
  phoneDisplay: RESTAURANT_PHONE_DISPLAY,
  address: {
    street: "58 Rue Sadi Carnot",
    city: "Haubourdin",
    postalCode: "59320",
    full: "58 Rue Sadi Carnot, 59320 Haubourdin",
  },
  openingHours: [
    { day: "Lundi",    lunch: "11:00–14:30", dinner: "18:00–23:00" },
    { day: "Mardi",    lunch: "11:00–14:30", dinner: "18:00–23:00" },
    { day: "Mercredi", lunch: "11:00–14:30", dinner: "18:00–23:00" },
    { day: "Jeudi",    lunch: "11:00–14:30", dinner: "18:00–23:00" },
    { day: "Vendredi", lunch: "11:00–14:30", dinner: "18:00–00:00" },
    { day: "Samedi",   lunch: "11:00–14:30", dinner: "18:00–00:00" },
    { day: "Dimanche", lunch: null,           dinner: "18:00–23:00" },
  ],
  social: {
    instagram: null,
    facebook: null,
  },
} as const;
