// pages/api/form.ts

import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { nombre, wsp, residencia, operacion, cantidad, email, captchaToken } = req.body;

  // Validación de reCAPTCHAx
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`;
  const verifyResponse = await fetch(verifyUrl, { method: 'POST' });
  const verifyData = await verifyResponse.json();

  console.log(verifyData)

  // if (!verifyData.success) {
  //   return res.status(400).json({ success: false, message: 'Error de verificación de reCAPTCHA' });
  // }

  if (!nombre || !wsp || !residencia || !operacion || !cantidad || !email) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: `Nuevo mensaje de ${nombre}`,
      text: `
        Usted ha recibido un nuevo mensaje de contacto:

        Nombre: ${nombre}
        Correo Electrónico: ${email}
        WhatsApp: ${wsp}
        Residencia: ${residencia}
        Operación: ${operacion} dólares
        Cantidad: USD ${cantidad}
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Correo enviado exitosamente' });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).json({ success: false, message: 'Error enviando el correo' });
  }
}
