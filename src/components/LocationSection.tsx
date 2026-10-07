import React, { useState } from 'react';
import { STORE_CONTACT, STORE_SCHEDULE, getStoreStatus } from '../data/opticaData';
import {
  MapPin,
  Clock,
  Navigation,
  Copy,
  Check,
  ExternalLink,
  Phone,
  Car,
  Bus,
} from 'lucide-react';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const status = getStoreStatus();
  const currentDayIndex = new Date().getDay();

  const handleCopy = () => {
    navigator.clipboard.writeText(STORE_CONTACT.fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const orderedSchedule = [
    ...STORE_SCHEDULE.filter((s) => s.dayIndex !== 0),
    ...STORE_SCHEDULE.filter((s) => s.dayIndex === 0),
  ];

  return (
    <section id="ubicacion" className="bg-white py-20 px-4 sm:px-6 border-b border-[#e7ecf7]">
      <div className="max-w-[1220px] mx-auto">
        {/* Header like opticavision.com.ar */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="text-xs font-bold tracking-[2px] text-[#2584fe] uppercase block">
            DÓNDE ESTAMOS
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl font-bold text-[#07115c] mt-2">
            Salón y Taller en Las Heras, Mendoza
          </h2>
          <p className="mt-3 text-base text-[#5b668a]">
            para cuidar tu salud visual en el Gran Mendoza. Lunes a viernes de 9:30 a 13:30 y 16:30 a 20:30,
            sábados de 9:00 a 13:00.
          </p>
        </div>

        {/* Grid like opticavision store cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Store Location Card (lg:col-span-6) */}
          <div className="lg:col-span-6 border border-[#e7ecf7] rounded-3xl overflow-hidden bg-white shadow-lg space-y-6 p-6 sm:p-8">
            <div className="flex items-start justify-between pb-5 border-b border-[#e7ecf7]">
              <div>
                <span className="text-xs font-semibold text-[#8791ac] uppercase tracking-wider">
                  Sede Central & Taller
                </span>
                <h3 className="font-editorial text-3xl font-bold text-[#07115c] mt-1">
                  Río Diamante 2700, Las Heras
                </h3>
                <p className="text-xs text-[#5b668a] mt-0.5">
                  Barrio Jardín Municipal / Smata · Mendoza (CP 5539)
                </p>
              </div>

              {/* Real-time Open/Closed Badge matching screenshot */}
              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#f0fbf5] text-emerald-700 border border-emerald-200">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'
                    }`}
                  />
                  <span>{status.statusBadge}</span>
                </span>
                <p className="text-[11px] text-[#8791ac] mt-1 font-mono">
                  {status.currentTimeString} hs
                </p>
              </div>
            </div>

            {/* Exact Schedule Table from user's image */}
            <div>
              <p className="text-xs font-bold text-[#07115c] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2584fe]" />
                <span>Horarios de Atención al Público</span>
              </p>

              <div className="space-y-1.5 text-xs text-[#3a4670]">
                {orderedSchedule.map((item) => {
                  const isToday = item.dayIndex === currentDayIndex;
                  return (
                    <div
                      key={item.dayName}
                      className={`flex items-center justify-between py-1.5 px-3 rounded-lg ${
                        isToday
                          ? 'bg-[#f0f5ff] font-semibold text-[#07115c] border border-[#d6e4ff]'
                          : 'hover:bg-zinc-50'
                      }`}
                    >
                      <span className="capitalize flex items-center gap-2">
                        <span>{item.dayName}</span>
                        {isToday && (
                          <span className="text-[10px] text-[#2584fe] font-bold">
                            (Hoy)
                          </span>
                        )}
                      </span>

                      <span className="font-mono text-xs">
                        {item.isClosed ? (
                          <span className="text-zinc-400 font-normal">Cerrado</span>
                        ) : item.openAfternoon ? (
                          <span>
                            {item.openMorning} - {item.closeMorning} / {item.openAfternoon} - {item.closeAfternoon}
                          </span>
                        ) : (
                          <span>
                            {item.openMorning} - {item.closeMorning}
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Action Pill Buttons like opticavision.com.ar */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <a
                href={STORE_CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#2584fe] hover:bg-[#126fe8] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Abrir en Google Maps</span>
                <ExternalLink className="w-3 h-3 text-white/70" />
              </a>

              <button
                onClick={handleCopy}
                className="px-4 py-2.5 rounded-full border border-[#e7ecf7] text-[#5b668a] hover:text-[#07115c] hover:bg-zinc-50 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copiada</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Copiar Dirección</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Google Map Embed (lg:col-span-6) */}
          <div className="lg:col-span-6 border border-[#e7ecf7] rounded-3xl overflow-hidden bg-white shadow-lg h-[460px] relative">
            <iframe
              title="Ubicación de Óptica Modo en Las Heras, Mendoza"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.5362335069794!2d-68.86365422363162!3d-32.846629273634024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e090019483451%3A0x69ca6c539f02398!2zw5NwdGljYSBNb2Rv!5e0!3m2!1ses!2sar!4v1741380000000!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />

            {/* Bottom Floating Bar */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#e7ecf7] shadow-lg flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#0a1668] text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#8ab6ff]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#07115c]">Óptica Modo</p>
                  <p className="text-[11px] text-[#5b668a]">Río Diamante 2700 · Las Heras</p>
                </div>
              </div>

              <a
                href={STORE_CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#2584fe] hover:underline flex items-center gap-1"
              >
                <span>GPS</span>
                <Navigation className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
