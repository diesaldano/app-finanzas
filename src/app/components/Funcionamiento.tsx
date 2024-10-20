import { HowItWorksData } from "../interfaces/types";
import { FaFileSignature, FaWhatsapp, FaDollarSign } from "react-icons/fa";

// Mapeamos las cadenas del JSON a los componentes de iconos de react-icons
const iconMap = {
  FaFileSignature,
  FaWhatsapp,
  FaDollarSign
};

interface HowItWorksProps {
  data: HowItWorksData;
}

export default function HowItWorks({ data }: HowItWorksProps) {
  return (
    <section id="como-funciona" className="container mx-auto my-16">
      <h2 className="text-3xl font-bold text-center mb-8">{data.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {data.steps.map((step, index) => {
          
          const IconComponent = iconMap[step.icon as unknown as keyof typeof iconMap];

          return (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6">
              {IconComponent && <IconComponent className="text-primary text-6xl mx-auto mb-4" />}
              <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
              <p>{step.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
