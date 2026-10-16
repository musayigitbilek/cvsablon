"use client";

import React, { useState, useEffect } from "react";

interface CVData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string;
  experience: { company: string; role: string; year: string; desc: string }[];
}

const initialData: CVData = {
  fullName: "Ahmet Yılmaz",
  title: "Kıdemli Yazılım Geliştirici",
  email: "ahmet@example.com",
  phone: "+90 555 123 45 67",
  location: "İstanbul, Türkiye",
  summary:
    "Modern web teknolojileri ve kullanıcı deneyimi odaklı yazılım geliştirme konusunda 5+ yıl deneyimli yazılım geliştirici.",
  skills: "Next.js, TypeScript, Tailwind CSS, React, Node.js, Git",
  experience: [
    {
      company: "Teknoloji A.Ş.",
      role: "Frontend Developer",
      year: "2022 - Halen",
      desc: "Performanslı web uygulamaları ve dinamik kullanıcı arayüzleri geliştirme.",
    },
  ],
};

export default function Home() {
  const [cvData, setCvData] = useState<CVData>(initialData);
  const [showPaywall, setShowPaywall] = useState(false);

  // Yerel hafızadan (localStorage) veriyi yükleme
  useEffect(() => {
    const savedData = localStorage.getItem("cvData");
    if (savedData) {
      try {
        setCvData(JSON.parse(savedData));
      } catch (e) {
        console.error("Kayıtlı veri okunamadı", e);
      }
    }
  }, []);

  // Form değiştikçe hafızaya kaydetme
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...cvData, [name]: value };
    setCvData(updated);
    localStorage.setItem("cvData", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Üst Bar / Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-2 rounded-lg font-bold text-xl">
            CV
          </div>
          <span className="font-bold text-xl text-slate-800 tracking-tight">
            CVSablon<span className="text-blue-600">.com</span>
          </span>
        </div>
        <button
          onClick={() => setShowPaywall(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-md transition-all flex items-center gap-2"
        >
          <span>CV'yi İndir</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </header>

      {/* Ana Gövde (Sol Form - Sağ Önizleme) */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 max-w-[1600px] w-full mx-auto">
        
        {/* SOL PANEL: FORM ALANLARI */}
        <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 overflow-y-auto max-h-[calc(100vh-120px)]">
          <h2 className="text-xl font-bold text-slate-800 mb-6 pb-2 border-b">
            Kişisel Bilgiler
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ad Soyad</label>
                <input
                  type="text"
                  name="fullName"
                  value={cvData.fullName}
                  onChange={handleChange}
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Unvan</label>
                <input
                  type="text"
                  name="title"
                  value={cvData.title}
                  onChange={handleChange}
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">E-posta</label>
                <input
                  type="email"
                  name="email"
                  value={cvData.email}
                  onChange={handleChange}
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Telefon</label>
                <input
                  type="text"
                  name="phone"
                  value={cvData.phone}
                  onChange={handleChange}
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Konum</label>
                <input
                  type="text"
                  name="location"
                  value={cvData.location}
                  onChange={handleChange}
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Profil Özeti</label>
              <textarea
                name="summary"
                rows={3}
                value={cvData.summary}
                onChange={handleChange}
                className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Beceriler (Virgülle ayırın)</label>
              <input
                type="text"
                name="skills"
                value={cvData.skills}
                onChange={handleChange}
                className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* SAĞ PANEL: CANLI CV ÖNİZLEME */}
        <section className="bg-slate-200 rounded-xl p-6 shadow-inner flex justify-center items-start overflow-y-auto max-h-[calc(100vh-120px)]">
          {/* A4 Kağıdı Görünümü */}
          <div className="bg-white w-full max-w-[595px] min-h-[842px] p-8 shadow-xl rounded-sm flex flex-col justify-between text-slate-800 relative">
            <div>
              {/* CV Header */}
              <div className="border-b-2 border-blue-600 pb-4 mb-6">
                <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-wide">
                  {cvData.fullName || "Adınız Soyadınız"}
                </h1>
                <p className="text-blue-600 font-semibold text-md">{cvData.title || "Unvanınız"}</p>
                
                <div className="flex flex-wrap gap-4 text-xs text-slate-500 mt-3">
                  {cvData.email && <span>📧 {cvData.email}</span>}
                  {cvData.phone && <span>📞 {cvData.phone}</span>}
                  {cvData.location && <span>📍 {cvData.location}</span>}
                </div>
              </div>

              {/* Özet */}
              {cvData.summary && (
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Hakkımda</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{cvData.summary}</p>
                </div>
              )}

              {/* Beceriler */}
              {cvData.skills && (
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Beceriler</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cvData.skills.split(",").map((skill, index) => (
                      <span key={index} className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded font-medium">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Deneyim */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">İş Deneyimi</h3>
                {cvData.experience.map((exp, idx) => (
                  <div key={idx} className="mb-3">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-sm text-slate-800">{exp.role}</span>
                      <span className="text-xs text-slate-400">{exp.year}</span>
                    </div>
                    <div className="text-xs text-blue-600 font-medium mb-1">{exp.company}</div>
                    <p className="text-xs text-slate-600 leading-normal">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Alt Kısım: Filigran (Ücretsiz Sürüm Amblemi) */}
            <div className="border-t pt-3 text-center text-[10px] text-slate-400 flex justify-between items-center">
              <span>Hazırlayan: CVSablon.com</span>
              <span>Sayfa 1 / 1</span>
            </div>
          </div>
        </section>

      </main>

      {/* İNDİRME MODAL (PAYWALL) */}
      {showPaywall && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowPaywall(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-xl"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-slate-900 mb-2">CV'nizi İndirin</h3>
            <p className="text-slate-600 text-sm mb-6">
              İhtiyacınıza uygun indirme seçeneğini belirleyin:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Ücretsiz */}
              <div className="border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:border-slate-300 transition-all">
                <div>
                  <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-1 rounded">Ücretsiz</span>
                  <h4 className="font-bold text-slate-800 mt-2">Logolu PDF</h4>
                  <p className="text-xs text-slate-500 mt-1">Alt kısımda cvsablon.com filigranı yer alır.</p>
                </div>
                <button
                  onClick={() => {
                    alert("Ücretsiz indirme başlatılıyor...");
                    setShowPaywall(false);
                  }}
                  className="mt-4 w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2 rounded-lg text-sm transition-all"
                >
                  Ücretsiz İndir
                </button>
              </div>

              {/* Pro */}
              <div className="border-2 border-blue-600 rounded-xl p-4 flex flex-col justify-between bg-blue-50/30 relative overflow-hidden">
                <span className="absolute -right-7 top-3 bg-blue-600 text-white text-[10px] font-bold py-0.5 px-8 rotate-45">
                  ÖNERİLEN
                </span>
                <div>
                  <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">Pro</span>
                  <h4 className="font-bold text-slate-900 mt-2">Temiz PDF (Logosuz)</h4>
                  <p className="text-xs text-slate-600 mt-1">Sıfır filigran, yüksek kalite baskı formatı.</p>
                </div>
                <button
                  onClick={() => {
                    alert("iyzico / PayTR Ödeme Sayfasına yönlendiriliyorsunuz (29.90 TL)...");
                    setShowPaywall(false);
                  }}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-sm shadow-md transition-all"
                >
                  29.90 TL ile İndir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}