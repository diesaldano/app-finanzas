interface HeaderProps {
  data: HeaderData
}

export default function Header({ data }: HeaderProps) {

  return (
    <section id="inicio" className="flex flex-col items-center bg-gray-200 py-20">
      <h1 className="text-4xl font-bold mt-8">Compra y Venta de Dólares</h1>
    </section>
  )
}