import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { listenSystemMode } from "../utils/darkModeUtils";

let bootstrapped = false;

export function bootstrapApp() {
  if (bootstrapped) {
    return;
  }

  listenSystemMode();

  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
      lng: "en",
      fallbackLng: "en",
      detection: {
        order: ["localStorage", "cookie"], // 只从存储中读取，不检测浏览器
        caches: ["localStorage"], // 用户切换后保存到 localStorage
      },
      interpolation: {
        escapeValue: false,
      },
    });

  bootstrapped = true;
}
