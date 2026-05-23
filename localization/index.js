import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as SecureStore from "expo-secure-store";
import { I18nManager } from "react-native";
import en from "./en.json";
import ar from "./ar.json";

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language is English as requested
    fallbackLng: "en",
    compatibilityJSON: "v3", // Needed for older React Native environments
    interpolation: {
      escapeValue: false,
    },
  });

// Asynchronously load the saved language from SecureStore
export const initLanguage = async () => {
  try {
    const savedLanguage = await SecureStore.getItemAsync("language");
    if (savedLanguage) {
      await i18n.changeLanguage(savedLanguage);
      
      // Sync layout direction with the loaded language
      const isRtl = savedLanguage === "ar";
      if (I18nManager.isRTL !== isRtl) {
        I18nManager.allowRTL(isRtl);
        I18nManager.forceRTL(isRtl);
      }
    } else {
      // Defaulting to English LTR on first launch
      if (I18nManager.isRTL) {
        I18nManager.allowRTL(false);
        I18nManager.forceRTL(false);
      }
    }
  } catch (error) {
    console.error("Error loading saved language from Secure Store:", error);
  }
};

export default i18n;
