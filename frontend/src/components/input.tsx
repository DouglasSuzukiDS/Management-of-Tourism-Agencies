import { Dispatch, SetStateAction } from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

type Props = {
   label: string
   value: string
   placeholder: string
   type?: 'password'
   onChange: Dispatch<SetStateAction<string>>
}
export const InputCustom = ({ label, placeholder, type, value, onChange }: Props) => {
   return (
      <div className="w-full">
         <Label className="font-bold">{label}</Label>

         <Input
            placeholder={placeholder}
            className="text-black"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type={type ? type : "text"}
         />
      </div>
   )
}