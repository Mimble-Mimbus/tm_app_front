import { IonPage, useIonRouter } from "@ionic/react"
import { FC, useEffect, useState } from "react"
import authStore from "../store/authStore"
import { observer } from "mobx-react"
import { ApiUser } from "../types/user"
import Modal from "../components/Modal"
import fetchApi from '../utils/axios'
import { Link } from "react-router-dom"
import DeleteAccountConfirmation from "../components/DeleteAccountConfirmation"

const resetPassWordConfirmation = (email: string) => <p className="text-center py-8 px-4 text-purple-base w-[300px] font-semibold">Un email a été envoyé à {email} pour reinitialiser votre mot de passe</p>

const Account: FC = () => {
  const [user, setUser] = useState<ApiUser>()
  const [isOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState<null | 'delete-acount' | 'reset-password' >(null)
  const router = useIonRouter()

  function sendPasswordChangRequest () {
    return fetchApi.post('/reset-password-request', { email: user?.email}).then(() => {
      setModalType('reset-password')
      setIsOpen(true)
    })
  }

  function showDeleteAccount () {
    setModalType('delete-acount')
    setIsOpen(true)
  }

  async function logout () {
    await authStore.logout()
    router.push('/accueil')
  }

  useEffect(() => {
    authStore.fetchUser().then(res => {
      setUser(res)
    }) 
  }, [])

  function getHighestRole(roles: string[]) {
    if (roles.includes('ROLE_ADMIN')) return 'Administrateur'
    if (roles.includes('ROLE_VOLUNTEER')) return 'Bénévole'
    return 'Visiteur'
  }

  return (<IonPage>
    <Modal isOpen={isOpen} useBackdrop={true} toggle={() => setIsOpen(false)}>
      {(modalType === 'reset-password') && <p className="text-center py-8 px-4 text-purple-base w-[300px] font-semibold">Un email a été envoyé à {user?.email} pour reinitialiser votre mot de passe</p>}
      {(modalType === 'delete-acount') && <DeleteAccountConfirmation />}
    </Modal>
    {user && <div className="ml-8 mt-8 space-y-12">   
      <h2 className="text-3xl font-bold">Paramètres de compte</h2>
      <div className="ml-2 space-y-8 text-xl font-medium">
        <div>email : {user.email}</div>
        <div>nom : {user.name}</div>
        <div>rôle : {getHighestRole(user.roles)}</div>
        <div className="flex justify-between mr-8" onClick={sendPasswordChangRequest}>Changer de mot de passe <span className="font-bold text-2xl"> {'>'} </span></div>
      </div>
      <h2 className="text-3xl font-bold">Notifications</h2>
      <h2 className="text-3xl font-bold">Données personnelles</h2>
      <div className="ml-2 space-y-8 text-xl font-medium">
        <Link to="/rgpd" className="flex justify-between mr-8">rpgd <span className="font-bold text-2xl"> {'>'} </span></Link>
        <div onClick={showDeleteAccount} className="flex justify-between mr-8">supprimer le compte <span className="font-bold text-2xl"> {'>'} </span></div>
      </div> 
      <button onClick={logout} className="rounded-lg bg-purple-base text-white text-center font-semibold text-xl py-4 px-6 w-fit center"> Déconnexion</button>
    </div>}
  </IonPage>)
}

export default observer(Account)
