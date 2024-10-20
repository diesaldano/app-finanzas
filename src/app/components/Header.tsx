import { HeaderData } from "../interfaces/types";

interface HeaderProps {
  data: HeaderData;
}

export default function Header({ data }: HeaderProps) {

  return (
    <section id="inicio" className="flex flex-col items-center bg-gray-200 py-20">
      <h1 className="text-4xl font-bold mt-8">{data.title}</h1>
    </section>
  )
}