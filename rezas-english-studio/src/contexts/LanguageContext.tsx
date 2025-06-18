import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "fa";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

// Translation object
const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.courses": "Courses",
    "nav.contact": "Contact",
    "nav.login": "Login",
    "nav.signup": "Sign Up",

    // Dashboard
    "dashboard.title": "Teacher Dashboard",
    "dashboard.welcome": "Welcome back, Reza! Manage your students and classes",
    "dashboard.totalStudents": "Total Students",
    "dashboard.activeStudents": "Active Students",
    "dashboard.totalLessons": "Total Lessons",
    "dashboard.avgProgress": "Avg Progress",

    // Tabs
    "tabs.overview": "Overview",
    "tabs.students": "Students",
    "tabs.bookings": "Bookings",
    "tabs.analytics": "Analytics",

    // Buttons
    "button.addStudent": "Add Student",
    "button.newBooking": "New Booking",
    "button.exportData": "Export Data",
  },
  fa: {
    // Navigation
    "nav.home": "خانه",
    "nav.about": "درباره ما",
    "nav.courses": "دوره‌ها",
    "nav.contact": "تماس",
    "nav.login": "ورود",
    "nav.signup": "ثبت نام",

    // Dashboard
    "dashboard.title": "داشبورد مدرس",
    "dashboard.welcome":
      "خوش آمدید رضا! دانش‌آموزان و کلاس‌های خود را مدیریت کنید",
    "dashboard.totalStudents": "کل دانش‌آموزان",
    "dashboard.activeStudents": "دانش‌آموزان فعال",
    "dashboard.totalLessons": "کل درس‌ها",
    "dashboard.avgProgress": "میانگین پیشرفت",

    // Tabs
    "tabs.overview": "نمای کلی",
    "tabs.students": "دانش‌آموزان",
    "tabs.bookings": "رزروها",
    "tabs.analytics": "تحلیل‌ها",

    // Buttons
    "button.addStudent": "افزودن دانش‌آموز",
    "button.newBooking": "رزرو جدید",
    "button.exportData": "خروجی داده‌ها",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language") as Language;
    return saved || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);

    // Apply RTL for Persian
    if (language === "fa") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "fa";
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "fa" : "en"));
  };

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["en"]] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
