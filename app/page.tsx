"use client";

import React, { useState, useEffect, useRef } from "react";

interface CustomSectionItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

interface CustomSection {
  id: string;
  sectionTitle: string;
  items: CustomSectionItem[];
}

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  year: string;
  desc: string;
}

interface EducationItem {
  id: string;
  school: string;
  degree: string;
  year: string;
}

interface SectionOrder {
  id: string;
  type: "summary" | "skills" | "experiences" | "educations" | "custom";
}

interface CVData {
  template: "classic" | "modern";
  photo: string;
  photoZoom: number;
  photoX: number;
  photoY: number;
  accentColor: string;
  isBoldText: boolean;
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string;
  experiences: ExperienceItem[];
  educations: EducationItem[];
  customSections: CustomSection[];
  sectionOrders: SectionOrder[];
}

const COLOR_OPTIONS = [
  { name: "Mavi", value: "#2563eb", bg: "bg-blue-600" },
  { name: "Lacivert", value: "#1e3a8a", bg: "bg-blue-900" },
  { name: "Zümrüt", value: "#059669", bg: "bg-emerald-600" },
  { name: "Bordo", value: "#9f1239", bg: "bg-rose-800" },
  { name: "Asil Siyah", value: "#0f172a", bg: "bg-slate-900" },
];

const defaultSectionOrders: SectionOrder[] = [
  { id: "summary", type: "summary" },
  { id: "skills", type: "skills" },
  { id: "experiences", type: "experiences" },
  { id: "educations", type: "educations" },
];

const sampleData: CVData = {
  template: "classic",
  photo: "",
  photoZoom: 100,
  photoX: 50,
  photoY: 0,
  accentColor: "#2563eb",
  isBoldText: true,
  fullName: "Ahmet Yılmaz",
  title: "Kıdemli Yazılım Geliştirici",
  email: "ahmet@example.com",
  phone: "+90 555 123 45 67",
  location: "İstanbul, Türkiye",
  summary:
    "Modern web teknolojileri ve kullanıcı deneyimi odaklı yazılım geliştirme konusunda 5+ yıl deneyimli yazılım geliştirici.",
  skills: "Next.js, TypeScript, Tailwind CSS, React, Node.js, Git",
  experiences: [
    {
      id: "1",
      company: "ABC Teknoloji A.Ş.",
      role: "Kıdemli Frontend Geliştirici",
      year: "2022 - HALEN",
      desc: "Ölçeklenebilir web uygulamalarının mimarisi ve kullanıcı arayüzü geliştirme süreçleri.",
    },
    {
      id: "2",
      company: "XYZ Medya Ldt.",
      role: "Yazılım Uzmanı",
      year: "2019 - 2022",
      desc: "Web tabanlı dinamik içerik yönetim sistemleri ve API entegrasyonları.",
    },
  ],
  educations: [
    {
      id: "1",
      school: "İstanbul Üniversitesi",
      degree: "Bilgisayar Mühendisliği",
      year: "2015 - 2019",
    },
  ],
  customSections: [],
  sectionOrders: defaultSectionOrders,
};

const emptyData: CVData = {
  template: "classic",
  photo: "",
  photoZoom: 100,
  photoX: 50,
  photoY: 0,
  accentColor: "#2563eb",
  isBoldText: true,
  fullName: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  summary: "",
  skills: "",
  experiences: [],
  educations: [],
  customSections: [],
  sectionOrders: defaultSectionOrders,
};

export default function Home() {
  const [cvData, setCvData] = useState<CVData>(sampleData);
  const [showPaywall, setShowPaywall] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("cvData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setCvData({
          ...sampleData,
          ...parsed,
          template: parsed.template || "classic",
          customSections: parsed.customSections || [],
          sectionOrders: parsed.sectionOrders || defaultSectionOrders,
          isBoldText: parsed.isBoldText ?? true,
        });
      } catch (e) {
        console.error("Kayıtlı veri okunamadı", e);
      }
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...cvData, [name]: value };
    setCvData(updated);
    localStorage.setItem("cvData", JSON.stringify(updated));
  };

  const handleTemplateChange = (template: "classic" | "modern") => {
    const updated = { ...cvData, template };
    setCvData(updated);
    localStorage.setItem("cvData", JSON.stringify(updated));
  };

  const handleColorChange = (colorValue: string) => {
    const updated = { ...cvData, accentColor: colorValue };
    setCvData(updated);
    localStorage.setItem("cvData", JSON.stringify(updated));
  };

  const toggleBoldText = () => {
    const updated = { ...cvData, isBoldText: !cvData.isBoldText };
    setCvData(updated);
    localStorage.setItem("cvData", JSON.stringify(updated));
  };

  const resetForm = () => {
    if (window.confirm("Tüm bilgileri temizlemek istediğinize emin misiniz?")) {
      setCvData(emptyData);
      localStorage.removeItem("cvData");
    }
  };

  const loadSampleData = () => {
    setCvData(sampleData);
    localStorage.setItem("cvData", JSON.stringify(sampleData));
  };

  // JSON YEDEKLEME / DİŞA AKTAR
  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cvData, null, 2));
    const downloadAnchor = document.createElement("a");
    const fileName = `${(cvData.fullName || "CV").replace(/\s+/g, "_")}_yedek.json`;
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", fileName);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // JSON YÜKLEME / İÇE AKTAR
  const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          const updated = { ...sampleData, ...parsed };
          setCvData(updated);
          localStorage.setItem("cvData", JSON.stringify(updated));
          alert("CV verileriniz başarıyla yüklendi! 🎉");
        } catch (err) {
          alert("Geçersiz yedek dosyası formatı!");
        }
      };
      reader.readAsText(file);
    }
  };

  const moveSection = (sectionId: string, direction: "up" | "down") => {
    const orders = [...cvData.sectionOrders];
    const index = orders.findIndex((s) => s.id === sectionId);
    if (index === -1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= orders.length) return;

    const [moved] = orders.splice(index, 1);
    orders.splice(targetIndex, 0, moved);

    const updated = { ...cvData, sectionOrders: orders };
    setCvData(updated);
    localStorage.setItem("cvData", JSON.stringify(updated));
  };

  const addCustomSection = () => {
    const newId = "custom_" + Date.now();
    const newSection: CustomSection = {
      id: newId,
      sectionTitle: "Yabancı Diller & Sertifikalar",
      items: [
        {
          id: Date.now().toString(),
          title: "İngilizce",
          subtitle: "İleri Seviye (C1)",
          date: "",
          description: "",
        },
      ],
    };

    const updatedCustoms = [...cvData.customSections, newSection];
    const updatedOrders = [
      ...cvData.sectionOrders,
      { id: newId, type: "custom" as const },
    ];

    const updated = {
      ...cvData,
      customSections: updatedCustoms,
      sectionOrders: updatedOrders,
    };
    setCvData(updated);
    localStorage.setItem("cvData", JSON.stringify(updated));
  };

  const removeCustomSection = (sectionId: string) => {
    const updatedCustoms = cvData.customSections.filter((s) => s.id !== sectionId);
    const updatedOrders = cvData.sectionOrders.filter((s) => s.id !== sectionId);

    const updated = {
      ...cvData,
      customSections: updatedCustoms,
      sectionOrders: updatedOrders,
    };
    setCvData(updated);
    localStorage.setItem("cvData", JSON.stringify(updated));
  };

  const handleCustomSectionTitleChange = (sectionId: string, title: string) => {
    const updatedCustoms = cvData.customSections.map((s) =>
      s.id === sectionId ? { ...s, sectionTitle: title } : s
    );
    const updated = { ...cvData, customSections: updatedCustoms };
    setCvData(updated);
    localStorage.setItem("cvData", JSON.stringify(updated));
  };

  const addCustomItem = (sectionId: string) => {
    const newItem: CustomSectionItem = {
      id: Date.now().toString(),
      title: "",
      subtitle: "",
      date: "",
      description: "",
    };

    const updatedCustoms = cvData.customSections.map((s) =>
      s.id === sectionId ? { ...s, items: [...s.items, newItem] } : s
    );

    const updated = { ...cvData, customSections: updatedCustoms };
    setCvData(updated);
    localStorage.setItem("cvData", JSON.stringify(updated));
  };

  const removeCustomItem = (sectionId: string, itemId: string) => {
    const updatedCustoms = cvData.customSections.map((s) =>
      s.id === sectionId
        ? { ...s, items: s.items.filter((item) => item.id !== itemId) }
        : s
    );

    const updated = { ...cvData, customSections: updatedCustoms };
    setCvData(updated);
    localStorage.setItem("cvData", JSON.stringify(updated));
  };

  const handleCustomItemChange = (
    sectionId: string,
    itemId: string,
    field: keyof CustomSectionItem,
    value: string
  ) => {
    const updatedCustoms = cvData.customSections.map((s) => {
      if (s.id === sectionId) {
        const updatedItems = s.items.map((item) =>
          item.id === itemId ? { ...item, [field]: value } : item
        );
        return { ...s, items: updatedItems };
      }
      return s;
    });

    const updated = { ...cvData, customSections: updatedCustoms };
    setCvData(updated);
    localStorage.setItem("cvData", JSON.stringify(updated));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Photo = reader.result as string;
        const updated = {
          ...cvData,
          photo: base64Photo,
          photoZoom: 100,
          photoX: 50,
          photoY: 0,
        };
        setCvData(updated);
        localStorage.setItem("cvData", JSON.stringify(updated));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoAdjust = (
    field: "photoZoom" | "photoX" | "photoY",
    value: number
  ) => {
    const updated = { ...cvData, [field]: value };
    setCvData(updated);
    localStorage.setItem("cvData", JSON.stringify(updated));
  };

  const removePhoto = () => {
    const updated = { ...cvData, photo: "", photoZoom: 100, photoX: 50, photoY: 0 };
    setCvData(updated);
    localStorage.setItem("cvData", JSON.stringify(updated));
  };

  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: Date.now().toString(),
      company: "",
      role: "",
      year: "",
      desc: "",
    };
    const updated = { ...cvData, experiences: [...cvData.experiences, newExp] };
    setCvData(updated);
    localStorage.setItem("cvData", JSON.stringify(updated));
  };

  const removeExperience = (id: string) => {
    const updated = {
      ...cvData,
      experiences: cvData.experiences.filter((exp) => exp.id !== id),
    };
    setCvData(updated);
    localStorage.setItem("cvData", JSON.stringify(updated));
  };

  const handleExpChange = (id: string, field: keyof ExperienceItem, value: string) => {
    const updatedExps = cvData.experiences.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    const updated = { ...cvData, experiences: updatedExps };
    setCvData(updated);
    localStorage.setItem("cvData", JSON.stringify(updated));
  };

  const addEducation = () => {
    const newEdu: EducationItem = {
      id: Date.now().toString(),
      school: "",
      degree: "",
      year: "",
    };
    const updated = { ...cvData, educations: [...cvData.educations, newEdu] };
    setCvData(updated);
    localStorage.setItem("cvData", JSON.stringify(updated));
  };

  const removeEducation = (id: string) => {
    const updated = {
      ...cvData,
      educations: cvData.educations.filter((edu) => edu.id !== id),
    };
    setCvData(updated);
    localStorage.setItem("cvData", JSON.stringify(updated));
  };

  const handleEduChange = (id: string, field: keyof EducationItem, value: string) => {
    const updatedEdus = cvData.educations.map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    const updated = { ...cvData, educations: updatedEdus };
    setCvData(updated);
    localStorage.setItem("cvData", JSON.stringify(updated));
  };

  const handleDownloadPDF = () => {
    setShowPaywall(false);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  const SectionHeaderControls = ({ sectionId }: { sectionId: string }) => {
    const orders = cvData.sectionOrders;
    const index = orders.findIndex((s) => s.id === sectionId);

    return (
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={index <= 0}
          onClick={() => moveSection(sectionId, "up")}
          className="p-1 text-[10px] bg-slate-100 hover:bg-slate-200 rounded text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          title="Yukarı Taşı"
        >
          ▲
        </button>
        <button
          type="button"
          disabled={index === -1 || index >= orders.length - 1}
          onClick={() => moveSection(sectionId, "down")}
          className="p-1 text-[10px] bg-slate-100 hover:bg-slate-200 rounded text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          title="Aşağı Taşı"
        >
          ▼
        </button>
      </div>
    );
  };

  // Sol Form Render
  const renderFormSection = (order: SectionOrder) => {
    switch (order.type) {
      case "summary":
        return (
          <div key="form_summary" className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
            <div className="flex justify-between items-center pb-2 border-b">
              <label className="block text-sm font-bold text-slate-800">Profil Özeti (Hakkımda)</label>
              <SectionHeaderControls sectionId="summary" />
            </div>
            <textarea
              name="summary"
              rows={3}
              value={cvData.summary}
              onChange={handleChange}
              placeholder="Kendinizden ve kariyer hedeflerinizden bahsedin..."
              className="w-full border border-slate-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
            />
          </div>
        );

      case "skills":
        return (
          <div key="form_skills" className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
            <div className="flex justify-between items-center pb-2 border-b">
              <label className="block text-sm font-bold text-slate-800">Beceriler (Virgülle ayırın)</label>
              <SectionHeaderControls sectionId="skills" />
            </div>
            <input
              type="text"
              name="skills"
              value={cvData.skills}
              onChange={handleChange}
              placeholder="Örn: React, Node.js, Proje Yönetimi"
              className="w-full border border-slate-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
            />
          </div>
        );

      case "experiences":
        return (
          <div key="form_experiences" className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-800">İş Deneyimi</h2>
                <SectionHeaderControls sectionId="experiences" />
              </div>
              <button
                onClick={addExperience}
                className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold px-3 py-1.5 rounded-lg transition-all"
              >
                + Deneyim Ekle
              </button>
            </div>

            <div className="space-y-4">
              {cvData.experiences.map((exp) => (
                <div key={exp.id} className="p-3 border border-slate-200 rounded-lg bg-white relative space-y-3">
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-xs font-bold"
                  >
                    Sil ✕
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                    <input
                      type="text"
                      placeholder="Şirket Adı"
                      value={exp.company}
                      onChange={(e) => handleExpChange(exp.id, "company", e.target.value)}
                      className="border border-slate-300 p-2 rounded-lg text-xs w-full"
                    />
                    <input
                      type="text"
                      placeholder="Pozisyon / Unvan"
                      value={exp.role}
                      onChange={(e) => handleExpChange(exp.id, "role", e.target.value)}
                      className="border border-slate-300 p-2 rounded-lg text-xs w-full"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Tarih / Yıl (Örn: 2020 - 2023)"
                    value={exp.year}
                    onChange={(e) => handleExpChange(exp.id, "year", e.target.value)}
                    className="border border-slate-300 p-2 rounded-lg text-xs w-full"
                  />
                  <textarea
                    placeholder="Açıklama / Sorumluluklar"
                    rows={2}
                    value={exp.desc}
                    onChange={(e) => handleExpChange(exp.id, "desc", e.target.value)}
                    className="border border-slate-300 p-2 rounded-lg text-xs w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case "educations":
        return (
          <div key="form_educations" className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-800">Eğitim</h2>
                <SectionHeaderControls sectionId="educations" />
              </div>
              <button
                onClick={addEducation}
                className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold px-3 py-1.5 rounded-lg transition-all"
              >
                + Eğitim Ekle
              </button>
            </div>

            <div className="space-y-4">
              {cvData.educations.map((edu) => (
                <div key={edu.id} className="p-3 border border-slate-200 rounded-lg bg-white relative space-y-3">
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-xs font-bold"
                  >
                    Sil ✕
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                    <input
                      type="text"
                      placeholder="Okul / Üniversite"
                      value={edu.school}
                      onChange={(e) => handleEduChange(edu.id, "school", e.target.value)}
                      className="border border-slate-300 p-2 rounded-lg text-xs w-full"
                    />
                    <input
                      type="text"
                      placeholder="Bölüm / Derece"
                      value={edu.degree}
                      onChange={(e) => handleEduChange(edu.id, "degree", e.target.value)}
                      className="border border-slate-300 p-2 rounded-lg text-xs w-full"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Yıl (Örn: 2017 - 2021)"
                    value={edu.year}
                    onChange={(e) => handleEduChange(edu.id, "year", e.target.value)}
                    className="border border-slate-300 p-2 rounded-lg text-xs w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case "custom": {
        const sec = cvData.customSections.find((s) => s.id === order.id);
        if (!sec) return null;

        return (
          <div key={sec.id} className="p-4 border border-blue-200 rounded-xl bg-blue-50/30 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-blue-200">
              <div className="flex items-center gap-2 flex-1 mr-4">
                <input
                  type="text"
                  value={sec.sectionTitle}
                  onChange={(e) => handleCustomSectionTitleChange(sec.id, e.target.value)}
                  placeholder="Bölüm Başlığı (Örn: Sertifikalar)"
                  className="font-bold text-slate-800 bg-white border border-slate-300 px-2 py-1 rounded text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <SectionHeaderControls sectionId={sec.id} />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => addCustomItem(sec.id)}
                  className="text-xs bg-blue-600 text-white font-semibold px-2.5 py-1 rounded hover:bg-blue-700 transition-all shrink-0"
                >
                  + Madde Ekle
                </button>
                <button
                  onClick={() => removeCustomSection(sec.id)}
                  className="text-xs text-red-600 font-bold hover:underline shrink-0"
                >
                  Sil
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {sec.items.map((item) => (
                <div key={item.id} className="p-3 bg-white border border-slate-200 rounded-lg relative space-y-2">
                  <button
                    onClick={() => removeCustomItem(sec.id, item.id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-bold"
                  >
                    ✕
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pr-6">
                    <input
                      type="text"
                      placeholder="Başlık (Örn: İngilizce / AWS Sertifikası)"
                      value={item.title}
                      onChange={(e) => handleCustomItemChange(sec.id, item.id, "title", e.target.value)}
                      className="border border-slate-300 p-1.5 rounded text-xs w-full"
                    />
                    <input
                      type="text"
                      placeholder="Alt Başlık / Seviye (Örn: C1 / İleri Derece)"
                      value={item.subtitle}
                      onChange={(e) => handleCustomItemChange(sec.id, item.id, "subtitle", e.target.value)}
                      className="border border-slate-300 p-1.5 rounded text-xs w-full"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Tarih / Yıl (İsteğe Bağlı)"
                      value={item.date}
                      onChange={(e) => handleCustomItemChange(sec.id, item.id, "date", e.target.value)}
                      className="border border-slate-300 p-1.5 rounded text-xs w-full"
                    />
                    <input
                      type="text"
                      placeholder="Kısa Açıklama (İsteğe Bağlı)"
                      value={item.description}
                      onChange={(e) => handleCustomItemChange(sec.id, item.id, "description", e.target.value)}
                      className="border border-slate-300 p-1.5 rounded text-xs w-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  // Sağ A4 Canlı Önizleme Bölümleri (İçerik)
  const renderCVSection = (order: SectionOrder, isDarkBackground = false) => {
    const SectionHeader = ({ title }: { title: string }) => (
      <div
        className={`mb-3 border-b-2 pb-1 flex items-center justify-between ${
          isDarkBackground ? "border-white/30" : ""
        }`}
        style={{ borderColor: isDarkBackground ? "rgba(255,255,255,0.3)" : cvData.accentColor }}
      >
        <h3
          className={`text-xs uppercase tracking-wider font-extrabold ${
            isDarkBackground ? "text-white" : "text-slate-900"
          } ${cvData.isBoldText ? "font-black" : ""}`}
        >
          {title}
        </h3>
      </div>
    );

    switch (order.type) {
      case "summary":
        return cvData.summary ? (
          <div key="cv_summary" className="mb-6">
            <SectionHeader title="Hakkımda" />
            <p
              className={`text-xs leading-relaxed ${
                isDarkBackground ? "text-white/90" : "text-slate-800"
              } ${cvData.isBoldText ? "font-medium" : ""}`}
            >
              {cvData.summary}
            </p>
          </div>
        ) : null;

      case "skills":
        return cvData.skills ? (
          <div key="cv_skills" className="mb-6">
            <SectionHeader title="Beceriler" />
            <div className="flex flex-wrap gap-1.5">
              {cvData.skills.split(",").map((skill, index) => (
                <span
                  key={index}
                  className={`text-xs px-2.5 py-1 rounded ${
                    isDarkBackground
                      ? "bg-white/20 text-white border border-white/30 font-semibold"
                      : "bg-slate-100 border border-slate-200 text-slate-900 font-semibold"
                  } ${cvData.isBoldText ? "font-bold" : ""}`}
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        ) : null;

      case "experiences":
        return cvData.experiences.length > 0 ? (
          <div key="cv_experiences" className="mb-6">
            <SectionHeader title="İş Deneyimi" />
            {cvData.experiences.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <span
                    className={`text-sm ${
                      isDarkBackground ? "text-white" : "text-slate-900"
                    } ${cvData.isBoldText ? "font-extrabold" : "font-bold"}`}
                  >
                    {exp.role || "Pozisyon"}
                  </span>
                  <span className={`text-xs font-semibold ${isDarkBackground ? "text-white/70" : "text-slate-500"}`}>
                    {exp.year}
                  </span>
                </div>
                <div
                  className={`text-xs mb-1 ${cvData.isBoldText ? "font-bold" : "font-semibold"}`}
                  style={{ color: isDarkBackground ? "#ffffff" : cvData.accentColor }}
                >
                  {exp.company}
                </div>
                {exp.desc && (
                  <p
                    className={`text-xs leading-normal ${
                      isDarkBackground ? "text-white/80" : "text-slate-700"
                    } ${cvData.isBoldText ? "font-medium" : ""}`}
                  >
                    {exp.desc}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case "educations":
        return cvData.educations.length > 0 ? (
          <div key="cv_educations" className="mb-6">
            <SectionHeader title="Eğitim" />
            {cvData.educations.map((edu) => (
              <div key={edu.id} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <span
                    className={`text-sm ${
                      isDarkBackground ? "text-white" : "text-slate-900"
                    } ${cvData.isBoldText ? "font-extrabold" : "font-bold"}`}
                  >
                    {edu.school || "Okul"}
                  </span>
                  <span className={`text-xs font-semibold ${isDarkBackground ? "text-white/70" : "text-slate-500"}`}>
                    {edu.year}
                  </span>
                </div>
                <div className={`text-xs ${isDarkBackground ? "text-white/80" : "text-slate-700"} ${cvData.isBoldText ? "font-semibold" : ""}`}>
                  {edu.degree}
                </div>
              </div>
            ))}
          </div>
        ) : null;

      case "custom": {
        const customSec = cvData.customSections.find((s) => s.id === order.id);
        if (!customSec || customSec.items.length === 0) return null;

        return (
          <div key={customSec.id} className="mb-6">
            <SectionHeader title={customSec.sectionTitle || "Özel Bölüm"} />
            {customSec.items.map((item) => (
              <div key={item.id} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <span
                    className={`text-sm ${
                      isDarkBackground ? "text-white" : "text-slate-900"
                    } ${cvData.isBoldText ? "font-extrabold" : "font-bold"}`}
                  >
                    {item.title}
                  </span>
                  {item.date && (
                    <span className={`text-xs font-semibold ${isDarkBackground ? "text-white/70" : "text-slate-500"}`}>
                      {item.date}
                    </span>
                  )}
                </div>
                {item.subtitle && (
                  <div
                    className={`text-xs mb-0.5 ${cvData.isBoldText ? "font-bold" : "font-semibold"}`}
                    style={{ color: isDarkBackground ? "#ffffff" : cvData.accentColor }}
                  >
                    {item.subtitle}
                  </div>
                )}
                {item.description && (
                  <p
                    className={`text-xs leading-normal ${
                      isDarkBackground ? "text-white/80" : "text-slate-700"
                    } ${cvData.isBoldText ? "font-medium" : ""}`}
                  >
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        );
      }

      default:
        return null;
    }
  };

  // MODERN ŞABLON İÇİN AKILLI DİNAMİK TAŞMA DÜZENLEYİCİSİ
  const getModernColumnSplit = () => {
    let currentScore = 0;
    const MAX_LEFT_SCORE = 12;

    const leftOrders: SectionOrder[] = [];
    const rightOrders: SectionOrder[] = [];

    cvData.sectionOrders.forEach((order) => {
      let score = 0;
      if (order.type === "skills" && cvData.skills) score = 3;
      else if (order.type === "summary" && cvData.summary) score = 4;
      else if (order.type === "educations") score = Math.max(2, cvData.educations.length * 2.5);
      else if (order.type === "experiences") score = Math.max(3, cvData.experiences.length * 3.5);
      else if (order.type === "custom") {
        const sec = cvData.customSections.find((s) => s.id === order.id);
        score = sec ? Math.max(2, sec.items.length * 2) : 0;
      }

      if (currentScore + score <= MAX_LEFT_SCORE) {
        leftOrders.push(order);
        currentScore += score;
      } else {
        rightOrders.push(order);
      }
    });

    return { leftOrders, rightOrders };
  };

  const { leftOrders: modernLeftOrders, rightOrders: modernRightOrders } = getModernColumnSplit();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <style jsx global>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body * {
            visibility: hidden;
          }
          #printable-cv, #printable-cv * {
            visibility: visible;
          }
          #printable-cv {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            box-shadow: none !important;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      `}</style>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-3 flex justify-between items-center sticky top-0 z-10 shadow-sm print:hidden">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="CVSablon.com Logo"
            className="h-12 md:h-16 w-auto object-contain"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* YEDEK DOSYASI İNDİR / YÜKLE */}
          <button
            onClick={exportJSON}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3.5 py-2 rounded-xl text-xs transition-all flex items-center gap-1.5 border border-slate-300"
            title="CV verilerinizi bilgisayarınıza .json olarak indirir"
          >
            <span>💾 Yedekle (.json)</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3.5 py-2 rounded-xl text-xs transition-all flex items-center gap-1.5 border border-slate-300"
            title="Daha önce indirdiğiniz .json yedek dosyasını yükler"
          >
            <span>📂 CV Yükle</span>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={importJSON}
            accept=".json"
            className="hidden"
          />

          <button
            onClick={() => setShowPaywall(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 text-sm"
          >
            <span>CV'yi İndir</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 max-w-[1600px] w-full mx-auto print:block print:p-0">
        
        {/* SOL FORM */}
        <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 overflow-y-auto max-h-[calc(100vh-120px)] space-y-6 print:hidden">
          
          {/* ŞABLON DÜZENİ SEÇENEĞİ */}
          <div className="p-4 border border-blue-200 rounded-xl bg-blue-50/40 space-y-3">
            <label className="block text-xs font-bold text-slate-800">
              Şablon Düzeni Seçin
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleTemplateChange("classic")}
                className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                  cvData.template === "classic"
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                }`}
              >
                <span>📜 Klasik Minimal</span>
              </button>

              <button
                onClick={() => handleTemplateChange("modern")}
                className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                  cvData.template === "modern"
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                }`}
              >
                <span>🎨 Modern (2-Kolonlu)</span>
              </button>
            </div>
          </div>

          {/* RENK, FONT KALINLIĞI VE FORMU SİFİR / ÖRNEK BUTONLARI */}
          <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-4">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Şablon Vurgu Rengi
                </label>
                <div className="flex items-center gap-2.5">
                  {COLOR_OPTIONS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => handleColorChange(color.value)}
                      className={`w-7 h-7 rounded-full ${color.bg} flex items-center justify-center transition-all ${
                        cvData.accentColor === color.value
                          ? "ring-4 ring-slate-300 scale-110 shadow-md"
                          : "opacity-80 hover:opacity-100"
                      }`}
                      title={color.name}
                    >
                      {cvData.accentColor === color.value && (
                        <span className="text-white text-[10px] font-bold">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleBoldText}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    cvData.isBoldText
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                  }`}
                  title="Görünümü daha belirgin ve koyu yapar"
                >
                  {cvData.isBoldText ? "✓ Koyu / Bold" : "Normal Mod"}
                </button>

                <button
                  onClick={resetForm}
                  className="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-all flex items-center gap-1"
                  title="Tüm alanları sıfırlar"
                >
                  🗑️ Sıfırla
                </button>

                <button
                  onClick={loadSampleData}
                  className="px-3 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all"
                  title="Örnek veriyi yükler"
                >
                  ⚡ Örnek Yükle
                </button>
              </div>
            </div>
          </div>

          {/* Kişisel Bilgiler & Fotoğraf */}
          <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-4">
            <h2 className="text-sm font-bold text-slate-800 pb-2 border-b">
              Kişisel Bilgiler
            </h2>

            {/* Profil Fotoğrafı Alanı */}
            <div className="p-3 border border-dashed border-slate-300 rounded-xl bg-white space-y-3">
              <div className="flex items-center gap-4">