'use client'

import { InitialPage } from "@/components/initialPage"
import { AuthProvider } from "../../contexts/auth"

export const App = () => {

   return (
      <div className="h-screen w-screen flex justify-center items-center">
         <AuthProvider>
            <InitialPage />
         </AuthProvider>
      </div>
   )
}