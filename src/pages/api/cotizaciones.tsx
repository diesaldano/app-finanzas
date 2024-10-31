// pages/api/cotizaciones.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Simulación de cotizaciones
  try {
    const response = await fetch('https://dolarapi.com/v1/dolares');
    const data = await response.json();

    res.status(200).json(data)
  } catch (error) {
    console.error('Hubo el siguiente error: ', error);
    res.status(404).json({
      error: 404,
      message: 'Error al obtener las'
    })

  }
}
