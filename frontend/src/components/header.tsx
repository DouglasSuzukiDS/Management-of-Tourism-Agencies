import { useAuth } from "../../contexts/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "./ui/button"

export const Header = () => {
   const { signOut } = useAuth()

   const router = useRouter()

   const handleSignOut = async () => {
      const res = await signOut()
      res && router.push('/')
   }

   return (
      <header className="bg-red-600 flex justify-around py-5">
         <nav className="flex justify-center items-center gap-10 font-bold">
            <Link href={'/home'}>Home</Link>
            <Link href={'/agencies'}>Agências</Link>
            <Link href={'/users'}>Users</Link>
         </nav>

         <Button onClick={handleSignOut}>Sair</Button>
      </header>
   )
}