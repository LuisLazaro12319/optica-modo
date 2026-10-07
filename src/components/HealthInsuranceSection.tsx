import React from 'react';
import { HEALTH_INSURANCES, STORE_CONTACT } from '../data/opticaData';
import { ShieldCheck, MessageCircle, FileText, ArrowRight } from 'lucide-react';

export const HealthInsuranceSection: React.FC = () => {
  return (
    <section id="obras-sociales" className="bg-[#f5f8ff] py-20 px-4 sm:px-6 border-b border-[#e7ecf7]">
      <div className="max-w-[1220px] mx-auto">
        {/* Banner inspired by opticavision's "Tenés OSDE. Tenés Visión" */}
        <div className="bg-gradient-to-r from-[#0a1668] to-[#123a9e] text-white rounded-3xl p-8 sm:p-12 mb-16 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="text-xs font-bold tracking-[2px] text-[#8ab6ff] uppercase block">
              COBERTURAS & REINTEGROS
            </span>

            <h2 className="font-editorial text-4xl sm:text-5xl font-bold leading-tight">
              ¿Tenés OSEP u OSDE? <br />
              <span className="text-[#33c8f7]">Tenés Óptica Modo.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#cfe1ff] leading-relaxed">
              Atendemos con las principales obras sociales y sistemas de medicina prepaga en Mendoza.
              Emitimos factura electrónica homologada por AFIP/ARCA para que gestiones tu reintegro al 100%
              sin demoras.
            </p>

            <div className="pt-3 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${STORE_CONTACT.whatsappNumber}?text=${encodeURIComponent(
                  'Hola Óptica Modo! Les consulto por cobertura y reintegro con mi obra social para hacerme anteojos.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-white hover:bg-zinc-100 text-[#0a1668] font-bold text-xs transition-colors flex items-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Consultar por mi Obra Social</span>
              </a>
            </div>
          </div>
        </div>

        {/* Section Header for Obras Sociales grid like opticavision */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-[2px] text-[#2584fe] uppercase block">
            CONVENIOS Y PRESTADORES
          </span>
          <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#07115c] mt-2">
            Obras Sociales en Mendoza
          </h3>
          <p className="text-sm text-[#5b668a] mt-2">
            Somos prestadores y facilitamos tu trámite con las principales coberturas del país.
          </p>
        </div>

        {/* Insurances Grid like opticavision.com.ar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {HEALTH_INSURANCES.map((os) => (
            <div
              key={os.name}
              className="bg-white border border-[#e7ecf7] rounded-2xl p-6 text-center transition-all duration-300 hover:border-[#2584fe] hover:shadow-lg flex flex-col justify-center min-h-[120px]"
            >
              <h4 className="font-editorial text-xl sm:text-2xl font-bold text-[#07115c] tracking-wider">
                {os.name}
              </h4>
              <p className="text-[11px] text-[#5b668a] mt-1">
                {os.highlight}
              </p>
            </div>
          ))}
        </div>

        {/* Trust info note */}
        <div className="mt-10 p-5 bg-white border border-[#e7ecf7] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#3a4670]">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#2584fe] shrink-0" />
            <span>
              <strong>Requisitos:</strong> Traé la receta original de tu oftalmólogo firmada y sellada + carnet digital de afiliado.
            </span>
          </div>

          <a
            href={`https://wa.me/${STORE_CONTACT.whatsappNumber}?text=${encodeURIComponent(
              'Hola Óptica Modo! Tengo mi receta y carnet para consultar qué cobertura me corresponde.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2584fe] hover:text-[#07115c] font-bold flex items-center gap-1 shrink-0"
          >
            <span>Preguntar requisitos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
