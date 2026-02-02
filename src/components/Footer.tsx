import { FC, PropsWithChildren } from "react";
import { personOutline } from 'ionicons/icons'
import IconButton from "./IconeButton";
import { IonFooter } from "@ionic/react";

const Footer: FC<PropsWithChildren> = () => {
  return (
    <IonFooter className="flex justify-center space-x-4 items-center bg-gray-500 h-16 w-full ">
      <IconButton icon={personOutline} />
      <IconButton icon={personOutline} />
      <IconButton icon={personOutline} />
      <IconButton icon={personOutline} />
    </IonFooter>
  )
}

export default Footer
