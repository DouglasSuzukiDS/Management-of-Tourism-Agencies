import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"

type Props = {
   role: string
   setRole: Dispatch<SetStateAction<string>>
}
export const RadioCustom = ({ role, setRole }: Props) => {
   const handleChange = () => {
      // setRole(event.target.value)
   }

   return (
      <RadioGroup defaultValue={'analyst'} onValueChange={value => setRole(value)} className="flex justify-between">
         <div className="flex items-center space-x-4">
            <RadioGroupItem value="analyst" id="analyst" className={`text-white size-5 border-2 border-gray-300 ${role === 'analyst' && ' border-white'} `} />
            <Label htmlFor="analyst" className="font-bold">Analista</Label>
         </div>

         <div className="flex items-center space-x-4">
            <RadioGroupItem value="admin" id="admin" className={`text-white size-5 border-2 border-gray-300 ${role === 'admin' && ' border-white'} `} />
            <Label htmlFor="admin" className="font-bold">Administrador</Label>
         </div>
      </RadioGroup>
   )
}