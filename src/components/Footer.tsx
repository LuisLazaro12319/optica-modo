import React from 'react';
import { STORE_CONTACT } from '../data/opticaData';
import { MapPin, Instagram, MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (id: string) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenContact }) => {
  return (
    <footer className="bg-[#060c2c] text-white/80 text-xs border-t border-white/10">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white text-xs">
                M
              </div>
              <span className="font-editorial text-2xl font-bold tracking-tight text-white">
                Óptica Modo
              </span>
            </div>

            <p className="text-white/60 text-xs leading-relaxed max-w-sm">
              Cuidamos tu salud visual en Las Heras, Mendoza. Armazones de diseño, cristales oftálmicos de alta precisión
              y taller propio de calibrado computarizado en Río Diamante 2700.
            </p>

            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={STORE_CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                title="Instagram @opticamodo"
              >
                <Instagram className="w-4 h-4 text-rose-300" />
              </a>
              <a
                href={`https://wa.me/${STORE_CONTACT.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                title="WhatsApp Óptica Modo"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
              </a>
              <a
                href={STORE_CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                title="Google Maps"
              >
                <MapPin className="w-4 h-4 text-[#8ab6ff]" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Menú</p>
            <ul className="space-y-2 text-white/70">
              <li>
                <button
                  onClick={() => onNavigateSection('top')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('productos')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Productos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('laboratorio')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Taller Propio HD
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('obras-sociales')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Obras Sociales
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('ubicacion')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Ubicación & Horarios
                </button>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Horarios en Las Heras</p>
            <div className="space-y-2 text-white/70 text-[11px]">
              <div>
                <span className="text-white font-medium block">Lunes a Viernes:</span>
                <span>09:30 a 13:30 hs y 16:30 a 20:30 hs</span>
              </div>
              <div>
                <span className="text-white font-medium block">Sábados:</span>
                <span>09:00 a 13:00 hs</span>
              </div>
              <div>
                <span className="text-white/40">Domingos cerrado</span>
              </div>
            </div>
          </div>

          {/* Location & Map shortcut */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Ubicación</p>
            <p className="text-white font-medium text-xs">
              Río Diamante 2700
            </p>
            <p className="text-white/60 text-[11px] leading-relaxed">
              Barrio Jardín Municipal / Smata<br />
              Las Heras, Mendoza (CP 5539)<br />
              República Argentina
            </p>
            <a
              href={STORE_CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#8ab6ff] hover:text-white font-semibold pt-1 transition-colors"
            >
              <span>Abrir en Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/50 text-[11px]">
          <p>© {new Date().getFullYear()} Óptica Modo · Las Heras, Mendoza. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#8ab6ff]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Ópticos Matriculados</span>
            </span>
            <span>·</span>
            <span>Atención con Obras Sociales</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
