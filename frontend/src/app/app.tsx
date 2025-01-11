'use client'

import { Form } from "@/components/form"
import { AuthProvider } from "../../contexts/auth"

export const App = () => {
   return (
      <div className="h-screen w-1/2 flex justify-center items-center">
         <AuthProvider>
            <Form />
         </AuthProvider>
      </div>
   )
}