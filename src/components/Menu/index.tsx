import { FC } from "react";
import MenuLink from './Link'
import { observer } from 'mobx-react'
import eventStore from "../../store/eventStore";
import authStore from "../../store/authStore";
import { map, albums, person, home, informationCircle, megaphone, people   } from "ionicons/icons";

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
      path: '/voluntary-interface',
      icon: people
    })
  }

  return (
    <nav className="bg-gradiant h-full w-full ion-padding">
      {linkList.map((link, index) => (
        <MenuLink key={index} link={link.path} content={link.title} icon={link.icon}/>
      ))}
    </nav>
  )
}

export default observer(Menu)
