import { FC } from "react";
import MenuLink from './Link'
import { observer } from 'mobx-react'
import eventStore from "../../store/eventStore";

const Menu: FC = observer(() => {
  const data = eventStore.eventId
  const linkList = [{
    title: 'Terra Mimbusia',
    path: '/terra-mimbusia',
  },{
    title: 'Informations',
    path: `/event/${data}/informations`,
  },{
    title: 'Guildes',
    path: '/guilds',
  },{
    title: 'Paramètres',
    path: '/parameters',
  },{
    title: 'Billets',
    path: '/tickets',
  },{
    title: 'Animations',
    path: `/event/${data}/animations`,
  },{
    title: 'Carte Intéractive',
    path: '/interactive-map',
  },{
    title: 'Fiche de personnage',
    path: '/caracter-card',
  },{
    title: 'Espace bénévole',
    path: '/voluntary-interface'
  }]

  return (
    <nav>
      {linkList.map((link, index) => (
        <MenuLink key={index} link={link.path} content={link.title} />
      ))}
    </nav>
  )
})

export default Menu
