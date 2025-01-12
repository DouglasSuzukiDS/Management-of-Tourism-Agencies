import { Button } from "@/components/ui/button"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TooltipCustom } from "./tooltip"
import { Plus } from "lucide-react"
import { useState } from "react"

export function UserForm() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [name, setName] = useState('')
   const [role, setRole] = useState('analyst')

   return (
      <Dialog>

         <DialogTrigger asChild>
            <TooltipCustom
               buttonLabel={<Plus />}
               className="bg-sky-300 hover:bg-sky-400"
               tooltipText="Adicionar uma nova agência"
               onClick={() => { }}
            />
         </DialogTrigger>

         <DialogContent className="sm:max-w-[425px]">

            <DialogHeader>
               <DialogTitle>Cadastrar nova agência</DialogTitle>
               <DialogDescription>
                  Informe os dados da agência
               </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                     Name
                  </Label>
                  <Input id="name" value="Pedro Duarte" className="col-span-3" />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                     Username
                  </Label>
                  <Input id="username" value="@peduarte" className="col-span-3" />
               </div>
            </div>

            <DialogFooter>
               <Button type="submit">Save changes</Button>
            </DialogFooter>

         </DialogContent>

      </Dialog>
   )
}
