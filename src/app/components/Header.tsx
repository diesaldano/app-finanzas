import { HeaderData } from "../interfaces/types";

interface HeaderProps {
  data: HeaderData;
}

export default function Header({ data }: HeaderProps) {

  return (
    <section
      id="inicio"
      className="flex flex-col items-center py-20 bg-cover bg-center"
      style={{ backgroundImage: `url(/header.jpg)`, backgroundSize: 'cover' }}

    >
      <h1 className="text-4xl font-bold mt-8 text-white">{data.title}</h1>
    </section>
  )
}