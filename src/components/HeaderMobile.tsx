import { IonHeader, IonIcon } from "@ionic/react";
import { menuController } from '@ionic/core/components'
import { FC } from "react";
import { qrCode } from 'ionicons/icons'

import ornamentSrc from '../assets/img/ornament.png'
import ornamentMirrorSrc from '../assets/img/ornament-mirror.png'
import burgerFoldSrc from '../assets/img/burger_fold_icon.png'

const HeaderMobile: FC<{ scan: () => Promise<void> }> = ({ scan }) => {
  return (
    <IonHeader className="middle h-fit relative z-20 bg-white">
      <img src={ornamentSrc} className="absolute w-1/3 left-1 top-1 pointer-events-none" alt="" />
      <img src={ornamentMirrorSrc} className="absolute w-1/3 right-1 top-1 pointer-events-none" alt="" />
      <div className="flex justify-between items-end w-full px-5 py-2 mb-0">
        <button className="font-bold stroke-yellow w-1/4 align-bottom mx-auto text-center font-['chancery'] text-xl" onClick={() => menuController.open('navMenuControl')}>
          <img src={burgerFoldSrc} alt="menu" className="mx-auto" />
          Menu
        </button>
          <div className="flex flex-col justify-center w-2/4">
            <div className="text-center relative top-[14px]">
              <span className="stroke-yellow font-['solander'] text-6xl uppercase font-bold">
                <span className="text-7xl">T</span>erra
              </span>
            </div>
            <div className="text-center">
              <span className="text-black text-2xl font-['pala'] uppercase tracking-wide">Mimbusia</span>
            </div>
          </div>
        <button onClick={scan} className="font-bold stroke-yellow w-1/4 mx-auto text-center font-['chancery'] text-xl flex flex-col">
          {/* <img src="src/assets/img/profile_icon.png" alt="profil" className="mx-auto" /> */}
          <IonIcon icon={qrCode} color='purple' className="w-8 h-8 text-purple-base" />
          scan
        </button>
      </div>
    </IonHeader>
  );
}

export default HeaderMobile
