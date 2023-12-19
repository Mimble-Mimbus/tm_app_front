import { IonButton, IonIcon } from '@ionic/react'
import { FC, MouseEventHandler } from 'react'

const IconButton: FC<{ icon: string, onClick?: MouseEventHandler }> = ({ icon, onClick }) => (
  <IonButton onClick={onClick} color='purple' className="w-1/5 h-5/6 bg-purple-950 flex justify-center items-center rounded-lg">
    <IonIcon className="h-3/5 w-3/5 text-white" icon={icon} />
  </IonButton>
)

export default IconButton
