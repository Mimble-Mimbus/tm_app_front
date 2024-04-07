import { IonButton, IonIcon, IonItem } from '@ionic/react'
import { FC, MouseEventHandler } from 'react'
import { RouteName } from '../router'

const IconButton: FC<{ icon: string, onClick?: MouseEventHandler<HTMLIonButtonElement>, link?: RouteName, slot?: string }> = ({ icon, onClick, link, slot }) => (
    <IonButton slot={slot} onClick={onClick} color='purple' className="w-[85px] h-14 flex mx-2 middle rounded-lg" routerLink={link}>
      <IonIcon className="w-3/5 text-white text-2xl" icon={icon} />
    </IonButton>
)

export default IconButton
