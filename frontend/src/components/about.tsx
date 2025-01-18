import { Button } from "@/components/ui/button"
import Link from "next/link"

export const About = () => {
   return (
      /*<div className="hidden h-screen md:w-1/2 md:flex flex-col justify-center items-center gap-10 px-10 border">
         <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-gray-400">Desenvolvido com 💗 por Douglas</h1>
         </div>

         <p className="text-center text-gray-400 text-lg">
            Desenvolvedor Fullstack, formado como Técnico em Informática pelo Senac e atualmente estudante de Engenharia de Software pela Gran Faculdade, também sendo aluno do CFBCursos, B7WEB, DankiCode, e Matheus Fraga.
         </p>

         <p className="text-center text-gray-400 text-lg">
            Apaixonado pela linguagem Javascript, se aventura pelo desenvolvimento <i><b>Frontend</b></i> com <b>React/Next</b>, <i><b>Backend</b></i> com <b>Node e Prisma</b>, e o <i><b>Mobile</b></i> com <b>React Native</b> utilizando o TailwindCSS em tudo que for possível 🤣
         </p>

         <div className="flex gap-5">
            <Button variant={'ghost'} className="border">
               <Link
                  href={'https://www.linkedin.com/in/douglas-suzuki/'}
                  target="_blank"
                  className="text-center text-gray-400 hover:text-black font-bold">Linkedin</Link>
            </Button>

            <Button variant={'ghost'} className="border">
               <Link
                  href={'https://github.com/DouglasSuzukiDS'}
                  target="_blank"
                  className="text-center text-gray-400 hover:text-black font-bold">GitHub</Link>
            </Button>
         </div>
      </div>*/

      <div className="flex flex-col gap-5 h-full">
         <div className="text-center">
            <h1 className="text-xl md:text-3xl font-bold text-gray-400">Desenvolvido com 💗 por Douglas</h1>
         </div>

         <p className="text-center text-gray-400 text-base md:text-lg">
            Desenvolvedor Fullstack, formado como Técnico em Informática pelo Senac e atualmente estudante de Engenharia de Software pela Gran Faculdade, também sendo aluno do CFBCursos, B7WEB, DankiCode, e Matheus Fraga.
         </p>

         <p className="text-center text-gray-400 text-base md:text-lg">
            Apaixonado pela linguagem Javascript, se aventura pelo desenvolvimento <i><b>Frontend</b></i> com <b>React/Next</b>, <i><b>Backend</b></i> com <b>Node e Prisma</b>, e o <i><b>Mobile</b></i> com <b>React Native</b> utilizando o TailwindCSS em tudo que for possível 🤣
         </p>

         <div className="flex flex-col justify-center gap-5 md:flex-row">
            <Button variant={'ghost'} className="border">
               <Link
                  href={'https://www.linkedin.com/in/douglas-suzuki/'}
                  target="_blank"
                  className="text-center text-gray-400 hover:text-black font-bold">Linkedin</Link>
            </Button>

            <Button variant={'ghost'} className="border mb-5">
               <Link
                  href={'https://github.com/DouglasSuzukiDS'}
                  target="_blank"
                  className="text-center text-gray-400 hover:text-black font-bold">GitHub</Link>
            </Button>
         </div>
      </div>
   )
}