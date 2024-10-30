import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verificar que sea una solicitud POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { 
    nombre,
    wsp,
    residencia,
    operacion,
    cantidad 
  } = req.body;

  // Validar que los campos no estén vacíos
  if (!nombre || !wsp || !residencia || !operacion || !cantidad) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    // Configurar el transporte de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Cambia según el servicio que utilices
      auth: {
        user: process.env.GMAIL_USER, // Tu email
        pass: process.env.GMAIL_PASS, // Tu contraseña o contraseña de aplicación
      },
      tls: {
        rejectUnauthorized: false, // Permitir certificados no verificados (si es necesario)
      },
    });

    // Configurar el contenido del correo
    const mailOptions = {
      from: process.env.GMAIL_USER, // Remitente (tu correo)
      to: process.env.RECEIVER_EMAIL, // Destinatario (correo donde recibirás la notificación)
      subject: `Nuevo mensaje de ${nombre}`, // Asunto del correo
      text: `
        Nuevo mensaje de contacto:
        
        Nombre: ${nombre}
        WhatsApp: ${wsp}
        Residencia: ${residencia}
        Operación: ${operacion}
        Cantidad: ${cantidad}
      `, // Cuerpo del correo
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    // Responder al frontend con éxito
    res.status(200).json({ message: 'Correo enviado exitosamente' });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).json({ message: 'Error enviando el correo' });
  }
}
