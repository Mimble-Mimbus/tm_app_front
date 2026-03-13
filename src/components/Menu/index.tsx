import { FC } from "react";
import MenuLink from './Link'
import { observer } from 'mobx-react'
import eventStore from "../../store/eventStore";
import authStore from "../../store/authStore";
import { map, albums, person, home, informationCircle, megaphone, people   } from "ionicons/icons";
import { isDbAvailable } from "../../utils";

const Menu: FC = () => {
  const data = eventStore.eventId
  const { isLogged } = authStore
  const linkList = [{
    title: 'Terra Mimbusia',
    path: '/terra-mimbusia',
    icon: home
  }, {
    title: 'Informations',
    path: `/event/${data}/informations`,
    icon: informationCircle
  }, {
    title: 'Billets',
    path: '/tickets',
    icon: albums
  }, {
    title: 'Animations',
    path: `/event/${data}/animations`,
    icon: megaphone
  }, {
    title: 'Carte',
    path: `/event/${data}/interactive-map`,
    icon: map
  }, {
    title: isLogged ? 'Mon compte' : 'Connexion',
    path: isLogged ? '/account' : '/login',
    icon: person
  }]

  if (authStore.isLogged) {
    linkList.push({
      title: 'Espace bénévole',
      path: `/event/${data}/voluntary-interface`,
      icon: people
    })
  }

  if (isDbAvailable()) {
    linkList.push( {
      title: 'Billets',
      path: '/tickets',
      icon: albums
    })
  } 

  return (
    <nav className="h-full w-full ion-padding">
      {linkList.map((link, index) => (
        <div className="borderhover ion-activatable" key={index}>
          <MenuLink link={link.path} content={link.title} icon={link.icon}/>
        </div>
      ))}
    </nav>
  )
}

export default observer(Menu)
