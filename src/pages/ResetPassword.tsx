import { IonPage, useIonRouter } from "@ionic/react";
import { FC, FormEvent, useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import { ResetPassWordLabels } from "../constants/label";
import { useUpdateEffect } from "usehooks-ts";
import { getDataFromForm } from "../utils";
import fetchApi from '../utils/axios'
import qs from "query-string";

const ResetPassword: FC = () => {
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [isPasswordInvalid, setIsPassWordInvalid] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const router = useIonRouter()
  const token  = qs.parse(router.routeInfo.search).token

  useEffect(() => {
    if (!token) {
      router.push('/accueil')
    }
  }, [])

  useUpdateEffect(() => {
    console.log(password, confirmPassword)
    if ((password == confirmPassword)) {
      setIsPassWordInvalid(false)
    } else {
      setIsPassWordInvalid(true)
    }
  }, [password, confirmPassword])
  
  function submit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!token) return
    const data = getDataFromForm(ResetPassWordLabels, event.currentTarget)

    return fetchApi.post('/reset-password', {
      password: data.password,
      token
    }).then(() => {
      setSuccess(true)
    })
      .catch(() => setError(true))
  }

  return <IonPage>
    <div className="p-8">
      <h1 className="text-purple-base font-bold text-3xl mb-8">Réinitialiser votre mot de passe</h1>
      <form className="space-y-4" onSubmit={submit}>
        <TextInput type="password" onChange={({ currentTarget }) => setPassword(currentTarget.value)} label={ResetPassWordLabels.password} />
        <TextInput type="password" onChange={({ currentTarget }) => setConfirmPassword(currentTarget.value)} label={ResetPassWordLabels.confirmPassword} />
        {isPasswordInvalid && <p className="text-red-600 font-semibold">Les mots de passe ne correspondent pas</p>}
        <input disabled={success} className="rounded-lg bg-purple-base text-white text-center font-semibold text-xl py-4 px-8 center" type="submit"  value="enregistrer"/>
      </form>
      {success && <div className="text-xl p-6 font-semibold text-purple-base">Votre email a été validé avec succès</div>}
      {error && <div className="text-xl p-6 font-semibold text-red-600">le token est invalide</div>}
    </div>
  </IonPage>
}

export default ResetPassword