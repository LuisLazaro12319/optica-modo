import React, { useState } from 'react';
import { STORE_CONTACT } from '../data/opticaData';
import { MapPin, Phone, Upload, CheckCircle2, ArrowRight } from 'lucide-react';
import { WhatsAppIcon, InstagramIcon } from './BrandIcons';

interface ContactSectionProps {
  prefilledProduct?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ prefilledProduct }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('presupuesto');
  const [notes, setNotes] = useState('');
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFilePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWhatsAppSend = () => {
    const topicLabels: Record<string, string> = {
      presupuesto: 'Presupuesto para armazón y cristales con receta',
      obrasocial: 'Consulta de cobertura con mi Obra Social / Prepaga',
      control: 'Coordinar turno para control visual',
      reparacion: 'Reparación o ajuste en el taller propio de Las Heras',
    };

    let msg = `Hola Óptica Modo! Les escribo desde su página web para consultar por mi visión en Río Diamante 2700, Las Heras:
- Nombre: ${name || 'Sin especificar'}
- Teléfono: ${phone || 'Sin especificar'}
- Motivo: ${topicLabels[topic] || topic}`;

    if (prefilledProduct) {
      msg += `\n- Modelo consultado: ${prefilledProduct}`;
    }

    if (notes) {
      msg += `\n- Mensaje: ${notes}`;
    }

    if (filePreview) {
      msg += `\n(Tengo la foto de mi receta oftalmológica para enviarles a continuación)`;
    }

    window.open(`https://wa.me/${STORE_CONTACT.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    setSubmitted(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleWhatsAppSend();
  };

  return (
    <section
      id="contacto"
      className="py-20 px-4 sm:px-6 bg-gradient-to-b from-[#123a9e] to-[#0a1668]"
    >
      <div className="max-w-[1220px] mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="text-xs font-bold tracking-[2px] text-[#8ab6ff] uppercase block">
            CONTACTO
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl font-bold text-white mt-2">
            Hablemos de tu visión
          </h2>
          <p className="mt-3 text-base text-[#c7d0ee]">
            Completá tus datos y enviá tu consulta por WhatsApp. Te respondemos en el día desde nuestro salón en Las Heras.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto">
          {/* Left Form (lg:col-span-7) */}
          <div className="lg:col-span-7 border border-[#e7ecf7] rounded-3xl p-8 bg-white shadow-lg">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-editorial text-3xl font-bold text-[#07115c]">
                  ¡Ya casi está!
                </h3>
                <p className="text-xs sm:text-sm text-[#5b668a] max-w-sm mx-auto leading-relaxed">
                  Se abrió WhatsApp con tu consulta armada. Enviá el mensaje desde ahí para que nos llegue
                  y coordinemos tu atención en <strong>Río Diamante 2700, Las Heras</strong>.
                  {filePreview && ' No te olvides de adjuntar la foto de tu receta en el chat.'}
                </p>
                <div className="pt-3">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full border border-[#e7ecf7] text-[#07115c] text-xs font-semibold hover:bg-zinc-50"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#07115c] mb-1">
                    Nombre y Apellido *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: Lucía Martínez"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e7ecf7] text-xs text-[#07115c] focus:outline-none focus:border-[#2584fe] focus:ring-1 focus:ring-[#2584fe]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#07115c] mb-1">
                    Teléfono / WhatsApp de Contacto *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej: +54 9 261 123 4567"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e7ecf7] text-xs text-[#07115c] focus:outline-none focus:border-[#2584fe] focus:ring-1 focus:ring-[#2584fe]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#07115c] mb-1">
                    Motivo de la consulta
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e7ecf7] text-xs text-[#07115c] focus:outline-none focus:border-[#2584fe] focus:ring-1 focus:ring-[#2584fe] bg-white"
                  >
                    <option value="presupuesto">Presupuesto para armazón y cristales con receta</option>
                    <option value="obrasocial">Consulta de cobertura con mi Obra Social / Prepaga</option>
                    <option value="control">Coordinar turno para control visual</option>
                    <option value="reparacion">Reparación o calibrado en taller propio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#07115c] mb-1">
                    Adjuntar foto de tu Receta (Opcional)
                  </label>
                  <div className="border border-dashed border-[#c2cde5] rounded-xl p-3.5 text-center bg-[#fbfdff] hover:bg-[#f0f5ff] transition-colors">
                    {filePreview ? (
                      <div className="space-y-2">
                        <img
                          src={filePreview}
                          alt="Receta cargada"
                          className="max-h-24 mx-auto rounded object-contain border border-[#e7ecf7]"
                        />
                        <button
                          type="button"
                          onClick={() => setFilePreview(null)}
                          className="text-[11px] text-rose-600 hover:underline"
                        >
                          Quitar foto
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer block">
                        <Upload className="w-5 h-5 text-[#2584fe] mx-auto mb-1" />
                        <span className="text-xs font-semibold text-[#07115c]">
                          Subir foto de receta médica
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#07115c] mb-1">
                    Mensaje o Comentarios
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Contanos qué tipo de anteojo buscás o qué cobertura tenés..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e7ecf7] text-xs text-[#07115c] focus:outline-none focus:border-[#2584fe] focus:ring-1 focus:ring-[#2584fe] resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Enviar directo por WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Direct Contact Card (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#f5f8ff] border border-[#e7ecf7] rounded-3xl p-6 sm:p-8 space-y-5">
              <h3 className="font-editorial text-2xl font-bold text-[#07115c]">
                Canales de Atención
              </h3>

              <div className="space-y-4 text-xs text-[#3a4670]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#e7ecf7] text-[#2584fe] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#07115c] block">Dirección en Las Heras</strong>
                    <p className="text-[#5b668a] mt-0.5">{STORE_CONTACT.fullAddress}</p>
                    <a
                      href={STORE_CONTACT.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2584fe] font-semibold hover:underline inline-block mt-1"
                    >
                      Ver en Google Maps
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                    <WhatsAppIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#07115c] block">WhatsApp Oficial</strong>
                    <p className="text-[#5b668a] mt-0.5">{STORE_CONTACT.whatsappDisplay}</p>
                    <p className="text-[11px] text-[#8791ac]">Respuesta ágil en horarios de atención</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white flex items-center justify-center shrink-0">
                    <InstagramIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#07115c] block">Instagram Oficial</strong>
                    <a
                      href={STORE_CONTACT.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2584fe] font-semibold hover:underline"
                    >
                      {STORE_CONTACT.instagramHandle}
                    </a>
                    <p className="text-[11px] text-[#8791ac]">Novedades y nuevos ingresos semanales</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
