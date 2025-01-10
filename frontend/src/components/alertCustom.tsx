import { AlertDialog } from "@radix-ui/react-alert-dialog"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"

type Props = {
   title: string
   description: string
}
export const AlertCustom = ({ title, description }: Props) => {
   return (
      <AlertDialog>
         <AlertDialogTrigger>Open</AlertDialogTrigger>
         <AlertDialogContent>

            <AlertDialogHeader>
               <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

               <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
               </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>

         </AlertDialogContent>
      </AlertDialog>
   )
}