import { IonPage, useIonRouter } from "@ionic/react";
import { FC, useEffect, useState } from "react";
import qs from 'query-string'
import fetchApi from '../utils/axios'

const VerifyEmail: FC = () => {
  const router = useIonRouter()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  function verify (hash: string) {
    return fetchApi.post('/user/validate', {  emailVerificationHash: hash })
  }

  useEffect(() => {
    const hash  = qs.parse(router.routeInfo.search).verificationhash
    if (!(hash && typeof hash === 'string')) {
      router.push('/accueil')
    } else {
      verify(hash).then(() => setSuccess(true))
        .catch(() => {
          setError(true)
        })
    }
  }, [])
  

  return <IonPage>
      {success && <div className="text-xl p-6 font-semibold text-purple-base">Votre email a été validé avec succès</div>}
      {error && <div className="text-xl p-6 font-semibold text-red-600">le hash est invalide</div>}
    </IonPage>
}

export default VerifyEmail