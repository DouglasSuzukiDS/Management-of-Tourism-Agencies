import { useAuth } from "../../contexts/auth"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"
import { Separator } from "@radix-ui/react-separator"

export const Header = () => {
   const { signOut } = useAuth()

   const router = useRouter()
   const path = usePathname()

   const handleSignOut = async () => {
      const res = await signOut()
      res && router.push('/')
   }

   return (
      <header className="bg-black flex flex-wrap justify-around py-5 border-b gap-y-4">
         <nav className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 font-bold text-gray-200">
            <Link
               className={`${path === '/home' && 'border-b'} hover:border-b `}
               href={'/home'}>Home</Link>

            <Link
               className={`${path === '/agencies' && 'border-b'} hover:border-b`}
               href={'/agencies'}>Agências</Link>

            <Link
               className={`${path === '/users' && 'border-b'} hover:border-b`}
               href={'/users'}>Usuários</Link>
         </nav>

         <Button
            variant={'ghost'}
            className="border text-gray-200 font-bold"
            onClick={handleSignOut}>
            Sair
            <LogOut />
         </Button>
      </header>

   )
}