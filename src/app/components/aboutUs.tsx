import Image from 'next/image';
import { AboutUsData } from "../interfaces/types";

interface AboutUsProps {
  data: AboutUsData
}

export default function AboutUs({ data }: AboutUsProps) {

  const year: string = data.startYear
  return (
    <section id="quienes-somos" className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">{data.title}</h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <Image src="/imagen-equipo.jpg" alt="Nuestro equipo" className="rounded-lg shadow-md" />
            <Image
              src="/path/to/image.jpg"
              alt="Nuestro equipo"
              width={500} 
              height={300} 
              priority 
              className="rounded-lg shadow-md"
            />

          </div>
          <div className="w-full md:w-1/2 px-4">
            <p className="text-lg text-gray-700 mb-4">
              {data.description1.replace('{years}', year)}
            </p>
            <p className="text-lg text-gray-700 mb-4">{data.description2}</p>
            <p className="text-lg text-gray-700">{data.description3}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
