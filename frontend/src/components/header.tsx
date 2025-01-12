import { default as LoggedPage } from "@/app/logged/page"
import { default as AgencyPage } from "@/app/agencies/page"
import { default as UserPage } from "@/app/users/page"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "../../contexts/auth"
import { useRouter } from "next/navigation"

export const Header = () => {
   const { signOut } = useAuth()

   const router = useRouter()

   const handleSignOut = async () => {
      const res = await signOut()
      res && router.push('/')

   }
   return (
      // <Tabs defaultValue="account" className="w-[400px]">
      <Tabs defaultValue="account" className="w-full flex items-center flex-col bg-red-600">
         <TabsList>
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="agencies">Agências</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="logout" onClick={handleSignOut}>Sair</TabsTrigger>
         </TabsList>

         <TabsContent value="home">
            <LoggedPage />
         </TabsContent>

         <TabsContent value="agencies">
            <AgencyPage />
         </TabsContent>

         <TabsContent value="users">
            <UserPage />
         </TabsContent>
      </Tabs>
   )
}