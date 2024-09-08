import { IonContent, IonHeader, IonPage } from "@ionic/react"
import { FC } from "react"

const Accueil: FC = () => {
  return (<IonPage>
    <div className="bg-gradiant h-full">
      <div className="p-[70px] stroke-yellow font-['chancery'] text-4xl text-center font-bold">
        Bienvenue sur <br /> MimbusApp
        </div>
        <div className="p-[20px] stroke-yellow font-['chancery'] text-2xl text-center font-bold tracking-tight leading-6">
        Scannez votre billet<br />pour commencer<br />l'aventure !
        </div>
        <img src="assets/img/qr_code_icon.png" alt="icone QR Code" />
    </div>
    </IonPage>)
}

export default Accueil
