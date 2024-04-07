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
import { useApi } from './hook/useApi';
import authStore from './store/authStore';
import { Event } from './types/event';
import errorStore from './store/errorStore';

setupIonicReact();

const menuId = "navMenu"

const App: FC = () => {
  const isOnPhone = useMediaQuery('(max-width: 768px)')

  useApi<Event>('/random_event', (value => {
    eventStore.setEventid(value.id)
    eventStore.setRpgZoneId(value.rpgZone.id)
  }))

  const { scan, error } = useQRCodeScanner((value) => {
    console.log(value)
  })
  const [isOpen, setIsopen] = useState(false)
  
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
    authStore.initialize()
    errorStore.initialise()
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
          {isOnPhone ? <HeaderMobile scan={scanQrcode} /> : <HeaderWeb />}
          <IonContent>
            <Router />
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
