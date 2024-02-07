import { IonButton, IonHeader, IonIcon, IonItem, IonToolbar } from "@ionic/react";
import { personOutline, searchOutline } from "ionicons/icons";
import { menuController } from '@ionic/core/components'
import { FC } from "react";
import IconButton from "./IconeButton";

const HeaderMobile: FC = () => (
  <IonHeader color='grey'>
    <IonToolbar color='grey'>
      <IonButton slot="start" className="ml-6" color="purple" onClick={() => menuController.open('navMenuControl')}>
        <IonIcon icon={personOutline} />
      </IonButton>
      <IconButton slot="end" icon={searchOutline} link={'/QRCode'} />
    </IonToolbar>
  </IonHeader>
)

export default HeaderMobile
