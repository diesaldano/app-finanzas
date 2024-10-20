export default function HowItWorks({ texts }: any ) {
  return (
    <section id="como-funciona" className="container mx-auto my-16">
      <h2 className="text-3xl font-bold text-center mb-8">{texts.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {texts.steps.map((step: any, index: number) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6">
            <step.icon className="text-primary text-6xl mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
