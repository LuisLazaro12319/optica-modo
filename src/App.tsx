/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandMarquee } from './components/BrandMarquee';
import { LaboratorySection } from './components/LaboratorySection';
import { HealthInsuranceSection } from './components/HealthInsuranceSection';
import { LocationSection } from './components/LocationSection';
import { StyleAdvisorSection } from './components/StyleAdvisorSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { STORE_CONTACT } from './data/opticaData';
import { WhatsAppIcon } from './components/BrandIcons';

export default function App() {
  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0b1230]">
      {/* Top Navy Gradient Header */}
      <Navbar onNavigateSection={scrollToSection} />

      {/* Main Content Sections inspired by opticavision.com.ar */}
      <main className="flex-1">
        {/* Hero Section: "Tu visión. Nuestro compromiso." */}
        <Hero
          onNavigateSection={scrollToSection}
          onOpenContact={() => scrollToSection('contacto')}
        />

        {/* Brands Ribbon */}
        <BrandMarquee />

        {/* Section 3: "Laboratorio Óptico & Cristales HD" (Modeled after Widefield) */}
        <LaboratorySection onOpenContact={() => scrollToSection('contacto')} />

        {/* Section 4: "Obras Sociales & Prepagas" (Modeled after Tenés OSDE / Obras) */}
        <HealthInsuranceSection />

        {/* Section 5: "Dónde Estamos" (Río Diamante 2700, Las Heras, Mendoza + Exact Schedule) */}
        <LocationSection />

        {/* Section 6: "Asesor de Calce según tu Rostro" (Professional face shape advice) */}
        <StyleAdvisorSection />

        {/* Section 7: "Hablemos de tu visión" (Contact Form, WhatsApp & Prescription Upload) */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={scrollToSection}
        onOpenContact={() => scrollToSection('contacto')}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <aside aria-label="Contacto directo" className="fixed bottom-6 right-6 z-40">
        <a
          href={`https://wa.me/${STORE_CONTACT.whatsappNumber}?text=${encodeURIComponent(
            'Hola Óptica Modo! Les escribo desde su página web para hacer una consulta sobre armazones y atención en Río Diamante 2700.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 flex items-center justify-center bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105"
          title="WhatsApp Óptica Modo"
          aria-label="WhatsApp Óptica Modo"
        >
          <WhatsAppIcon className="w-7 h-7" />
        </a>
      </aside>
    </div>
  );
}
