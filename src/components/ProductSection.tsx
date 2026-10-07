import React, { useState } from 'react';
import { EYEWEAR_CATALOG, EyewearProduct, STORE_CONTACT } from '../data/opticaData';
import { MessageCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const ProductSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const armazonesPillars = [
    {
      id: 'acetato',
      title: 'Acetato Italiano',
      desc: 'Mazzucchelli de alta densidad pulido a mano con alma metálica grabada.',
      img: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'titanio',
      title: 'Titanio Beta Ultraliviano',
      desc: 'Estructuras aeroespaciales de 11 gramos 100% hipoalergénicas y resistentes.',
      img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'geometrico',
      title: 'Diseño & Tendencia',
      desc: 'Siluetas hexagonales, cat-eye y formas que realzan los rasgos faciales.',
      img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'clipon',
      title: 'Clip-On 2 en 1',
      desc: 'Armazón para tus cristales recetados con suplemento solar polarizado UV400.',
      img: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const filterTabs = [
    { id: 'todos', label: 'Todos los Armazones' },
    { id: 'acetato', label: 'Acetato Italiano' },
    { id: 'titanio', label: 'Titanio Ultraliviano' },
    { id: 'geometrico', label: 'Diseño & Tendencia' },
    { id: 'clasico', label: 'Clásicos & Urbanos' },
    { id: 'clipon', label: 'Clip-On Magnético' },
  ];

  const filteredProducts = EYEWEAR_CATALOG.filter(
    (p) => activeCategory === 'todos' || p.category === activeCategory
  );

  const handleWhatsAppProduct = (product: EyewearProduct) => {
    const text = encodeURIComponent(
      `Hola Óptica Modo! Me interesa consultar la disponibilidad del armazón "${product.name}" (${product.categoryLabel}) para probarme en su local de Río Diamante 2700, Las Heras.`
    );
    window.open(`https://wa.me/${STORE_CONTACT.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="productos" className="bg-white py-20 px-4 sm:px-6 border-b border-[#e7ecf7]">
      <div className="max-w-[1220px] mx-auto">
        {/* Section Header styled after opticavision.com.ar */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-xs font-bold tracking-[2px] text-[#2584fe] uppercase block">
            NUESTROS ARMAZONES
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl font-bold text-[#07115c] mt-2.5">
            Colección de Armazones
          </h2>
          <p className="mt-3 text-base text-[#5b668a]">
            Diseño ergonómico, materiales nobles y máxima durabilidad. Todos nuestros armazones son
            aptos para graduaciones monofocales, multifocales progresivos y filtros de luz azul.
          </p>
        </div>

        {/* 4 Pillars of Frames Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {armazonesPillars.map((cat) => (
            <article
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="border border-[#e7ecf7] rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group"
            >
              <div className="h-44 bg-[#eef2fb] overflow-hidden relative">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-editorial text-xl font-bold text-[#07115c] group-hover:text-[#2584fe] transition-colors">
                  {cat.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#5b668a]">
                  {cat.desc}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Armazones Catalog Showcase (EXCLUSIVELY FRAMES, NO CART) */}
        <div className="border-t border-[#e7ecf7] pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#07115c]">
                Modelos de Armazones en Exhibición
              </h3>
              <p className="text-xs text-[#5b668a] mt-0.5">
                Vení a probártelos en Río Diamante 2700 o consultá disponibilidad inmediata por WhatsApp.
              </p>
            </div>

            {/* Filter Tabs in pill style */}
            <div className="flex items-center gap-1.5 p-1 bg-[#f0f4fc] rounded-full overflow-x-auto max-w-full">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-[#0a1668] text-white shadow-sm'
                      : 'text-[#5b668a] hover:text-[#07115c]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid: Exclusively Eyeglass Frames */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="border border-[#e7ecf7] rounded-2xl overflow-hidden bg-white hover:border-[#2584fe] transition-all flex flex-col justify-between hover:shadow-lg"
              >
                {/* Frame Image */}
                <div className="h-48 bg-[#f5f8ff] overflow-hidden relative">
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-[#0a1668] border border-[#e7ecf7]">
                    {prod.categoryLabel}
                  </div>
                  {prod.isHighlight && (
                    <div className="absolute top-3 right-3 bg-[#2584fe] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-sm">
                      Destacado
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-[#8791ac] uppercase tracking-wider block">
                      {prod.brand} · {prod.shape}
                    </span>
                    <h4 className="font-editorial text-xl font-bold text-[#07115c] mt-0.5 leading-snug">
                      {prod.name}
                    </h4>
                    <p className="text-xs text-[#5b668a] mt-1.5 leading-relaxed line-clamp-2">
                      {prod.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-[#f0f4fc] space-y-1.5 text-xs text-[#3a4670]">
                      <div className="flex items-center justify-between">
                        <span className="text-[#8791ac]">Material:</span>
                        <span className="font-medium truncate max-w-[140px]">{prod.material}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#8791ac]">Medidas:</span>
                        <span className="font-mono font-medium">{prod.measurements}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#8791ac]">Colores:</span>
                        <span className="truncate max-w-[140px] text-[11px]">{prod.colors.join(' · ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Direct WhatsApp Consultation (No cart) */}
                  <div className="mt-5 pt-3 border-t border-[#f0f4fc]">
                    <button
                      onClick={() => handleWhatsAppProduct(prod)}
                      className="w-full py-2.5 bg-[#0a1668] hover:bg-[#123a9e] text-white rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Consultar por WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
