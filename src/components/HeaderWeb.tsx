import { IonContent, IonHeader, IonItem, IonToolbar } from "@ionic/react";
import { FC, PropsWithChildren } from "react";


const Link: FC<PropsWithChildren<{ path: string }>> = ({children, path}) => (
  <IonItem lines="none" className="text-secondary font-sans font-medium" color="purple" routerLink={path}>{children}</IonItem>
)


const HeaderWeb: FC = () => {
  return (
    <IonHeader>
      <IonToolbar color="purple">
        <h1 className="text-secondary flex items-center font-bold w-full justify-center text-4xl h-[15vh]"> Terra Mimbusia </h1>
        <nav className="flex justify-around">
          <div className="flex">
            <Link path="/program"> Programmes </Link>
            <Link path="/mimble-mimbus"> mimble mimbus </Link>
            <Link path="/informations"> Informations pratiques </Link>
          </div>
          <Link path="/account">Mon compte</Link>
        </nav>
      </IonToolbar>
    </IonHeader>
  )
}

export default HeaderWeb