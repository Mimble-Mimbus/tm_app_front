import { FC, useState } from "react"
import TextInput from "./TextInput"
import fetchApi from '../utils/axios'
import { useTimeout } from "usehooks-ts"
import { useIonRouter } from "@ionic/react"
import authStore from "../store/authStore"

const DeleteAccountConfirmation: FC = () => {
  const [password, setPassword] = useState<string>()
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useIonRouter()
  function deleteAccount () {
    if (!password) return
    return fetchApi.delete('/user/delete/me', { data: { password }})
      .then(async () => { 
        setSuccess(true)
        await authStore.logout()
        router.push('/accueil')
      })
      .catch(() => setError(true))
  }

  return <div className="py-8 px-6 flex flex-col items-center space-y-8">
    <p className="text-lg font-semibold text-red-600 w-64">Êtes vous sur de vouloir supprimer votre compte ? cette action est irréversible.</p>
      <TextInput type="password" onChange={({currentTarget}) => setPassword(currentTarget.value)} label="Mot de passe"  />
      {error && <p className="text-base font-semibold text-red-600">Votre mot de passe est invalide</p>}
      {success && <p className="text-base font-semibold text-green-600">Votre compte a été supprimé avec succès</p>}
      <button onClick={deleteAccount} className="rounded-lg bg-purple-base text-white text-center font-semibold text-lg py-3 px-6 center">supprimer votre compte</button>
    </div>
}

export default  DeleteAccountConfirmation
