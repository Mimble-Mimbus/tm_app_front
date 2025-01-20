import { IonImg, IonPage } from "@ionic/react"
import { FC } from "react"

import welcomeSrc from '../assets/img/bienvenue.png'
import qrcodeIconSrc from '../assets/img/qr_code_icon.png'
import { useMediaQuery } from "usehooks-ts"

const Accueil: FC = () => {
  const isOnPhone = useMediaQuery('(max-width: 768px)')
  return (<IonPage>
    <div className="h-full">
        <div className="p-[70px] pb-4 stroke-yellow font-['chancery'] text-4xl text-center font-bold">
          <IonImg src={welcomeSrc} className="h-[225px]" />
          {/* Bienvenue sur <br /> MimbusApp */}
        </div>
         {isOnPhone && <div>
          <div className="p-[20px] pb-1 stroke-yellow font-['chancery'] text-2xl text-center font-bold tracking-tight leading-6">
          Scannez votre billet<br />pour commencer<br />l'aventure !
          <IonImg className="mx-auto w-[40%] max-w-[200px]" src={qrcodeIconSrc} alt="icone QR Code" />
          </div>
        </div>}
    </div>
    </IonPage>)
}

export default Accueil
