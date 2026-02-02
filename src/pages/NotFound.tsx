import { IonContent, IonPage } from "@ionic/react";
import { FC } from "react";

const NotFound: FC = () => {
  return (<IonPage className="middle">
      <p className="text-red-700 font-bold text-2xl">Cette ressource n'existe pas</p>
  </IonPage>)
}

export default NotFound