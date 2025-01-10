'use client'

import { Form } from "@/components/form"
import { AuthProvider } from "../../contexts/auth"

export const App = () => {
   return (
      <div className="h-screen flex justify-center items-center">
         <AuthProvider>
            <Form />
         </AuthProvider>
      </div>
   )
}