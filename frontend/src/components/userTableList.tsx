import { User } from "@/types/user"
import { SignUpForm } from "./signUpForm"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Dispatch, SetStateAction } from "react"
import { useAuth } from "../../contexts/auth"
import { api } from "@/utils/api"

type Props = {
   users: User[]
   setUsers: Dispatch<SetStateAction<User[]>>
}
export const UserTable = ({ users, setUsers }: Props) => {
   const { user } = useAuth()

   const deleteUser = async (id: number) => {
      const selected: User | undefined = users.find(ag => ag.id === id)

      if (selected) {
         const delConfirm = confirm(`Realmente deseja excluir o usuário ${selected?.name} ?`)

         delConfirm && await api.delete(`/user/${id}`)
            .then(res => {
               setUsers(users.filter(ag => ag.id !== id))

               console.log(res.data)
            })
            .catch(err => {
               console.error(err)
            })
      }
   }

   return (
      <table className="table-auto w-full">
         <thead className="font-bold text-center bg-neutral-400">
            <tr>
               <td className="w-1/4 px-4 py-2">Colaborador</td>
               <td className="w-1/4 px-4 py-2">Email</td>
               <td className="w-1/4 px-4 py-2">Cargo</td>
               <td className="w-1/4 px-4 py-2">Actions</td>
            </tr>
         </thead>

         <tbody>
            {users.map((item, index) => (
               <tr key={item.id} className={`border-b hover:opacity-75 ${index % 2 === 0 ? 'bg-neutral-300' : 'bg-neutral-400'}`}>
                  <td className="w-1/4 px-4 py-2">{item.name}</td>
                  <td className="w-1/4 px-4 py-2">{item.email}</td>

                  {/* <td className="w-1/4 px-4 py-2">{item.role === 'admin' ? 'Admin' : 'Analista'}</td> */}

                  <td className="w-1/4 px-4 py-2">
                     <Badge variant={'outline'}
                        className={`text-gray-950 flex justify-center py-2 px-5 w-full border-none ${item.role === 'admin' ? 'bg-emerald-600' : 'bg-indigo-300'} hover:opacity-75'}`}
                     >
                        {item.role === 'admin' ? 'ADMINISTRADOR' : 'ANALISTA'}
                     </Badge>
                  </td>

                  <td className="w-1/4 px-4 py-2 flex gap-5">
                     <SignUpForm
                        user={item}
                        setUsers={setUsers} />

                     <div className={`${user?.role !== 'admin' && 'cursor-not-allowed'}`}>
                        <Button
                           variant={'destructive'}
                           disabled={user?.role !== 'admin' && true}
                           className={`flex font-bold justify-center ${user?.role !== 'admin' && 'cursor-not-allowed'}`}
                           onClick={() => deleteUser(item.id)}
                        >Excluir</Button>
                     </div>
                  </td>
               </tr>
            ))}
         </tbody>
      </table>
   )
}