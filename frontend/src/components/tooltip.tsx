import { Button, buttonVariants } from "@/components/ui/button"
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip"
import { Dispatch, ReactNode, SetStateAction } from "react"

type Props = {
   buttonLabel: ReactNode
   buttonVariant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost"
   className?: string
   tooltipText: string
   onClick: () => void | Dispatch<SetStateAction<boolean>>
}
export const TooltipCustom = ({ buttonLabel, className, buttonVariant, tooltipText, onClick }: Props) => {
   return (
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger asChild>
               <Button
                  variant={buttonVariant}
                  className={className}
                  onClick={onClick}>
                  {buttonLabel}
               </Button>
            </TooltipTrigger>

            <TooltipContent>
               {tooltipText}
            </TooltipContent>

         </Tooltip>
      </TooltipProvider>
   )
}