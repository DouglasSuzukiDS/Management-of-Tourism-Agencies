import { Dispatch, SetStateAction } from "react"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"

type Option = {
   value: any
   label: string
}

type Props = {
   state: any
   setState: Dispatch<SetStateAction<any>>
   options: Option[]
}

export const RadioButton = ({ state, setState, options }: Props) => {
   return (
      <RadioGroup
         defaultValue={options[0].value}
         onValueChange={value => setState(value)}
         className="flex justify-between">
         {options.map((radio, index) => (
            <div key={index}
               className="flex items-center space-x-4">

               <RadioGroupItem
                  value={radio.value}
                  id={String(radio.value)}
                  className={`text-white size-5 border-2 border-gray-300 ${state === radio.value && 'border-white'}`} />

               <Label
                  htmlFor={String(radio.value)}
                  className="font-bold">
                  {radio.label}</Label>
            </div>

         ))}
      </RadioGroup>
   )
}