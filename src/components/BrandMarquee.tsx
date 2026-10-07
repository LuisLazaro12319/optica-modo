import React from 'react';
import { BRAND_PARTNERS } from '../data/opticaData';

export const BrandMarquee: React.FC = () => {
  return (
    <div className="bg-[#f8faff] border-b border-[#e7ecf7] py-6 overflow-hidden">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6">
        <p className="text-center text-[11px] font-bold tracking-[0.2em] text-[#8791ac] uppercase mb-4">
          Marcas Destacadas en Armazones & Cristales
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
          {BRAND_PARTNERS.map((brand) => (
            <div
              key={brand.name}
              className="h-24 bg-white rounded-xl border border-[#e7ecf7] px-3 flex flex-col items-center justify-center text-center transition-all hover:border-[#2584fe] hover:shadow-sm"
            >
              <span className="font-editorial text-base sm:text-lg font-bold text-[#07115c] tracking-wider leading-tight block">
                {brand.name}
              </span>
              <span className="text-[10px] text-[#8791ac] block mt-1">
                {brand.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
