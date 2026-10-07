import React, { useState, useRef } from 'react';
import { STORE_CONTACT } from '../data/opticaData';
import { MapPin, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';

const HERO_VIDEO = `${import.meta.env.BASE_URL}videos/hero-optica-modo.mp4`;

interface HeroProps {
  onNavigateSection: (id: string) => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateSection }) => {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleToggleSound = () => {
    if (!videoRef.current) return;

    if (isMuted) {
      // Unmute and play
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.play().catch((err) => {
        console.warn('Autoplay error', err);
      });
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <section
      id="top"
      className="relative bg-[#07115c] text-white overflow-hidden min-h-[90vh] sm:min-h-[94vh] flex items-center"
      style={{ minHeight: '90vh' }}
    >
      {/* Background Cinematic Video with Audio support */}
      <video
        ref={videoRef}
        src={HERO_VIDEO}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        preload="auto"
        aria-label="Óptica Modo - Video Institucional"
        className="absolute inset-0 w-full h-full object-cover transform origin-top-left scale-105 pointer-events-none select-none"
      />

      {/* Measured Gradient Scrim for WCAG AA readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(7,17,92,0.95) 0%, rgba(7,17,92,0.82) 38%, rgba(7,17,92,0.35) 68%, rgba(7,17,92,0.08) 92%)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07115c]/90 via-transparent to-transparent pointer-events-none sm:hidden" />

      {/* Floating Video Audio Control (Top-right) */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
        <button
          onClick={handleToggleSound}
          className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md text-xs font-bold transition-all shadow-xl cursor-pointer ${
            isMuted
              ? 'bg-black/50 hover:bg-black/70 text-white/90 border border-white/20'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-400 ring-2 ring-emerald-400/40 animate-pulse'
          }`}
          title={isMuted ? 'Hacé clic para escuchar el audio' : 'Silenciar audio'}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-amber-300" />
              <span>Activar Audio</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-white" />
              <span>Audio Activado</span>
            </>
          )}
        </button>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 w-full max-w-[1220px] mx-auto px-4 sm:px-6 py-20 lg:py-28">
        <div className="max-w-[620px] space-y-6">
          {/* Pill kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-[#8ab6ff]">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Tu mirada es única · Óptica Modo en Las Heras</span>
          </div>

          {/* Heading in Cormorant Garamond */}
          <h1 className="font-editorial text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.98] tracking-[-0.02em] text-white text-balance">
            Tu visión.<br />
            <span className="text-[#2584fe]">Nuestro</span><br />
            <span className="text-[#2584fe]">compromiso.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-[#c7d0ee] font-normal leading-relaxed max-w-[480px]">
            Descubrí el estilo que va con vos. Cuidá tus ojos con la mejor calidad en{' '}
            <strong>Río Diamante 2700, Las Heras</strong>. Calibrado computarizado en el día y atención
            con obras sociales.
          </p>

          {/* Audio Hint Badge */}
          {isMuted && (
            <div
              onClick={handleToggleSound}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/15 text-xs text-white/90 cursor-pointer transition-colors"
            >
              <Volume2 className="w-4 h-4 text-emerald-400 animate-bounce" />
              <span>Tocá acá para activar el audio del video</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3.5 sm:gap-4">
            <a
              href={`https://wa.me/${STORE_CONTACT.whatsappNumber}?text=${encodeURIComponent(
                'Hola Óptica Modo! Les consulto desde la web para probar armazones en Río Diamante 2700, Las Heras.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg hover:shadow-xl"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>Consultar por WhatsApp</span>
            </a>

            <button
              onClick={() => onNavigateSection('ubicacion')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border-[1.5px] border-white/60 hover:border-white text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer bg-white/5 backdrop-blur-sm"
            >
              <MapPin className="w-4 h-4 text-[#8ab6ff]" />
              <span>Dónde estamos</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/15 text-xs text-[#c7d0ee]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2584fe]" />
              <span>Taller propio en Las Heras</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2584fe]" />
              <span>Armado de lentes en el día</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2584fe]" />
              <span>Atención con Obras Sociales</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
