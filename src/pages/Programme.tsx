import { IonContent, IonPage } from "@ionic/react";
import { FC } from "react";

const Programme: FC = () => {
  return (<IonPage className="middle">
      <h1>Voici le programme du Weekend</h1>
      <img src="../assets/img/dishonored.jpg" alt="Programme de la journée du Samedi"></img>
      <img  src="../assets/img/dishonored.jpg" alt="Programme de la journée du Dimanche"></img>
  </IonPage>)
}

export default Programme