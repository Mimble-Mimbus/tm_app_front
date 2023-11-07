import { FC } from "react";
import MenuLink from './Link'
import { IonContent, IonHeader, IonMenu, IonTitle, IonToolbar } from "@ionic/react";

const Menu: FC<{ id: string}> = ({ id }) => {
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
  },{
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
    path: '/Voluntary-interface'
  }]

  return (
    <IonMenu>
      <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">This is the menu content.</IonContent>
      {/* {linkList.map((link, index) => (
        <MenuLink key={index} link={link.path} content={link.title} />
      ))} */}
    </IonMenu>
  )
}

export default Menu