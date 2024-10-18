import { IonIcon, IonItem, IonMenuToggle, useIonRouter } from "@ionic/react";
import { pizzaOutline } from 'ionicons/icons'
import { FC } from "react";

const Link: FC<{ content: string, link: string, icon?: string }> = ({ content, link, icon }) => {
  const router = useIonRouter()

  return (
    <IonMenuToggle className="flex w-full h-16 text-purple-base">
      <IonIcon className="h-full w-[12%]" icon={icon || pizzaOutline} />
      <IonItem color={'base'} lines="none" className="flex items-center w-full font-semibold font-['chancery'] text-xl text-inherit" onClick={() => router.push(link, 'forward', 'replace')} >{content}</IonItem>
    </IonMenuToggle>
  )
}

export default Link
