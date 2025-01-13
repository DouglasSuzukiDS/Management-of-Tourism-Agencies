import { default as LoggedPage } from "@/app/logged/page"
import { default as AgencyPage } from "@/app/agencies/page"
import { default as UserPage } from "@/app/users/page"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "../../contexts/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "./ui/button"

export const Header = () => {
   const { signOut } = useAuth()

   const router = useRouter()

   const handleSignOut = async () => {
      return await signOut()
   }

   return (
      <header>
         <nav>
            <Link href={'/home'}>Home</Link>
            <Link href={'/agencies'}>Agências</Link>
            <Link href={'/users'}>Usuários</Link>
            <Button onClick={handleSignOut}>Sair</Button>
         </nav>
      </header>
   )
}