import { IonHeader, IonItem, IonToolbar } from "@ionic/react";
import { observer } from "mobx-react";
import { FC, PropsWithChildren } from "react";
import eventStore from "../store/eventStore";


const Link: FC<PropsWithChildren<{ path: string }>> = ({children, path}) => (
  <IonItem lines="none" className="text-secondary font-['centurygothic'] font-medium text-lg" color="purple" routerLink={path}>{children}</IonItem>
)


const HeaderWeb: FC = observer(() => {
  const id = eventStore.eventId
  return (
    <IonHeader>
      <IonToolbar className="bg-aura">
        <div className=" text-purple-base font-['chancery'] flex items-center font-bold w-full justify-center text-4xl h-[15vh]">
          <h1 className="border border-purple-base rounded-lg py-3 px-5"> Terra Mimbusia</h1> 
        </div>
        <nav className="flex justify-around">
          <div className="flex">
            <Link path="/program"> Programme </Link>
            <Link path="/mimble-mimbus"> mimble mimbus </Link>
            <Link path={`/event/${id}/informations`}> Informations pratiques </Link>
          </div>
          <Link path="/account">Mon compte</Link>
        </nav>
      </IonToolbar>
    </IonHeader>
  )
})

export default HeaderWeb
