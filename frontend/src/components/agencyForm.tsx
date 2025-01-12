import { Button } from "@/components/ui/button"
import {
   Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { TooltipCustom } from "./tooltip"
import { Plus } from "lucide-react"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { InputCustom } from "./input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { RadioButton } from "./radioButton"
import { Agency } from "@/types/agency"
import { useAuth } from "../../contexts/auth"
import { api } from "@/utils/api"
import { User } from "@/types/user"
import { getAgencies } from "@/utils/agency"

type Props = {
   agency: Agency | null
   setAgencies: Dispatch<SetStateAction<Agency[]>>
}
export function AgencyForm({ agency, setAgencies }: Props) {
   const [name, setName] = useState('')
   const [fantasyName, setFantasyName] = useState('')
   const [description, setDescription] = useState('')
   const [cnpj, setCnpj] = useState('')
   const [registerState, setRegisterState] = useState('')
   const [foundation, setFoundation] = useState('')
   const [email, setEmail] = useState('')
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
      const data = { name, fantasyName, description, cnpj, registerState, foundation, email, contact, address, uf, status }

      await api.post('/agency', { ...data })
         .then(async (res) => {
            alert('Agência cadastrada')
            clearInputs()

            await api.get('/agency')
               .then(res => {
                  console.log(res.data)

                  setAgencies(res.data.agencies)
               })
               .catch(err => {
                  console.error(err)
                  return
               })

            console.log(res.data)
         })
         .catch(err => {
            console.error(err)
            alert('Não foi possível cadastrar a agência. Verifique se todos os campos estão preenchidos ou tente mais tarde.')
         })
   }

   const handleEditAgency = async (id: number) => {
      await api.put(`/agency/${id}`, {
         name,
         fantasyName,
         description,
         cnpj,
         registerState,
         foundation,
         email,
         contact,
         address,
         uf,
         status,
      })
         .then(async (res) => {
            alert('Agência editada')
            console.log(res.data)
            clearInputs()

            await api.get('/agency')
               .then(res => {
                  console.log(res.data)

                  setAgencies(res.data.agencies)
               })
               .catch(err => {
                  console.error(err)
                  return
               })
         })
         .catch(err => {
            console.error(err)
            alert('Não foi possível editar a agência')
         })
   }

   const clearInputs = async () => {
      setName('')
      setFantasyName('')
      setDescription('')
      setCnpj('')
      setRegisterState('')
      setFoundation('')
      setContact('')
      setEmail('')
      setAddress('')
      setUf('')
      setStatus(true)
   }

   useEffect(() => {
      if (agency === null) {
         clearInputs()
      } else {
         setName(agency.name)
         setFantasyName(agency.fantasyName)
         setDescription(agency.description)
         setCnpj(agency.cnpj)
         setRegisterState(agency.registerState)
         setFoundation(agency.foundation)
         setEmail(agency.email)
         setContact(agency.contact)
         setAddress(agency.address)
         setUf(agency.uf)
         setStatus(status)

         console.log(`Agencia: ${agency}`)
      }
   }, [agency])

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
                  checked={String(status)}
               />

               <InputCustom
                  label="Nome fantasia"
                  placeholder="Digite o nome da agência"
                  className="w-full"
                  value={fantasyName}
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
                  placeholder="Digite o número de contato da agência"
                  className="w-full"
                  value={contact}
                  onChange={setContact}
               />

               <InputCustom
                  label="Email"
                  placeholder="Digite o email da agência"
                  className="w-full"
                  value={email}
                  onChange={setEmail}
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
                     onClick={() => handleEditAgency(agency.id)}>
                     Editar
                  </Button>
               }
            </DialogFooter>

         </DialogContent>

      </Dialog>
   )
}
