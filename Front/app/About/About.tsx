import React from "react";
import useThemeAndLanguage from "../CustomeHooks/useThemeAndLanguage";
import TranslationPair from "../Lib/Types";

const AboutPage: React.FC = () => {
  const { language, isDarkMode, setIsDarkMode } = useThemeAndLanguage();

  const AboutTranslation: TranslationPair = {
    en: "About",
    ar: "عن الدكتور"
  };

  const AboutContent: TranslationPair = {
    en: "I am currently a professor at the Biomedical Engineering Department at Cairo University. I am also a freelance consultant on Healthcare technology management. My Consultations cover the entire spectrum of medical equipment lifecycle from regulatory conformance to hospital planning and maintenance management. I also provide customized training courses for ministries of health professionals.",
    ar: "أنا حالياً أستاذ في قسم الهندسة الطبية بجامعة القاهرة. أنا أيضًا استشاري في إدارة التكنولوجيا الصحية. تشمل استشاراتي الطيف الكامل لدورة حياة الأجهزة الطبية من التطابق التنظيمي إلى تخطيط المستشفى وإدارة الصيانة. أقدم أيضًا دورات تدريبية مخصصة لمهنيي وزارات الصحة."
  };

  return (
    <div className="w-full flex justify-center text-[#03045e] dark:text-[#6EACDA] bg-[#EEEEEE] dark:bg-[#021526]">
      <div className="w-[90%] flex flex-col gap-10 p-3">
        <h1 className="text-2xl md:text-5xl">
          {AboutTranslation[language]}
        </h1>
        <p className="text-slate-600 dark:text-white text-lg md:text-2xl">
          {AboutContent[language]}
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
