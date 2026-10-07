import React, { useState, useEffect } from 'react';
import { STORE_CONTACT, getStoreStatus } from '../data/opticaData';
import { MapPin, Clock, MessageCircle, Menu, X, ArrowUpRight, Phone } from 'lucide-react';

interface NavbarProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateSection, onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState(() => getStoreStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getStoreStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleNav = (id: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(id);
  };

  const whatsappMessage = encodeURIComponent(
    'Hola Óptica Modo! Les escribo desde su página web para hacer una consulta sobre armazones y cristales.'
  );

  return (
    <>
      {/* Top Banner with Realtime Schedule Indicator */}
      <div className="bg-[#050b29] text-zinc-300 text-xs py-1.5 px-4 border-b border-white/10">
        <div className="max-w-[1220px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-zinc-200">
              <MapPin className="w-3.5 h-3.5 text-[#2584fe] shrink-0" />
              <span>Río Diamante 2700, Las Heras, Mendoza</span>
            </span>
            <span className="hidden md:inline text-zinc-600">·</span>
            <span className="hidden md:flex items-center gap-1.5 text-zinc-400">
              <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>Hora local: {status.currentTimeString} hs</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span
                className={`w-2 h-2 rounded-full ${
                  status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <span className={status.isOpen ? 'text-emerald-300' : 'text-amber-300'}>
                {status.statusBadge}
              </span>
              <span className="text-zinc-400 hidden lg:inline">({status.statusDetail})</span>
            </span>
            <span className="text-zinc-600">·</span>
            <a
              href={STORE_CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>{STORE_CONTACT.instagramHandle}</span>
              <ArrowUpRight className="w-3 h-3 text-[#2584fe]" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Header in Óptica Visión Deep Navy Gradient style */}
      <header
        style={{
          background: 'linear-gradient(100deg, #0a1668 0%, #123a9e 100%)',
          boxShadow: '0 2px 18px rgba(4,10,46,0.25)',
        }}
        className="sticky top-0 z-50 text-white"
      >
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-6">
          {/* Logo Brand Lockup */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 text-white transition-opacity hover:opacity-95 shrink-0"
          >
            <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white tracking-widest text-sm shadow-inner">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-editorial text-2xl font-bold tracking-tight text-white leading-none">
                Óptica Modo
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8ab6ff] font-medium leading-tight mt-0.5">
                Las Heras · Mendoza
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => handleNav('top')}
              className="text-[14px] font-bold text-white hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => handleNav('productos')}
              className="text-[14px] font-medium text-white/85 hover:text-white transition-colors cursor-pointer"
            >
              Productos
            </button>
            <button
              onClick={() => handleNav('laboratorio')}
              className="text-[14px] font-medium text-white/85 hover:text-white transition-colors cursor-pointer"
            >
              Taller Propio
            </button>
            <button
              onClick={() => handleNav('obras-sociales')}
              className="text-[14px] font-medium text-white/85 hover:text-white transition-colors cursor-pointer"
            >
              Obras Sociales
            </button>
            <button
              onClick={() => handleNav('ubicacion')}
              className="text-[14px] font-medium text-white/85 hover:text-white transition-colors cursor-pointer"
            >
              Ubicación & Horarios
            </button>
            <button
              onClick={() => handleNav('estilo')}
              className="text-[14px] font-medium text-white/85 hover:text-white transition-colors cursor-pointer"
            >
              Asesor de Rostro
            </button>

            {/* Social Icons separator */}
            <span className="flex items-center gap-2.5 pl-3 border-l border-white/20">
              <a
                href={STORE_CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @opticamodo"
                className="text-white hover:text-[#8ab6ff] transition-colors"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5"></rect>
                  <circle cx="12" cy="12" r="4"></circle>
                  <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"></circle>
                </svg>
              </a>
              <a
                href={`https://wa.me/${STORE_CONTACT.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Óptica Modo"
                className="text-white hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </span>
          </nav>

          {/* Action Zone: Contacto Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenContact}
              className="px-5 py-2 rounded-full border-[1.5px] border-white/60 text-white text-[13px] font-semibold hover:bg-white hover:text-[#0a1668] transition-all cursor-pointer shadow-sm"
            >
              Contacto
            </button>

            {/* Mobile Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-white hover:text-[#8ab6ff]"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#07115c] border-t border-white/10 px-6 py-5 space-y-3">
            <div className="flex flex-col space-y-3 text-sm">
              <button
                onClick={() => handleNav('top')}
                className="text-left py-1 text-white font-bold"
              >
                Home
              </button>
              <button
                onClick={() => handleNav('productos')}
                className="text-left py-1 text-white/80 hover:text-white"
              >
                Productos
              </button>
              <button
                onClick={() => handleNav('laboratorio')}
                className="text-left py-1 text-white/80 hover:text-white"
              >
                Taller Propio & Cristales HD
              </button>
              <button
                onClick={() => handleNav('obras-sociales')}
                className="text-left py-1 text-white/80 hover:text-white"
              >
                Obras Sociales
              </button>
              <button
                onClick={() => handleNav('ubicacion')}
                className="text-left py-1 text-white/80 hover:text-white"
              >
                Ubicación & Horarios en Las Heras
              </button>
              <button
                onClick={() => handleNav('estilo')}
                className="text-left py-1 text-white/80 hover:text-white"
              >
                Asesor de Rostro y Estilo
              </button>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
              <a
                href={`https://wa.me/${STORE_CONTACT.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 text-white rounded-full text-xs font-bold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Óptica Modo</span>
              </a>
              <a
                href={STORE_CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 bg-white/10 text-white rounded-full text-xs font-semibold"
              >
                <MapPin className="w-4 h-4 text-[#8ab6ff]" />
                <span>Ver en Google Maps</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
