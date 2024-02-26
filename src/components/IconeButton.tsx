import { IonButton, IonIcon, IonItem } from '@ionic/react'
import { FC, MouseEventHandler } from 'react'
import { RouteName } from '../router'

const IconButton: FC<{ icon: string, onClick?: MouseEventHandler, link?: RouteName, slot?: string }> = ({ icon, onClick, link, slot }) => (
    <IonButton slot={slot} onClick={onClick} color='purple' className="w-[85px] h-5/6 flex mx-2 middle rounded-lg" routerLink={link}>
      <IonIcon className="h-3/5 w-3/5 text-white" icon={icon} />
    </IonButton>
)

export default IconButton
