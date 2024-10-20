export default function Footer({ texts }: any) {
  const Year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm mb-4">
          &copy;  {Year} Finanzas del Norte. {texts.yearText}

        </p>
        <div className="flex justify-center space-x-6">
          <a href="#contacto" className="hover:text-primary transition">{texts.contact}</a>
          <a href="#quienes-somos" className="hover:text-primary transition">{texts.about}</a>
          <a href="#terminos" className="hover:text-primary transition">{texts.terms}</a>
        </div>
        <p className="text-sm mt-4">
          {texts.securityText}
        </p>
      </div>
    </footer>
  );
}
