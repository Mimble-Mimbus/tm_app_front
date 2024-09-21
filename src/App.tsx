import { IonApp, IonContent, IonHeader, IonImg, IonMenu, IonPage, setupIonicReact } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Router from './components/Router';
import { IonReactRouter } from '@ionic/react-router';
import Menu from './components/Menu';
import Footer from './components/Footer';
import HeaderMobile from './components/HeaderMobile';
import HeaderWeb from './components/HeaderWeb';
import imgUrl from './assets/img/dishonored.jpg'
import { useMediaQuery } from 'usehooks-ts';
import { useQRCodeScanner } from './components/useQRCodeScanner';
import { FC, useEffect, useState } from 'react';
import eventStore from './store/eventStore';
import authStore from './store/authStore';
import errorStore from './store/errorStore';
import fetchApi from './utils/axios'
import { ApiBaseEvent } from './types/event';
import { initializeEvent, registerTicket, repo } from  './storage/database';
import { Event } from './storage/entity/Event';
import { isDbAvailable } from './utils';
import { QrCodeData } from './types/qrcode';
import Modal from './components/Modal';

setupIonicReact();

const menuId = "navMenu"

const App: FC = () => {
  const isOnPhone = useMediaQuery('(max-width: 768px)')
  const [msg, setMsg] = useState<string>()
  const { scan, error } = useQRCodeScanner(async(value) => {
    if (error) {
      setMsg(error)
      return
    }

    let rawValue = value[0].rawValue
    await fetchApi.post<QrCodeData>('/verify_ticket', { qrCode: rawValue })
      .then((res) => {
        return registerTicket(res.data).then(() => setMsg('ticket enregistré avec succès'))
      })
  })

  const [isOpen, setIsopen] = useState(false)
  const [isLoading, setIsloading] = useState(true)
  
  async function scanQrcode () {
    if (msg) {
      setIsopen(true)
    } else {
      await scan()
    }
  }

  useEffect(() => {
    if (msg) {
      setIsopen(true)
    }
  }, [msg])

  useEffect(() => {
    if (error) {
      setMsg(error)
    }
  }, [error])

  useEffect(() => {
    (async() => {
      authStore.initialize()
      errorStore.initialise()
      await fetchApi.get<ApiBaseEvent>(`/next_event`).then(async({ data }) => {
        if (isDbAvailable()) {
          const event = await repo(Event).findOneBy({ id: data.id })
          if (!event) {
            await initializeEvent(data)
          }
        }
        eventStore.setEventid(data.id)
        eventStore.setRpgZoneId(data.rpgZones[0].id)
      }).finally(() => setIsloading(false))
    })()
  }, [])

  return (
    <IonApp>
      <IonReactRouter>
        <IonMenu contentId={menuId} menuId="navMenuControl">
          <IonHeader>
            <IonImg src={imgUrl} alt="dishonored" />
          </IonHeader>
          <IonContent color={"purple"} className="ion-padding">
            <Menu />
          </IonContent>
        </IonMenu>
        <IonPage id={menuId}>
          <Modal isOpen={isOpen} timeout={2000} toggle={setIsopen} useBackdrop={true} onClose={() => setMsg(undefined)}>
            <div className='p-12 text-center'>
                {error && msg ? <p className='text-xl text-red-600 font-bold h-full w-full'>{msg}</p> :
                                <p className='text-xl text-green-600 font-bold h-full w-full'>{msg}</p>}
            </div>
          </Modal>
           {isOnPhone ? <HeaderMobile scan={scanQrcode} /> : <HeaderWeb />}
          <IonContent> 
            {!isLoading && <Router />}
          </IonContent>
          {isOnPhone && <Footer />}
        </IonPage>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
