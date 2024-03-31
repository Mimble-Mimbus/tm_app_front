import { IonButton, IonPage, useIonRouter } from "@ionic/react";
import { FC, FormEvent, useState } from "react";
import TextInput from "../components/TextInput";
import { getDataFromForm } from "../utils";
import authStore from "../store/authStore";

const Login: FC = () => {
  const router = useIonRouter()
  const [error, setError] = useState(false)
  const labels = {
    username: 'Email',
    password: 'Mot de passe'
  }

  async function onSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = getDataFromForm(labels, event.currentTarget)
    await authStore.login(data)
      .then(() => {
        router.push('/accueil')
      }).catch(() => {
        setError(true)
      })
  }
  return <IonPage className="middle">
      <form onSubmit={onSubmit} className="w-3/5 space-y-8 flex flex-col items-center">
        <TextInput label={labels.username} />
        <TextInput label={labels.password} />
        <IonButton className="flex w-2/5" shape="round" color='purple'>connexion</IonButton>
      </form>
      {error && <div className="text-red-500 font-bold text-xl">identifiants invalides</div>}
  </IonPage>
}

export default Login