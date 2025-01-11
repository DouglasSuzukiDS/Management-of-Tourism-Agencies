import { Button } from "@/components/ui/button"
import Link from "next/link"

export const About = () => {
   return (
      <div className="h-screen w-1/2 flex flex-col justify-center items-center gap-10 px-10 border">
         <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-gray-400">Desenvolvido com 💗</h1>
            <h1 className="text-3xl text-gray-400 font-bold">por Douglas</h1>
         </div>

         <p className="text-center text-gray-400 text-lg">
            Desenvolvedor Fullstack, formado como Técnico em Informática pelo Senac e atulamente estudante de Engenharia de Software pela Gran Faculdade, também sendo aluno do CFBCursos, B7WEB, DankiCode, e Matheus Fraga.
         </p>

         <p className="text-center text-gray-400 text-lg">
            Apaixonado pela linguagem Javascript, se aventura pelo desenvolvimento <i><b>Frontend</b></i> com <b>React/Next</b>, <i><b>Backend</b></i> com <b>Node e Prisma</b>, e o <i><b>Mobile</b></i> com <b>React Native</b> utilizando o TailwindCSS em tudo que for possível 🤣
         </p>

         <div className="flex gap-5">
            <Button variant={'default'}>
               <Link
                  href={'https://www.linkedin.com/in/douglas-suzuki/'}
                  className="text-center text-gray-400 font-bold">Linkedin</Link>
            </Button>

            <Button variant={'default'} className="">
               <Link
                  href={'https://github.com/DouglasSuzukiDS'}
                  className="text-center text-gray-400 font-bold">GitHub</Link>
            </Button>
         </div>
      </div>
   )
}