import { IonIcon, IonItem, IonMenuToggle, useIonRouter } from "@ionic/react";
import { pizzaOutline } from 'ionicons/icons'
import { FC } from "react";

const Link: FC<{ content: string, link: string }> = ({ content, link }) => {
  const router = useIonRouter()

  return (
    <IonMenuToggle className="flex w-full h-16 text-white">
      <IonIcon className="h-full w-[12%]" icon={pizzaOutline} />
      <IonItem lines="none" color='purple' className="flex items-center w-full text-white" onClick={() => router.push(link, 'forward', 'replace')} >{content}</IonItem>
    </IonMenuToggle>
  )
}

export default Link
