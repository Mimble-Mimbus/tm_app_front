import { IonApp, IonContent, IonFooter, IonHeader, IonImg, IonItem, IonMenu, IonPage, setupIonicReact } from '@ionic/react';

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

setupIonicReact();

const menuId = "navMenu"
const App: React.FC = () => {
  const isOnPhone = useMediaQuery('(max-width: 768px)')
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
          {isOnPhone ? <HeaderMobile /> : <HeaderWeb />}
          <IonContent>
            <Router />
          </IonContent>
          {isOnPhone && <Footer />}
        </IonPage>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
