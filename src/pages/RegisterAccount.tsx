import { IonPage } from "@ionic/react"
import { FC, FormEvent, useRef, useState } from "react"
import TextInput from "../components/TextInput"
import { getDataFromForm } from "../utils"
import { RegisterAccountLabels } from "../constants/label"
import fetchApi from '../utils/axios'
import { useUpdateEffect } from "usehooks-ts"

const RegisterAccount: FC = () => {
  const [success, setSuccess] = useState(false)
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [isPasswordInvalid, setIsPassWordInvalid] = useState(false)
  const email = useRef<string | null>(null)
  async function submit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isPasswordInvalid) return

    const formData = getDataFromForm(RegisterAccountLabels, event.currentTarget)
    email.current = formData.email
    const data = {
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      name: formData.name
    }
    return fetchApi.post('/user/register', data)
      .then(() => {
        setSuccess(true)
      })
  }

  useUpdateEffect(() => {
    console.log(password, confirmPassword)
    if ((password == confirmPassword)) {
      setIsPassWordInvalid(false)
    } else {
      setIsPassWordInvalid(true)
    }
  }, [password, confirmPassword])

  return (<IonPage>
    {!success ? 
      <form onSubmit={submit} className="mt-8 space-y-4 items-center flex flex-col">
        <TextInput required label={RegisterAccountLabels.name} />
        <TextInput required label={RegisterAccountLabels.email} path="email" />
        <TextInput onChange={({ currentTarget }) => {setPassword(currentTarget.value)}} type="password" required label={RegisterAccountLabels.password} />
        <TextInput onChange={({ currentTarget }) => {setConfirmPassword(currentTarget.value)}} type="password" required label={RegisterAccountLabels.confirmPassword} />
        {isPasswordInvalid && <p className="text-red-600 font-semibold">Les mots de passe ne correspondent pas</p>}
        <TextInput type='number' required label={RegisterAccountLabels.phoneNumber} />
        <input className="rounded-lg bg-purple-base text-white text-center font-semibold text-xl py-4 px-8 center" type="submit"  value="s'inscrire"/>
      </form> 
      :
      <div className="m-6 text-purple-base text-xl font-semibold">Un email de confirmation a été envoyé à {email.current}</div>
    }
  </IonPage>)
}

export default RegisterAccount
