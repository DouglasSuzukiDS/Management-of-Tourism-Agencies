'use client'

import { SidebarComponent } from "@/components/sidebar"

export default function Page() {
   return (
      <div className="w-screen h-screen flex flex-row">
         <SidebarComponent />
         <h1>Users</h1>
      </div>
   )
}