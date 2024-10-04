import { IonPage } from "@ionic/react";
import { FC, FormEvent, useState } from "react";
import TextInput from "../components/TextInput";
import fetchApi from '../utils/axios'
import { getDataFromForm } from "../utils";

let fieldName = 'Email'

const ForgotPassword: FC = () => {
  const [success, setSuccess] = useState(false) 
  const [error, setError] = useState(false) 
  function submit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    let data = getDataFromForm({ email: fieldName },event.currentTarget)
    return fetchApi.post('/reset-password-request', { email: data.email })
      .then(() => setSuccess(true))
      .catch(() => setError(true))
  }
  return (<IonPage>
    <div className="m-8">
    {!success  ?
      <form onSubmit={submit} className="space-y-4">
        <TextInput label={fieldName} />
        <input className="rounded-lg bg-purple-base text-white text-center font-semibold text-xl py-4 px-8 center" type="submit"  value="Reinitilisez votre mot de passe"/>
      </form>
      :
      <p className="text-purple-base font-semibold text-xl">Si votre email est associé à un utilisateur un lien a été envoyé pour réinitialiser votre mot de passe</p>
    }
    {error && <p className="text-xl font-semibold text-red-600"></p>}
    </div>
  </IonPage>)
}

export default ForgotPassword
