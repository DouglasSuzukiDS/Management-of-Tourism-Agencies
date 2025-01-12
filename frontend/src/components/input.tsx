import { Dispatch, SetStateAction } from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

type Props = {
   label: string
   value: string
   placeholder: string
   className?: string
   type?: 'password'
   onChange: Dispatch<SetStateAction<string>>
}
export const InputCustom = ({ label, value, placeholder, className, type, onChange }: Props) => {
   return (
      <div className={`w-full ${className}`}>
         <Label className="font-bold">{label}</Label>

         <Input
            placeholder={placeholder}
            className={`text-black w-full focus-visible:ring-offset-0 focus-visible:ring-0`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type={type ? type : "text"}
         />
      </div>
   )
}