import { FooterData } from "../interfaces/types";

interface FooterProps {
  data: FooterData;
}


export default function Footer({ data }: FooterProps) {
  const Year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm mb-4">
          &copy;  {Year} Finanzas del Norte. {data.yearText}

        </p>
        <div className="flex justify-center space-x-6">
          <a href="#contacto" className="hover:text-primary transition">{data.contact}</a>
          <a href="#quienes-somos" className="hover:text-primary transition">{data.about}</a>
          <a href="#terminos" className="hover:text-primary transition">{data.terms}</a>
        </div>
        <p className="text-sm mt-4">
          {data.securityText}
        </p>
      </div>
    </footer>
  );
}
