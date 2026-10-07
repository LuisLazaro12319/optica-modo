import React, { useState, useRef, useEffect } from 'react';
import { STORE_CONTACT } from '../data/opticaData';
import {
  MapPin,
  MessageCircle,
  ArrowRight,
  Volume2,
  VolumeX,
  Upload,
  Check,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { getCustomVideo, saveCustomVideo, clearCustomVideo } from '../utils/videoStorage';

interface HeroProps {
  onNavigateSection: (id: string) => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateSection, onOpenContact }) => {
  const [videoSrc, setVideoSrc] = useState<string>('/videos/hero-video.mp4');
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [hasCustomVideo, setHasCustomVideo] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if user previously loaded their video into IndexedDB
  useEffect(() => {
    let activeBlobUrl: string | null = null;
    getCustomVideo().then((blob) => {
      if (blob) {
        activeBlobUrl = URL.createObjectURL(blob);
        setVideoSrc(activeBlobUrl);
        setHasCustomVideo(true);
      }
    });

    return () => {
      if (activeBlobUrl) {
        URL.revokeObjectURL(activeBlobUrl);
      }
    };
  }, []);

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await saveCustomVideo(file);
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setHasCustomVideo(true);
      setIsMuted(false); // Unmute immediately when user uploads their video so they hear it!
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    }
  };

  const handleResetDefault = async () => {
    await clearCustomVideo();
    setVideoSrc('/videos/hero-video.mp4');
    setHasCustomVideo(false);
    setIsMuted(true);
    if (videoRef.current) {
      videoRef.current.muted = true;
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
        key={videoSrc}
        src={videoSrc}
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

      {/* Floating Video Audio & File Controls (Top-right & Bottom-right) */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
        {/* Sound Toggle Button */}
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
              <span>🔊 Activar Audio</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-white" />
              <span>Audio Activado ✓</span>
            </>
          )}
        </button>

        {/* Custom Video Uploader Button */}
        <input
          ref={fileInputRef}
          type="file"
          accept="video/mp4,video/webm,video/mov"
          onChange={handleFileUpload}
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full backdrop-blur-md text-xs font-semibold transition-all cursor-pointer ${
            hasCustomVideo
              ? 'bg-[#2584fe] hover:bg-[#126fe8] text-white border border-white/30 shadow-md'
              : 'bg-black/40 hover:bg-black/60 text-white/90 border border-white/20'
          }`}
          title="Cargar tu archivo de video .mp4 directamente"
        >
          {hasCustomVideo ? (
            <>
              <Check className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">Tu video activo</span>
            </>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5 text-[#8ab6ff]" />
              <span className="hidden sm:inline">Cargar tu video</span>
            </>
          )}
        </button>

        {hasCustomVideo && (
          <button
            onClick={handleResetDefault}
            className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white border border-white/20 text-xs transition-colors cursor-pointer"
            title="Restablecer video original"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 w-full max-w-[1220px] mx-auto px-4 sm:px-6 py-20 lg:py-28">
        <div className="max-w-[620px] space-y-6">
          {/* Pill kicker with Voiceover message */}
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

          {/* Subtitle containing the video voiceover message */}
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
              <span>Tocá acá para activar el audio y locución del video</span>
            </div>
          )}

          {/* Action buttons styled with opticavision's pill style */}
          <div className="pt-2 flex flex-wrap items-center gap-3.5 sm:gap-4">
            <button
              onClick={() => onNavigateSection('productos')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#2584fe] hover:bg-[#1a6ee0] text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg hover:shadow-xl cursor-pointer"
            >
              <span>Ver Armazones</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateSection('ubicacion')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border-[1.5px] border-white/60 hover:border-white text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer bg-white/5 backdrop-blur-sm"
            >
              <MapPin className="w-4 h-4 text-[#8ab6ff]" />
              <span>Dónde estamos</span>
            </button>

            <a
              href={`https://wa.me/${STORE_CONTACT.whatsappNumber}?text=${encodeURIComponent(
                'Hola Óptica Modo! Les consulto desde la web para probar armazones en Río Diamante 2700, Las Heras.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 text-xs font-semibold text-white/90 hover:text-emerald-300 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Directo</span>
            </a>
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
