export default function AboutUs({ texts, startYear } : any) {
  return (
    <section id="quienes-somos" className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">{texts.title}</h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <img src="/imagen-equipo.jpg" alt="Nuestro equipo" className="rounded-lg shadow-md" />
          </div>
          <div className="w-full md:w-1/2 px-4">
            <p className="text-lg text-gray-700 mb-4">
              {texts.description1.replace('{years}', startYear)}
            </p>
            <p className="text-lg text-gray-700 mb-4">{texts.description2}</p>
            <p className="text-lg text-gray-700">{texts.description3}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
