import i18next from "i18next";
import english from "./english.json";
import chinese from "./chinese.json";
import swedish from "./swedish.json";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  lng: "sv",
  resources: {
    sv: swedish,
    en: english,
    cn: chinese,
  },
  react: {
    useSuspense: false,
  },
});

export default i18next;
