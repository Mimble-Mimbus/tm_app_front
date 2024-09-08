import { IonButton, IonHeader, IonIcon, IonItem, IonToolbar, useIonRouter } from "@ionic/react";
import { personOutline, searchOutline } from "ionicons/icons";
import { menuController } from '@ionic/core/components'
import { FC, useEffect } from "react";

const HeaderMobile: FC<{ scan: () => Promise<void> }> = ({ scan }) => {
  return (
    <IonHeader color="base" className="bg-base middle h-fit">
      <IonToolbar color={'base'} className="bg-base">
        <IonButton slot="start" className="ml-6 w-[13%]" color="purple" onClick={() => menuController.open('navMenuControl')}>
          Menu
        </IonButton>
        <IonItem lines="none" color={'base'}>
          <div className="flex flex-col">
            <div className="text-center">
              <span className="stroke-yellow font-['solander'] text-4xl uppercase font-bold">
                <span className="text-5xl">T</span>erra
              </span>
            </div>
            <div className="relative bottom-[14px]">
              <span className="text-black text-xl font-['pala'] uppercase tracking-wide">Mimbusia</span>
            </div>
          </div>
        </IonItem>
        <IonButton size="small" slot={'end'} color='purple' className="w-[70px] h-[40px] flex mx-2 middle rounded-lg" onClick={scan}>
          <IonItem lines="none" color={'purple'} className="w-full h-auto text-white flex flex-col text-xs">
            <IonIcon className="h-full w-full text-white" icon={searchOutline} />
          </IonItem>
        </IonButton>
      </IonToolbar>
    </IonHeader>
  );
}

export default HeaderMobile
