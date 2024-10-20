
"use client";
import texts from '../public/data/texts.json';
import { useEffect, useState } from 'react';

import Header from './components/Header'
import Form from './components/Form'
import Funcionamiento from './components/Funcionamiento'
import Footer from './components/Footer';
import AboutUs from './components/aboutUs';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

  };

  useEffect(() => {
    const fetchCotizaciones = async () => {
      try {
        const response = await fetch('/api/cotizaciones');
        const data = await response.json();
        console.log('Cotizaciones obtenidas:', data);
      } catch (error) {
        console.error('Error obteniendo cotizaciones:', error);
      }
    };

    fetchCotizaciones();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl">Finanzas del Norte</h1>
          <div className="hidden md:flex space-x-4">
            <a onClick={() => scrollToSection('inicio')} className="text-white cursor-pointer">Inicio</a>
            <a onClick={() => scrollToSection('como-funciona')} className="text-white cursor-pointer">¿Cómo Funciona?</a>
            <a onClick={() => scrollToSection('contacto')} className="text-white cursor-pointer">Contacto</a>
            <a onClick={() => scrollToSection('quienes-somos')} className="text-white cursor-pointer">Quiénes Somos</a>
          </div>
          {/* Hamburguesa para móviles */}
          <button className="md:hidden text-white" onClick={toggleMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>

        {/* Menú hamburguesa */}
        {isOpen && (
          <div className="md:hidden">
            <a onClick={() => { toggleMenu(); scrollToSection('inicio'); }} className="block text-white py-2">Inicio</a>
            <a onClick={() => { toggleMenu(); scrollToSection('como-funciona'); }} className="block text-white py-2">¿Cómo Funciona?</a>
            <a onClick={() => { toggleMenu(); scrollToSection('contacto'); }} className="block text-white py-2">Contacto</a>
            <a onClick={() => { toggleMenu(); scrollToSection('quienes-somos'); }} className="block text-white py-2">Quiénes Somos</a>
          </div>
        )}
      </nav>

      {/* Imagen principal y título */}
      <Header tittle={texts.header} />

      {/* ¿Cómo Funciona? */}
      <Funcionamiento texts={texts.howItWorks} />

      {/* Formulario de contacto */}
      <Form texts={texts.contactForm}/>

      {/* Quiénes somos */}
      <AboutUs texts={texts.aboutUs} startYear={texts.aboutUs.startYear}/>

      {/* Footer */}
      <Footer texts={texts.footer} />
    </div>
  );
}
