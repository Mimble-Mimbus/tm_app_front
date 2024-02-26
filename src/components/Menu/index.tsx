import { FC } from "react";
import MenuLink from './Link'

const Menu: FC = () => {
  const linkList = [{
    title: 'Terra Mimbusia',
    path: '/terra-mimbusia',
  },{
    title: 'Informations',
    path: '/informations',
  },{
    title: 'Guildes',
    path: '/guilds',
  },{
    title: 'Paramètres',
    path: '/parameters',
  },{
    title: 'Billets',
    path: '/tickets',
  }, {
    title: 'Billets2',
    path: '/tickets2'
  }
  ,{
    title: 'Animations',
    path: '/animations',
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
}

export default Menu
