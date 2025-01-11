'use client'
import { useRouter } from "next/navigation"
import { useAuth } from "../../contexts/auth"
import { Button } from "./ui/button"

export const SignOutButton = () => {
   const { signOut, loadStorage } = useAuth()

   const router = useRouter()

   const handleClick = async () => {
      await signOut()
      router.push('/')
   }

   return (
      <Button
         variant={'outline'}
         className="w-full"
         onClick={handleClick}>
         Sair
      </Button>
   )
}