import { IonButton, IonHeader, IonIcon, IonItem, IonToolbar, useIonRouter } from "@ionic/react";
import { personOutline, searchOutline } from "ionicons/icons";
import { menuController } from '@ionic/core/components'
import { FC, useEffect } from "react";

const HeaderMobile: FC<{scan: () => Promise<void>}> = ({ scan }) => {
  return (
  <IonHeader color='grey'>
    <IonToolbar color='grey'>
      <IonButton slot="start" className="ml-6 w-[13%]" color="purple" onClick={() => menuController.open('navMenuControl')}>
        <IonIcon className="py-1" icon={personOutline} />
      </IonButton>
      <IonButton size="small" slot={'end'} color='purple' className="w-[70px] h-[40px] flex mx-2 middle rounded-lg" onClick={scan}>
        <IonItem lines="none" color={'purple'} className="w-full h-auto text-white flex flex-col text-xs">
          <IonIcon className="h-full w-full text-white" icon={searchOutline} />
        </IonItem>
      </IonButton>
    </IonToolbar>
  </IonHeader>
)}

export default HeaderMobile
