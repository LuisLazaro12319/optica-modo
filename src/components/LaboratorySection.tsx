import React from 'react';
import { STORE_CONTACT } from '../data/opticaData';
import { ShieldCheck, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

interface LaboratorySectionProps {
  onOpenContact: () => void;
}

export const LaboratorySection: React.FC<LaboratorySectionProps> = ({ onOpenContact }) => {
  return (
    <section
      id="laboratorio"
      className="relative bg-[#020517] text-white overflow-hidden py-24 sm:py-28"
    >
      {/* Background imagery with measured gradient overlay */}
      <img
        src="/src/assets/images/optica_workshop_lab_1791385422221.jpg"
        alt="Taller Óptico y Laboratorio de Cristales Óptica Modo"
        className="absolute inset-0 w-full h-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020517]/95 via-[#020517]/85 to-[#020517]" />

      <div className="relative max-w-[1220px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading and 3 Numbered Principles */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[11px] font-bold tracking-[2.5px] text-[#00b9f2] uppercase block">
              GARANTÍA Y TALLER EXCLUSIVO DE ÓPTICA MODO
            </span>

            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              Taller Propio & Cristales HD
            </h2>

            <p className="text-[#b9c2e2] text-base sm:text-lg leading-relaxed max-w-xl">
              Nuestra tecnología exclusiva de cristales y calibrado en Las Heras, Mendoza.
              Mayor campo visual, mejor experiencia de uso y una garantía única en la provincia.
            </p>

            {/* 3 Editorial Numbered Blocks like opticavision.com.ar */}
            <div className="pt-4 space-y-6">
              <div className="flex gap-4 items-start">
                <span className="font-editorial italic text-3xl sm:text-4xl font-bold text-[#00b9f2] leading-none shrink-0 min-w-[36px]">
                  01
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                    Qué es
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9fb0d4] leading-relaxed">
                    Cristales oftálmicos de alta definición tallados con biselado computarizado en nuestro propio
                    local de <strong>Río Diamante 2700</strong>. Aseguramos el centrado pupilar y ángulo pantoscópico exacto.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="font-editorial italic text-3xl sm:text-4xl font-bold text-[#00b9f2] leading-none shrink-0 min-w-[36px]">
                  02
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                    Qué resuelve
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9fb0d4] leading-relaxed">
                    Elimina la fatiga visual, minimiza las aberraciones laterales en multifocales progresivos
                    y filtra selectivamente la radiación azul de monitores, celulares y sol de montaña.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="font-editorial italic text-3xl sm:text-4xl font-bold text-[#00b9f2] leading-none shrink-0 min-w-[36px]">
                  03
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                    Garantía exclusiva
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9fb0d4] leading-relaxed">
                    Garantía de adaptación de <strong>45 días</strong> en multifocales y calibración / alineación
                    gratuita permanente para todos nuestros clientes en Las Heras.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${STORE_CONTACT.whatsappNumber}?text=${encodeURIComponent(
                  'Hola Óptica Modo! Me gustaría cotizar cristales con receta en su taller propio de Río Diamante 2700.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#00b9f2] hover:bg-[#33c8f7] text-[#020517] font-bold text-xs transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Cotizar Cristales por WhatsApp</span>
              </a>

              <button
                onClick={onOpenContact}
                className="px-6 py-3 rounded-full border border-white/30 hover:border-white text-white font-medium text-xs transition-colors cursor-pointer"
              >
                Enviar Receta Oftalmológica
              </button>
            </div>
          </div>

          {/* Right Column: Warranty Card Container */}
          <div className="lg:col-span-5">
            <div className="bg-[#070e30]/90 border border-white/15 rounded-3xl p-8 backdrop-blur-md shadow-2xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-2xl bg-[#00b9f2]/20 text-[#00b9f2] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-editorial text-2xl font-bold text-white">
                    Garantía Integral Óptica Modo
                  </h4>
                  <p className="text-[11px] text-[#8ab6ff]">Tranquilidad y respaldo profesional</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-[#b9c2e2] leading-relaxed">
                <p>
                  Esta garantía cubre los materiales del anteojo elaborado en nuestro taller:
                </p>

                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00b9f2] mt-1.5 shrink-0" />
                    <span>
                      <strong className="text-white">Armazones (1 año):</strong> Defectos de soldadura, charnelas o fatiga de material.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00b9f2] mt-1.5 shrink-0" />
                    <span>
                      <strong className="text-white">Tratamientos (6 meses):</strong> Desprendimiento de capas de antirreflejo o filtro Blue Light.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00b9f2] mt-1.5 shrink-0" />
                    <span>
                      <strong className="text-white">Cristales Oftálmicos (1 año):</strong> Calidad de tallado y pureza óptica del polímero.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00b9f2] mt-1.5 shrink-0" />
                    <span>
                      <strong className="text-white">Adaptación Multifocal (45 días):</strong> Si no te adaptás al corredor progresivo, cambiamos la fórmula sin costo.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10 text-[11px] text-[#8ab6ff] flex items-center justify-between">
                <span>Taller en Río Diamante 2700</span>
                <span>Las Heras · Mendoza</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
