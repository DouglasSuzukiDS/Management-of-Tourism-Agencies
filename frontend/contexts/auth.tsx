'use client'

import { SignUp } from "@/types/signUp";
import { User } from "@/types/user";
import { api } from "@/utils/api";
import { jwtDecode } from "jwt-decode";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

type AuthContextType = {
   user: User | null
   setUser: Dispatch<SetStateAction<User | null>>
   signUp: (user: SignUp) => Promise<boolean>
   signIn: (login: string, password: string) => Promise<boolean>
   signOut: () => Promise<boolean>
   loadStorage: () => Promise<boolean>
}

export const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
   children: ReactNode
}
export const AuthProvider = ({ children }: Props) => {
   const [user, setUser] = useState<User | null>(null)

   const signUp = async (user: SignUp) => {
      const newUser = await api.post('/register', user)
         .then(res => {
            console.log(res.data)

            return true
         })
         .catch(err => {
            console.log(err)
            return false
         })

      return newUser
   }

   const signIn = async (login: string, password: string) => {
      const logged = await api.post('/login', { login, password })
         .then(res => {
            console.log(res.data)

            setUser(res.data.user)

            localStorage.setItem('token', res.data.token)

            return true
         })
         .catch(err => {
            console.log(err)
            return false
         })

      return logged
   }

   const signOut = async () => {
      setUser(null)

      localStorage.clear()

      return true
   }

   const loadStorage = async () => {
      const token = localStorage.getItem('token')

      if (token) {
         try {
            const decodedToken = jwtDecode<User>(token)

            setUser(decodedToken)

            return true
         } catch (err) {
            console.log(err)
            localStorage.clear()

            return false
         }
      }

      return false
   }

   useEffect(() => {
      loadStorage()
   }, [])

   return (
      <AuthContext.Provider value={{ user, setUser, signUp, signIn, signOut, loadStorage }}>
         {children}
      </AuthContext.Provider>
   )
}

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) throw new Error("useAuth must be used within an AuthProvider");

   return context;
}