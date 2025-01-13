import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuth } from "../../contexts/auth"

export const App = () => {
   const router = useRouter()

   const { loadStorage } = useAuth()

   const checkIfLogged = async () => {
      const logged = await loadStorage()

      if (logged) {
         router.push('/agencies')
      } else {
         router.push('/auth')
      }
   }
   useEffect(() => {
      checkIfLogged()
   }, [])

   return
}