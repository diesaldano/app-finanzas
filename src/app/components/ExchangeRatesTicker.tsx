import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Spinner from './Spinner';

type ExchangeRate = {
  nombre: string;
  compra: number;
  venta: number;
  fechaActualizacion: string;
};

const ExchangeRatesTicker = () => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch('/api/cotizaciones');
        const data = await response.json();
        setExchangeRates(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las cotizaciones:', error);
        setLoading(false);
      }
    };
    fetchExchangeRates();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-16">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="ticker-container bg-gray-200 py-2 overflow-hidden">
      <motion.div
        className="ticker-content flex space-x-8"
        animate={{ x: ['100%', '-100%'] }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: 'linear',
        }}
      >
        {exchangeRates.map((rate, index) => (
          <div key={index} className="flex items-center space-x-2 text-gray-800">
            <span className="font-semibold">{rate.nombre}:</span>
            <span>Compra: ${rate.compra.toFixed(2)}</span>
            <span>Venta: ${rate.venta.toFixed(2)}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ExchangeRatesTicker;
