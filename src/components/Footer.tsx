import { FC, PropsWithChildren } from "react";
import { personOutline } from 'ionicons/icons'
import IconButton from "./IconeButton";
import { IonFooter } from "@ionic/react";

const Footer: FC<PropsWithChildren> = () => {
  return (
    <div className="flex content-between h-16 w-full bg-page-base relative">
              <img src="src/assets/img/castle_footer.png"  className="absolute bottom-10 w-4/5 right-0" alt="" />

        <button className="stroke-yellow font-bold align-bottom mx-auto font-['chancery'] text-xl" >
          Programme
        </button>
        <button className="stroke-yellow font-bold align-bottom mx-auto font-['chancery'] text-xl" >
          Plan
        </button>
        <button className="stroke-yellow font-bold align-bottom mx-auto font-['chancery'] text-xl" >
          Ma visite
        </button>
    </div>
  )
}

export default Footer
