import { IonButton, IonPage, useIonRouter } from "@ionic/react";
import { FC, FormEvent, useState } from "react";
import TextInput from "../components/TextInput";
import { getDataFromForm } from "../utils";
import authStore from "../store/authStore";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

const Login: FC = () => {
  const router = useIonRouter()
  const [error, setError] = useState(false)
  const labels = {
    username: 'Email',
    password: 'Mot de passe'
  }

  if (authStore.isLogged) {
    return <Redirect to="/accueil" />
  }


  async function onSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = getDataFromForm(labels, event.currentTarget)
    await authStore.login(data)
      .then(() => {
        const { lastPathname } = router.routeInfo
        router.push(lastPathname || '/accueil')
      }).catch(() => {
        setError(true)
      })
  }
  return <IonPage className="middle">
      <form onSubmit={onSubmit} className="w-3/5 space-y-8 flex flex-col items-center">
        <TextInput label={labels.username} />
        <TextInput type="password" label={labels.password} />
        <Link className="text-purple-base font-semibold" to="/forgot-password">Mot de passe oublié ?</Link>
        <IonButton type="submit" className="flex w-2/5" shape="round" color='purple'>connexion</IonButton>
        <Link className="text-purple-base font-semibold" to="/register-account">Pas de compte  ? cliquez ici</Link>
      </form>
      {error && <div className="text-red-500 font-bold text-xl">identifiants invalides</div>}
  </IonPage>
}

export default Login