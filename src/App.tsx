import { IonApp, IonButton, IonContent, IonHeader, IonIcon, IonImg, IonMenu, IonModal, IonPage, IonToolbar, setupIonicReact } from '@ionic/react';

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
import 'swiper/swiper-bundle.css'

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
import { closeOutline } from 'ionicons/icons';
import eventStore from './store/eventStore';
import authStore from './store/authStore';
import errorStore from './store/errorStore';
import fetchApi from './utils/axios'
import {  ApiBaseEvent } from './types/event';
import { initializeEvent, repo } from  './storage/database';
import { Event } from './storage/entity/Event';
import { isDbAvailable } from './utils';

setupIonicReact();

const menuId = "navMenu"

const App: FC = () => {
  const isOnPhone = useMediaQuery('(max-width: 768px)')

  const { scan, error } = useQRCodeScanner((value) => {
    console.log(value)
  })
  const [isOpen, setIsopen] = useState(false)
  const [isLoading, setIsloading] = useState(true)
  
  async function scanQrcode () {
    if (error) {
      setIsopen(true)
    } else {
      await scan()
    }
  }

  useEffect(() => {
    if (error) {
      setIsopen(true)
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
          <IonContent className="ion-padding">
            <Menu />
          </IonContent>
        </IonMenu>
        <IonPage id={menuId}>
           {isOnPhone ? <HeaderMobile scan={scanQrcode} /> : <HeaderWeb />}
          <IonContent> 
            {!isLoading && <Router />}
          </IonContent>
          <IonModal isOpen={isOpen}>
            <IonHeader>
              <IonToolbar>
              <IonButton color={'white'} onClick={() => setIsopen(false)}>
                <IonIcon icon={closeOutline} />
              </IonButton>
              </IonToolbar>
            </IonHeader>
            <IonContent class='middle'>
              {error && <p className='text-xl text-red-600 font-bold h-full w-full'>{error}</p>}
            </IonContent>
          </IonModal>
          {isOnPhone && <Footer />}
        </IonPage>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
