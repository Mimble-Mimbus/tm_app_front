import { IonPage } from "@ionic/react"
import { FC } from "react"

const Accueil: FC = () => {
  return (<IonPage>
    <div className="bg-gradiant h-full">
      <div className="p-[70px] pb-4 stroke-yellow font-['chancery'] text-4xl text-center font-bold">
        Bienvenue sur <br /> MimbusApp
        </div>
        <div className="p-[20px] pb-1 stroke-yellow font-['chancery'] text-2xl text-center font-bold tracking-tight leading-6">
        Scannez votre billet<br />pour commencer<br />l'aventure !
        <img className="qr-icon mx-auto" src="src/assets/img/qr_code_icon.png" alt="icone QR Code" />
        </div>
    </div>
    </IonPage>)
}

export default Accueil
