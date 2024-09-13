import { IonButton, IonContent, IonIcon, IonItem, IonPage } from "@ionic/react"
import { searchOutline } from "ionicons/icons"
import { FC, useEffect, useState } from "react"
import { useQRCodeScanner } from "../components/useQRCodeScanner"
import fetchApi from '../utils/axios'
import { QrCodeData } from "../types/qrcode"
import Modal from "../components/Modal"
import Ticket, { ITicket } from "../components/TIcket"
import { useMediaQuery } from "usehooks-ts"

const VoluntaryInteface: FC = () => {
  const isOnPhone = useMediaQuery('(max-width: 768px)')
  const [msg, setMsg] = useState<string>()
  const [isOpen, setIsOpen] = useState(false)
  const [qrcodeInfo, setQrcodeInfo] = useState<ITicket>()
  const { scan, error } = useQRCodeScanner(async(value) => {
    if (error) {
      setMsg(error)
      return
    }

    let rawValue = value[0].rawValue
    await fetchApi.post<QrCodeData>('/verify_ticket', { qrCode: rawValue })
      .then(({data}) => {
        setQrcodeInfo({...data, username: data.lastName})
      }).catch(() => {
        setMsg('invalid qrcode')
      })

    setIsOpen(true)
  })

  useEffect(() => {
    if (msg) {
      setIsOpen(true)
    }
  }, [msg])

  return (<IonPage>
    <Modal isOpen={isOpen}  toggle={setIsOpen} useBackdrop={true} onClose={() => setMsg(undefined)}>
      <div className='p-2 text-center'>
        {msg ? <p className='text-2xl text-red-600 font-bold h-full w-full p-4'>{msg}</p> :
          qrcodeInfo && <Ticket {...qrcodeInfo} />}
      </div>
    </Modal>
    <IonContent>
      <div>
      {isOnPhone &&
        <IonButton size="small" color='purple' className="w-[70px] h-[40px] flex mx-2 middle rounded-lg" onClick={scan}>
          <IonItem lines="none" color={'purple'} className="w-full h-auto text-white flex flex-col text-xs">
            <IonIcon className="h-full w-full text-white" icon={searchOutline} />
          </IonItem>
        </IonButton>
      }
      </div>
      <h1 className="text-center font-bold text-2xl md:mt-8">Bénévole</h1>
      <div className="flex flex-col items-center space-y-2 mt-10">
        <div className="button-voluntary">Planning</div>
        <div className="button-voluntary">Lire la charte bénévole</div>
        <div className="button-voluntary">Consulter le planning général</div>
        <div className="button-voluntary">Contacter l'orga</div>
      </div>
    </IonContent>
  </IonPage>)
}

export default VoluntaryInteface
