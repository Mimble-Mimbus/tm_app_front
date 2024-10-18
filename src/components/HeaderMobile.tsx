import { IonHeader } from "@ionic/react";
import { menuController } from '@ionic/core/components'
import { FC } from "react";

const HeaderMobile: FC<{ scan: () => Promise<void> }> = ({ scan }) => {
  return (
    <IonHeader className="middle h-fit relative">
      <img src="src/assets/img/ornament.png" className="absolute w-1/3 left-1 top-1 pointer-events-none" alt="" />
      <img src="src/assets/img/ornament-mirror.png" className="absolute w-1/3 right-1 top-1 pointer-events-none" alt="" />
      <div className="flex justify-between items-end w-full px-5 py-2 mb-0">
        <button className="font-bold stroke-yellow w-1/4 align-bottom mx-auto text-center font-['chancery'] text-xl" onClick={() => menuController.open('navMenuControl')}>
          <img src="src/assets/img/burger_fold_icon.png" alt="menu" className="mx-auto" />
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
        <button className="font-bold stroke-yellow w-1/4 align-baseline mx-auto text-center font-['chancery'] text-xl" onClick={() => menuController.open('navMenuControl')}>
          <img src="src/assets/img/profile_icon.png" alt="profil" className="mx-auto" />
          Profil
        </button>
      </div>
    </IonHeader>
  );
}

export default HeaderMobile
