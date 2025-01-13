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
      <header>
         <Link href={'/home'}>Home</Link>
         <Link href={'/agencies'}>Agências</Link>
         <Link href={'/users'}>Users</Link>
         <Button onClick={handleSignOut}>Sair</Button>
      </header>
   )
}