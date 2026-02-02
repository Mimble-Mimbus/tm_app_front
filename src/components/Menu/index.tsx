import { FC } from "react";
import MenuLink from './Link'
import { observer } from 'mobx-react'
import eventStore from "../../store/eventStore";
import authStore from "../../store/authStore";

const Menu: FC = () => {
  const data = eventStore.eventId
  const { isLogged } = authStore
  const linkList = [{
    title: 'Terra Mimbusia',
    path: '/terra-mimbusia',
  }, {
    title: 'Informations',
    path: `/event/${data}/informations`,
  }, {
    title: 'Guildes',
    path: '/guilds',
  }, {
    title: 'Paramètres',
    path: '/parameters',
  }, {
    title: 'Billets',
    path: '/tickets',
  }, {
    title: 'Animations',
    path: `/event/${data}/animations`,
  }, {
    title: 'Quêtes',
    path: `/event/${data}/quests`
  }, {
    title: 'Carte Intéractive',
    path: '/interactive-map',
  }, {
    title: 'Fiche de personnage',
    path: '/caracter-card',
  }, {
    title: 'Espace bénévole',
    path: `/event/${data}/voluntary-interface`
  }, {
    title: isLogged ? 'Mon compte' : 'Connexion',
    path: isLogged ? '/account' : '/login'
  }]

  return (
    <nav>
      {linkList.map((link, index) => (
        <MenuLink key={index} link={link.path} content={link.title} />
      ))}
    </nav>
  )
}

export default observer(Menu)
