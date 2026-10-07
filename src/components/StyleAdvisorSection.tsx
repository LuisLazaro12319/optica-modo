import React, { useState } from 'react';
import { STORE_CONTACT } from '../data/opticaData';
import { Sparkles, Check, ArrowRight, UserCheck } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';

export const StyleAdvisorSection: React.FC = () => {
  const [selectedShape, setSelectedShape] = useState<string>('redondo');

  const faceShapes = [
    {
      id: 'redondo',
      name: 'Rostro Redondo',
      sub: 'Líneas suaves y mejillas prominentes',
      recommendation: 'Armazones rectangulares, cuadrados o angulares',
      why: 'Los ángulos rectos generan un contraste armónico que estiliza visualmente el rostro y aporta definición.',
      avoid: 'Evitar marcos circulares muy pequeños que acentúan la redondez.',
      idealFrames: ['Modo Acetato Palermo', 'Modo Titanio Beta', 'Wayfarer Rectangular'],
    },
    {
      id: 'cuadrado',
      name: 'Rostro Cuadrado',
      sub: 'Mandíbula definida y frente amplia',
      recommendation: 'Armazones redondos, ovalados o pantos clásicos',
      why: 'Las curvas suaves y los puentes en cerradura suavizan las facciones marcadas y alargan las proporciones.',
      avoid: 'Evitar armazones angulares con bordes duros muy pesados.',
      idealFrames: ['Modo Atelier Round', 'Pantos Mazzucchelli', 'Aviador Suave'],
    },
    {
      id: 'ovalado',
      name: 'Rostro Ovalado',
      sub: 'Proporciones naturalmente equilibradas',
      recommendation: 'Versatilidad total: geométricos, cat-eye o pantos',
      why: 'Prácticamente cualquier silueta se adapta con armonía. Recomendamos modelos cuyo ancho coincida con el ancho de pómulos.',
      avoid: 'Evitar monturas excesivamente anchas que sobresalgan del rostro.',
      idealFrames: ['Modo Diamante Acetato', 'Cat-Eye Catalina', 'Hexagonal Gold'],
    },
    {
      id: 'corazon',
      name: 'Rostro Corazón / Diamante',
      sub: 'Frente ancha o pómulos altos con mentón fino',
      recommendation: 'Armazones aviador, monturas al aire o sutiles cat-eye',
      why: 'El puente bajo y la base más ancha desvían el foco hacia la parte inferior del rostro generando equilibrio.',
      avoid: 'Evitar modelos muy pesados en la parte superior.',
      idealFrames: ['Modo Aviador Cordillera', 'Titanio Minimal', 'Cat-Eye Suave'],
    },
  ];

  const currentShape = faceShapes.find((f) => f.id === selectedShape) || faceShapes[0];

  return (
    <section id="estilo" className="bg-[#f8faff] py-20 px-4 sm:px-6 border-b border-[#e7ecf7]">
      <div className="max-w-[1220px] mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-xs font-bold tracking-[2px] text-[#2584fe] uppercase block">
            ASESORAMIENTO PROFESIONAL
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl font-bold text-[#07115c] mt-2">
            El armazón ideal según tu rostro
          </h2>
          <p className="mt-3 text-base text-[#5b668a]">
            Un buen anteojo no solo corrige tu visión: resalta tu personalidad.
            Elegí la forma de tu cara para conocer las recomendaciones de nuestros ópticos.
          </p>
        </div>

        {/* Segmented Shape Selector like opticavision pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-2xl mx-auto">
          {faceShapes.map((shape) => (
            <button
              key={shape.id}
              onClick={() => setSelectedShape(shape.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedShape === shape.id
                  ? 'bg-[#0a1668] text-white shadow-md'
                  : 'bg-white text-[#5b668a] border border-[#e7ecf7] hover:border-[#2584fe] hover:text-[#07115c]'
              }`}
            >
              {shape.name}
            </button>
          ))}
        </div>

        {/* Selected Shape Detail Card */}
        <div className="bg-white border border-[#e7ecf7] rounded-3xl p-8 sm:p-10 shadow-lg max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e7ecf7]">
            <div>
              <span className="text-xs font-bold text-[#2584fe] uppercase tracking-wider">
                Recomendación Óptica Modo
              </span>
              <h3 className="font-editorial text-3xl font-bold text-[#07115c] mt-1">
                {currentShape.name}
              </h3>
              <p className="text-xs text-[#5b668a] mt-0.5">{currentShape.sub}</p>
            </div>

            <div className="bg-[#f0f5ff] border border-[#d6e4ff] px-4 py-2 rounded-2xl text-xs text-[#0a1668] font-semibold text-center">
              Calce Anatómico
            </div>
          </div>

          <div className="py-6 space-y-4 text-sm text-[#3a4670]">
            <div>
              <strong className="text-[#07115c] block mb-1">
                Siluetas Recomendadas:
              </strong>
              <p className="text-emerald-700 font-semibold text-base">
                {currentShape.recommendation}
              </p>
            </div>

            <div>
              <strong className="text-[#07115c] block mb-1">Por qué te favorece:</strong>
              <p className="text-xs leading-relaxed text-[#5b668a]">
                {currentShape.why}
              </p>
            </div>

            <div>
              <strong className="text-[#07115c] block mb-1">Qué tener en cuenta:</strong>
              <p className="text-xs leading-relaxed text-[#8791ac]">
                {currentShape.avoid}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-[#e7ecf7] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#5b668a]">
              ¿Tenés dudas sobre tu graduación o calce?
            </div>

            <a
              href={`https://wa.me/${STORE_CONTACT.whatsappNumber}?text=${encodeURIComponent(
                `Hola Óptica Modo! Estuve leyendo el asesor de rostros en su web para "${currentShape.name}". Me gustaría recibir asesoramiento personalizado en su local de Río Diamante 2700.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-[#2584fe] hover:bg-[#126fe8] text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-sm w-full sm:w-auto justify-center"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Consultar con un Óptico</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
