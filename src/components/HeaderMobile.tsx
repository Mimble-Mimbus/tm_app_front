import { IonButton, IonHeader, IonIcon, IonText, IonToolbar } from "@ionic/react";
import { personOutline } from "ionicons/icons";
import { menuController } from '@ionic/core/components'
import { FC } from "react";

const HeaderMobile: FC = () => (
  <IonHeader color='grey'>
    <IonToolbar color='grey'>
      <IonButton className="ml-6" color="purple" onClick={() => menuController.open('navMenuControl')}>
        <IonIcon icon={personOutline} />
      </IonButton>
    </IonToolbar>
  </IonHeader>
)

export default HeaderMobile
