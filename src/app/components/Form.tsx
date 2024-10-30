"use client";

import { useState } from 'react';
// import Image from 'next/image'; // Si tienes un logo
import { ContactFormData } from '../interfaces/types';
import ReCAPTCHA from 'react-google-recaptcha';

interface FormProps {
  data: ContactFormData;
}


export default function ContactForm({ data }: FormProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    wsp: "",
    residencia: "",
    operacion: "",
    cantidad: ""
  });

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const hadleCaptchaToken = (token: string | null) => setCaptchaToken(token);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se procesa el token
    if (!captchaToken) return alert('Por favor, debe completar el captcha token');

    const response = await fetch('/api/verify-captcha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: captchaToken })
    });

    const data = await response.json();
    if (data.success) alert('Verificacion exitosa');
    else alert('Verificacion fallida');
  };

  return (
    <section id="contacto" className="container mx-auto my-16 flex justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        {/* Logo en la parte superior */}
        <div className="flex justify-center mb-6">
          {/* <Image src="/logo.png" alt="Logo" width={60} height={60} />  */}
          <h1 className="text-gray text-2xl">Finanzas del Norte</h1>
        </div>

        <h2 className="text-3xl font-bold text-center mb-4">{data.title}</h2>
        <p className="text-center text-red-500 mb-4">{data.notice}</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-semibold" htmlFor="nombre">{data.fields.name}</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="w-full outline-none p-3 border-b border-gray-300 focus:outline-none focus:border-primary transition-all focus:shadow-md"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold" htmlFor="wsp">{data.fields.wsp}</label>
            <input
              type="tel"
              id="wsp"
              name="wsp"
              className="w-full outline-none p-3 border-b border-gray-300 focus:outline-none focus:border-primary transition-all focus:shadow-md"
              value={formData.wsp}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold" htmlFor="residencia">{data.fields.residence}</label>
            <select
              id="residencia"
              name="residencia"
              className="w-full outline-none p-3 border-b border-gray-300 focus:outline-none focus:border-primary transition-all focus:shadow-md"
              value={formData.residencia}
              onChange={handleChange}
              required
            >
              <option value="">{data.fields.selectPlaceholder}</option>
              <option value="zona_norte">{data.residenceOptions.zona_norte}</option>
              <option value="zona_sur">{data.residenceOptions.zona_sur}</option>
              <option value="zona_oeste">{data.residenceOptions.zona_oeste}</option>
              <option value="caba">{data.residenceOptions.caba}</option>
              <option value="interior_bs_as">{data.residenceOptions.interior_bs_as}</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold" htmlFor="operacion">{data.fields.operation}</label>
            <select
              id="operacion"
              name="operacion"
              className="w-full outline-none p-3 border-b border-gray-300 focus:outline-none focus:border-primary transition-all focus:shadow-md"
              value={formData.operacion}
              onChange={handleChange}
              required
            >
              <option value="">{data.fields.selectPlaceholder}</option>
              <option value="comprar">{data.operationOptions.buy}</option>
              <option value="vender">{data.operationOptions.sell}</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold" htmlFor="cantidad">{data.fields.amount}</label>
            <input
              type="number"
              id="cantidad"
              name="cantidad"
              className="w-full outline-none p-3 border-b border-gray-300 focus:outline-none focus:border-primary transition-all focus:shadow-md"
              value={formData.cantidad}
              onChange={handleChange}
              required
            />
            <p className="text-sm text-gray-500">{data.amountHelp}</p>
          </div>

          <div className="mb-4">
            {data.warnings.map((warning: string, index: number) => (
              <p key={index} className="text-sm text-red-500">{warning}</p>
            ))}
          </div>

          {/* Botón enviar */}
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 w-full hover:bg-secondary transition rounded shadow"
          >
            {data.buttonText}
          </button>

          {/* Captcha */}
          <div className="mt-4">
            <p className="text-sm text-gray-600">{data.captchaText}</p>
            {/* Aquí iría el captcha real */}
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_SITE_KEY  || ""}
              onChange={hadleCaptchaToken}
            />
          </div>
        </form>

        {/* Logo en la parte inferior, si es necesario */}
        {/* <div className="flex justify-center mt-6">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
        </div> */}
      </div>
    </section>
  );
}
