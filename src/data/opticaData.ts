/**
 * Óptica Modo - Master Data & Business Logic
 * Location: Río Diamante 2700, Las Heras, Mendoza, Argentina (CP 5539)
 * Instagram: @opticamodo
 * Google Maps: https://maps.app.goo.gl/rHSsK7Ab4pndSJuL9
 * Style reference: opticavision.com.ar
 */

export interface StoreScheduleDay {
  dayName: string;
  dayIndex: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  openMorning: string | null;
  closeMorning: string | null;
  openAfternoon: string | null;
  closeAfternoon: string | null;
  isClosed: boolean;
}

export const STORE_SCHEDULE: StoreScheduleDay[] = [
  {
    dayName: 'Domingo',
    dayIndex: 0,
    openMorning: null,
    closeMorning: null,
    openAfternoon: null,
    closeAfternoon: null,
    isClosed: true,
  },
  {
    dayName: 'Lunes',
    dayIndex: 1,
    openMorning: '09:30',
    closeMorning: '13:30',
    openAfternoon: '16:30',
    closeAfternoon: '20:30',
    isClosed: false,
  },
  {
    dayName: 'Martes',
    dayIndex: 2,
    openMorning: '09:30',
    closeMorning: '13:30',
    openAfternoon: '16:30',
    closeAfternoon: '20:30',
    isClosed: false,
  },
  {
    dayName: 'Miércoles',
    dayIndex: 3,
    openMorning: '09:30',
    closeMorning: '13:30',
    openAfternoon: '16:30',
    closeAfternoon: '20:30',
    isClosed: false,
  },
  {
    dayName: 'Jueves',
    dayIndex: 4,
    openMorning: '09:30',
    closeMorning: '13:30',
    openAfternoon: '16:30',
    closeAfternoon: '20:30',
    isClosed: false,
  },
  {
    dayName: 'Viernes',
    dayIndex: 5,
    openMorning: '09:30',
    closeMorning: '13:30',
    openAfternoon: '16:30',
    closeAfternoon: '20:30',
    isClosed: false,
  },
  {
    dayName: 'Sábado',
    dayIndex: 6,
    openMorning: '09:00',
    closeMorning: '13:00',
    openAfternoon: null,
    closeAfternoon: null,
    isClosed: false,
  },
];

export interface StoreStatus {
  isOpen: boolean;
  statusBadge: string;
  statusDetail: string;
  currentDayName: string;
  nextShift: string;
  currentTimeString: string;
}

export function getStoreStatus(overrideDate?: Date): StoreStatus {
  const now = overrideDate || new Date();

  const mendozaTimeStr = now.toLocaleTimeString('es-AR', {
    timeZone: 'America/Argentina/Mendoza',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });

  const mendozaDayName = now.toLocaleDateString('es-AR', {
    timeZone: 'America/Argentina/Mendoza',
    weekday: 'long',
  });

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Argentina/Mendoza',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(now);

  const weekdayPart = parts.find((p) => p.type === 'weekday')?.value.toLowerCase() || '';
  const hourPart = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10);
  const minPart = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);

  const dayMap: Record<string, number> = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
  };
  const currentDayIndex = dayMap[weekdayPart.slice(0, 3)] ?? now.getDay();

  const currentMinutes = hourPart * 60 + minPart;
  const schedule = STORE_SCHEDULE.find((s) => s.dayIndex === currentDayIndex) || STORE_SCHEDULE[1];

  let isOpen = false;
  let statusBadge = 'Cerrado ahora';
  let statusDetail = '';
  let nextShift = '';

  const parseTime = (t: string | null) => {
    if (!t) return null;
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };

  const morningStart = parseTime(schedule.openMorning);
  const morningEnd = parseTime(schedule.closeMorning);
  const afternoonStart = parseTime(schedule.openAfternoon);
  const afternoonEnd = parseTime(schedule.closeAfternoon);

  if (schedule.isClosed) {
    isOpen = false;
    statusBadge = 'Cerrado hoy';
    statusDetail = 'Abrimos el lunes a las 09:30 hs';
    nextShift = 'Lunes 09:30 hs';
  } else if (morningStart !== null && morningEnd !== null && currentMinutes >= morningStart && currentMinutes < morningEnd) {
    isOpen = true;
    statusBadge = 'Abierto ahora';
    statusDetail = `Turno mañana · Cierra a las ${schedule.closeMorning} hs`;
    nextShift = `Tarde: ${schedule.openAfternoon || 'Mañana'} hs`;
  } else if (afternoonStart !== null && afternoonEnd !== null && currentMinutes >= afternoonStart && currentMinutes < afternoonEnd) {
    isOpen = true;
    statusBadge = 'Abierto ahora';
    statusDetail = `Turno tarde · Cierra a las ${schedule.closeAfternoon} hs`;
    nextShift = 'Mañana 09:30 hs';
  } else if (morningStart !== null && currentMinutes < morningStart) {
    isOpen = false;
    statusBadge = 'Cerrado ahora';
    statusDetail = `Abre hoy a las ${schedule.openMorning} hs`;
    nextShift = `Hoy ${schedule.openMorning} hs`;
  } else if (morningEnd !== null && afternoonStart !== null && currentMinutes >= morningEnd && currentMinutes < afternoonStart) {
    isOpen = false;
    statusBadge = 'Cerrado al mediodía';
    statusDetail = `Reabrimos hoy a las ${schedule.openAfternoon} hs`;
    nextShift = `Hoy ${schedule.openAfternoon} hs`;
  } else {
    isOpen = false;
    const isSaturday = currentDayIndex === 6;
    statusBadge = 'Cerrado por hoy';
    if (isSaturday) {
      statusDetail = 'Domingo cerrado · Reabrimos el lunes a las 09:30 hs';
      nextShift = 'Lunes 09:30 hs';
    } else {
      const nextDay = STORE_SCHEDULE.find((s) => s.dayIndex === (currentDayIndex + 1) % 7);
      statusDetail = `Reabrimos mañana a las ${nextDay?.openMorning || '09:30'} hs`;
      nextShift = `Mañana ${nextDay?.openMorning || '09:30'} hs`;
    }
  }

  const capitalizedDay = mendozaDayName.charAt(0).toUpperCase() + mendozaDayName.slice(1);

  return {
    isOpen,
    statusBadge,
    statusDetail,
    currentDayName: capitalizedDay,
    nextShift,
    currentTimeString: mendozaTimeStr,
  };
}

export interface EyewearProduct {
  id: string;
  name: string;
  brand: string;
  category: 'acetato' | 'titanio' | 'geometrico' | 'clasico' | 'clipon';
  categoryLabel: string;
  subtitle: string;
  material: string;
  shape: string;
  measurements: string;
  colors: string[];
  imageUrl: string;
  description: string;
  features: string[];
  isHighlight?: boolean;
}

/**
 * EXCLUSIVELY Armazones (Eyeglass Frames) as specifically requested
 */
export const EYEWEAR_CATALOG: EyewearProduct[] = [
  {
    id: 'armazon-modo-diamante-habana',
    name: 'Armazón Modo Diamante Habana',
    brand: 'Modo Atelier',
    category: 'acetato',
    categoryLabel: 'Acetato Italiano',
    subtitle: 'Acetato Mazzucchelli pulido a mano con alma metálica grabada',
    material: 'Acetato Italiano de Alta Densidad',
    shape: 'Pantos en cerradura',
    measurements: '49-20-145 mm',
    colors: ['Habana Carei', 'Negro Ónix', 'Champán Cristal'],
    imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=600&q=80',
    description: 'Silueta clásica atemporal con puente anatómico en cerradura. Liviano, muy confortable y compatible con cristales multifocales progresivos de alta graduación.',
    features: ['Bisagras flex 5 charnelas', 'Ajuste térmico anatómico', 'Compatible multifocal HD'],
    isHighlight: true,
  },
  {
    id: 'armazon-modo-challao-titanium',
    name: 'Armazón Modo Challao Titanio',
    brand: 'Modo Tech',
    category: 'titanio',
    categoryLabel: 'Titanio Ultraliviano',
    subtitle: 'Titanio aeroespacial de 11 gramos sin puntos de presión',
    material: 'Beta-Titanio Quirúrgico',
    shape: 'Hexagonal Geométrico',
    measurements: '51-19-142 mm',
    colors: ['Oro Cepillado', 'Grafito Mate', 'Plata Satinado'],
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80',
    description: 'Diseño geométrico contemporáneo ultraliviano con plaquetas de silicona médica hipoalergénica. Máxima resistencia a la deformación y al sudor.',
    features: ['100% hipoalergénico', 'Peso pluma 11 gramos', 'Estructura indeformable'],
    isHighlight: true,
  },
  {
    id: 'armazon-modo-palermo-square',
    name: 'Armazón Modo Palermo Rectangular',
    brand: 'Modo Design',
    category: 'clasico',
    categoryLabel: 'Clásico & Urbano',
    subtitle: 'Perfil rectangular sobrio con bisagras reforzadas',
    material: 'Acetato Premium & Acero',
    shape: 'Rectangular Soft',
    measurements: '53-17-145 mm',
    colors: ['Negro Piano', 'Azul Petróleo', 'Carei Oscuro'],
    imageUrl: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=600&q=80',
    description: 'Armazón de líneas rectas que estiliza rostros redondos y ovalados. Diseñado para uso intensivo diario en oficina y lectura prolongada.',
    features: ['Charnelas con resorte flex', 'Alta durabilidad', 'Calce anatómico seguro'],
  },
  {
    id: 'armazon-modo-catalina-cateye',
    name: 'Armazón Catalina Cat-Eye',
    brand: 'Modo Elegance',
    category: 'geometrico',
    categoryLabel: 'Diseño & Tendencia',
    subtitle: 'Líneas ascendentes sofisticadas con detalles en metal dorado',
    material: 'Acetato Combinado con Metal',
    shape: 'Cat-Eye Elevado',
    measurements: '52-16-140 mm',
    colors: ['Borgoña & Oro', 'Negro Ébano', 'Rosa Translúcido'],
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
    description: 'Armazón femenino de autor que realza la mirada y enmarca los pómulos. Perfecto tanto para visión monofocal como para descanso frente a pantallas.',
    features: ['Acentos metálicos refinados', 'Patillas con flex suave', 'Liviano en rostro'],
    isHighlight: true,
  },
  {
    id: 'armazon-modo-mendoza-clipon',
    name: 'Armazón Modo Dúo Clip-On Magnético',
    brand: 'Modo 2en1',
    category: 'clipon',
    categoryLabel: 'Clip-On Magnético',
    subtitle: 'Armazón recetado + Suplemento solar polarizado UV400',
    material: 'TR90 Suizo Flexible + Clip Polarizado',
    shape: 'Rectangular Contemporáneo',
    measurements: '53-18-142 mm',
    colors: ['Negro Mate & Clip Polarizado', 'Gris Grafito'],
    imageUrl: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=600&q=80',
    description: 'La versatilidad definitiva: usá tus cristales recetados en interiores y adherí el suplemento magnético polarizado en un solo movimiento al salir al sol.',
    features: ['Imanes de neodimio de alta fijación', 'Lente solar UV400 polarizada', 'Polímero TR90 ultraliviano'],
    isHighlight: true,
  },
  {
    id: 'armazon-modo-atelier-round',
    name: 'Armazón Modo Atelier Circular',
    brand: 'Modo Atelier',
    category: 'clasico',
    categoryLabel: 'Clásico & Urbano',
    subtitle: 'Minimalismo circular en acero quirúrgico inoxidable',
    material: 'Acero Quirúrgico & Terminales de Acetato',
    shape: 'Redondo Minimalista',
    measurements: '48-21-145 mm',
    colors: ['Oro Vintage', 'Plata Cepillada', 'Negro Mate'],
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
    description: 'Montura circular intelectual inspirada en el diseño editorial europeo. Su puente arqueado distribuye el peso de manera uniforme sobre el tabique nasal.',
    features: ['Puente arqueado ergonómico', 'Terminales antideslizantes', 'Compatible con Blue Light'],
  },
  {
    id: 'armazon-modo-crystal-nude',
    name: 'Armazón Modo Crystal Nude',
    brand: 'Modo Design',
    category: 'acetato',
    categoryLabel: 'Acetato Italiano',
    subtitle: 'Acetato translúcido de acabado brillante y alma vista',
    material: 'Acetato Cristal Translúcido',
    shape: 'Cuadrado Suave',
    measurements: '51-18-144 mm',
    colors: ['Cristal Transparente', 'Champán Suave', 'Humo Gris'],
    imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=600&q=80',
    description: 'Tendencia moderna que ilumina el rostro sin recargar las facciones. Combina con cualquier outfit y tipo de piel con total naturalidad.',
    features: ['Alma metálica grabada visible', 'No se amarillea con el sol', 'Ajuste en taller en el día'],
  },
  {
    id: 'armazon-modo-titanium-half',
    name: 'Armazón Modo Ranurado Semi-Rimless',
    brand: 'Modo Tech',
    category: 'titanio',
    categoryLabel: 'Titanio Ultraliviano',
    subtitle: 'Medio marco con hilo de nylon de alta resistencia',
    material: 'Titanio Puro & Nylon Técnico',
    shape: 'Rectangular Ranurado',
    measurements: '54-18-145 mm',
    colors: ['Grafito Oscuro', 'Peltre Satinado'],
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80',
    description: 'Visión inferior sin obstáculos. Especialmente recomendado para usuarios de multifocales que buscan un campo de lectura cercano despejado.',
    features: ['Campo inferior libre', 'Extremadamente discreto', 'Calibrado de precisión'],
  },
];

export interface BrandPartner {
  name: string;
  category: string;
}

export const BRAND_PARTNERS: BrandPartner[] = [
  { name: 'RAY-BAN', category: 'Armazones de Vista' },
  { name: 'VULK', category: 'Diseño Urbano' },
  { name: 'VALERIA MAZZA', category: 'Elegancia' },
  { name: 'MODO ATELIER', category: 'Colección Propia' },
  { name: 'RUSTY', category: 'Action & Sport' },
  { name: 'MORMAII', category: 'Resistencia' },
  { name: 'ESSILOR', category: 'Calibrado Oficial' },
  { name: 'ZEISS', category: 'Precisión Óptica' },
];

export interface HealthInsurance {
  name: string;
  highlight: string;
}

export const HEALTH_INSURANCES: HealthInsurance[] = [
  { name: 'OSEP', highlight: 'Convenio y reintegro oficial Mendoza' },
  { name: 'OSDE', highlight: 'Facturación directa y beneficios' },
  { name: 'SWISS MEDICAL', highlight: 'Planes integrales y reintegros' },
  { name: 'GALENO', highlight: 'Cobertura en armazones y cristales' },
  { name: 'SANCOR SALUD', highlight: 'Planes con reintegro ágil' },
  { name: 'MEDICUS', highlight: 'Atención personalizada' },
  { name: 'MEDIFÉ', highlight: 'Planes plata y oro' },
  { name: 'JERÁRQUICOS', highlight: 'Descuento directo en óptica' },
];

export const STORE_CONTACT = {
  name: 'Óptica Modo',
  street: 'Río Diamante 2700',
  neighborhood: 'Barrio Jardín Municipal / Smata',
  city: 'Las Heras',
  province: 'Mendoza',
  country: 'Argentina',
  postalCode: 'M5539',
  fullAddress: 'Río Diamante 2700, M5539 Las Heras, Mendoza, Argentina',
  mapsUrl: 'https://maps.app.goo.gl/rHSsK7Ab4pndSJuL9',
  instagramUrl: 'https://www.instagram.com/opticamodo/',
  instagramHandle: '@opticamodo',
  whatsappNumber: '5492613000000',
  whatsappDisplay: '+54 9 261 300-0000',
  phone: '261 429-0000',
  coordinates: {
    lat: -32.8466293,
    lng: -68.8610793,
  },
};
