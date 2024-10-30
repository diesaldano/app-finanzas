import { NextApiRequest, NextApiResponse } from "next";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Metodo no permitido' });

  const { token } = req.body;
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

  const verificacionUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
  const response = await fetch(verificacionUrl, {
    method: 'POST'
  });

  const data = await response.json();
  if (data.success) res.status(200).json({ success: true });
  else res.status(400).json({ success: false, message: 'Verificación fallida' });

}