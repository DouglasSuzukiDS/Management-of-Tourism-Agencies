import { Button } from "@/components/ui/button"
import {
   Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { TooltipCustom } from "./tooltip"
import { Plus } from "lucide-react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { InputCustom } from "./input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { RadioButton } from "./radioButton"
import { Agency } from "@/types/agency"
import { useAuth } from "../../contexts/auth"

type Props = {
   agency: Agency | null
   /*name: string
   setName: Dispatch<SetStateAction<string>>

   fantasyName: string
   setFantasyName: Dispatch<SetStateAction<string>>

   description: string
   setSetDescription: Dispatch<SetStateAction<string>>

   cpnj: string
   setCnpj: Dispatch<SetStateAction<string>>

   registerState: string
   setRegisterState: Dispatch<SetStateAction<string>>

   role: string
   setRole: Dispatch<SetStateAction<string>>

   role: string
   setRole: Dispatch<SetStateAction<string>>


   role: string
   setRole: Dispatch<SetStateAction<string>>

   register: boolean
   setRegister: Dispatch<SetStateAction<boolean>>*/
}
export function AgencyForm({ agency }: Props) {
   const [name, setName] = useState('')
   const [fantansyName, setFantasyName] = useState('')
   const [description, setDescription] = useState('')
   const [cnpj, setCnpj] = useState('')
   const [registerState, setRegisterState] = useState('')
   const [foundation, setFoundation] = useState('')
   const [contact, setContact] = useState('')
   const [address, setAddress] = useState('')
   const [uf, setUf] = useState('')
   const [status, setStatus] = useState(true)

   // Quantas opções de radio forem necessários
   const radioOptions = [
      { value: true, label: 'Ativa' },
      { value: false, label: 'Inativa' },
   ]

   const handleNewAgency = async () => {
      // alert(`O valor em status é: ${status}`)
      alert(`Register`)
   }

   const handleEditAgency = async () => {
      alert(`Edit`)
   }

   useEffect(() => {
      if (agency === null) {
         setName('')
         setFantasyName('')
         setDescription('')
         setCnpj('')
         setRegisterState('')
         setFoundation('')
         setContact('')
         setAddress('')
         setUf('')
         setStatus(true)
      } else {
         setName(agency.name)
         setFantasyName(agency.fantasyName)
         setDescription(agency.description)
         setCnpj(agency.cnpj)
         setRegisterState(agency.registerState)
         setFoundation(agency.foundation)
         setContact(agency.contact)
         setAddress(agency.address)
         setUf(agency.uf)
         setStatus(agency.status)
      }
   }, [])


   return (
      <Dialog>

         <DialogTrigger asChild>
            {agency === null ?
               <TooltipCustom
                  buttonLabel={<Plus />}
                  className="bg-sky-300 hover:bg-sky-400"
                  tooltipText="Adicionar uma nova agência"
                  onClick={() => { }}
               /> :
               <Button>Editar</Button>
            }
         </DialogTrigger>

         <DialogContent
            className="sm:max-w-[425px] max-h-[500px] overflow-y-auto bg-customGray-medium text-gray-200">

            <DialogHeader>
               <DialogTitle>Cadastrar nova agência</DialogTitle>
               <DialogDescription>
                  Informe os dados da agência
               </DialogDescription>
            </DialogHeader>

            <div className="w-full grid gap-4 py-4">
               <InputCustom
                  label="Nome da agência"
                  placeholder="Digite o nome da agência"
                  className="w-full"
                  value={name}
                  onChange={setName}
               />

               <RadioButton
                  options={radioOptions}
                  state={status}
                  setState={setStatus}
               />

               <InputCustom
                  label="Nome fantasia"
                  placeholder="Digite o nome da agência"
                  className="w-full"
                  value={fantansyName}
                  onChange={setFantasyName}
               />

               <InputCustom
                  label="CNPJ da agência"
                  placeholder="Digite o CNPJ da agência"
                  className="w-full"
                  value={cnpj}
                  onChange={setCnpj}
               />

               <InputCustom
                  label="Inscrição Estadual"
                  placeholder="Digite a inscrição estatual da agência"
                  className="w-full"
                  value={registerState}
                  onChange={setRegisterState}
               />

               {/* Description */}
               <div>
                  <Label>Descrição</Label>

                  <Textarea
                     placeholder="Digite a descrição da agência"
                     className="w-full text-black"
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                  />
               </div>

               <InputCustom
                  label="Data de fundação"
                  placeholder="Digite a data de fundação da agência"
                  className="w-full"
                  value={foundation}
                  onChange={setFoundation}
               />

               <InputCustom
                  label="Contato"
                  placeholder="Digite número de contato da agência"
                  className="w-full"
                  value={contact}
                  onChange={setContact}
               />

               <InputCustom
                  label="Endereço"
                  placeholder="Digite o endereço da agência"
                  className="w-full"
                  value={address}
                  onChange={setAddress}
               />

               <InputCustom
                  label="Estado"
                  placeholder="Digite estado da agência"
                  className="w-full"
                  value={uf}
                  onChange={setUf}
               />

            </div>

            <DialogFooter className="w-full">
               {agency === null ?
                  <Button
                     variant={"ghost"}
                     className="w-full border font-bold"
                     onClick={handleNewAgency}>
                     Registrar
                  </Button> :
                  <Button
                     variant={"ghost"}
                     className="w-full border font-bold"
                     onClick={handleEditAgency}>
                     Editar
                  </Button>
               }
            </DialogFooter>

         </DialogContent>

      </Dialog>
   )
}
