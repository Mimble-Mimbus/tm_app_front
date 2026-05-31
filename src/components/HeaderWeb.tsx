import { IonHeader, IonItem, IonToolbar } from "@ionic/react";
import { observer } from "mobx-react";
import { FC, PropsWithChildren } from "react";
import eventStore from "../store/eventStore";
import authStore from "../store/authStore";
import { isDbAvailable } from "../utils";
import { albums, home, informationCircle, megaphone, people, person, personRemove, ticket } from "ionicons/icons";
import { map } from "leaflet";


const Link: FC<PropsWithChildren<{ path: string }>> = ({children, path}) => (
  <IonItem lines="none" className="text-secondary font-['centurygothic'] font-medium text-lg" color="purple" routerLink={path}>{children}</IonItem>
)


const HeaderWeb: FC = observer(() => {
  const id = eventStore.eventId
  const { isLogged } = authStore
  const linkList = [{
      title: 'Terra Mimbusia',
      path: '/terra-mimbusia',
      icon: home
    }, {
      title: 'Mimble Mimbus',
      path: '/mimble-mimbus'
    }, {
      title: 'Programme',
      path: '/program'
    }, {
      title: 'Informations',
      path: `/event/${id}/informations`,
      icon: informationCircle
    }, {
      title: 'Billets',
      path: '/tickets',
      icon: albums
    }, {
      title: 'Animations',
      path: `/event/${id}/animations`,
      icon: megaphone
    }, {
      title: 'Carte',
      path: `/event/${id}/interactive-map`,
      icon: map
    }]
    const accountLink = {
      title: isLogged ? 'Mon compte' : 'Connexion',
      path: isLogged ? '/account' : '/login',
      icon: person
    }
    if (authStore.isLogged) {
      linkList.push({
        title: 'Espace bénévole',
        path: `/event/${id}/voluntary-interface`,
        icon: people
      })
    }
  
  return (
    <IonHeader>
      <IonToolbar className="bg-aura">
        <div className=" text-purple-base font-['chancery'] flex items-center font-bold w-full justify-center text-4xl h-[15vh]">
          <h1 className="border border-purple-base rounded-lg py-3 px-5"> Terra Mimbusia</h1> 
        </div>
        <nav className="flex justify-around">
          <div className="flex">
            {linkList.map(link => (<Link  key={link.path} path={link.path}> {link.title} </Link>))}
          </div>
          <Link path={accountLink.path}>{accountLink.title}</Link>
        </nav>
      </IonToolbar>
    </IonHeader>
  )
})

export default HeaderWeb
