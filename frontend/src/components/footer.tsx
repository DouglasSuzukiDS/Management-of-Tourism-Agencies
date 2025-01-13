import Link from "next/link"

type Props = {
   className: string
}

export const Footer = ({ className }: Props) => {
   return (
      <footer className={className}>
         <h1 className="text-md font-bold text-gray-400">Desenvolvido com 💗 por <Link
            target="_blank"
            className="underline"
            href={'https://www.linkedin.com/in/douglas-suzuki/'}>Douglas</Link></h1>
      </footer>
   )
}