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
  whatsappNumber: '5492617153107',
  whatsappDisplay: '+54 9 261 715-3107',
  phone: '261 429-0000',
  coordinates: {
    lat: -32.8466293,
    lng: -68.8610793,
  },
};
