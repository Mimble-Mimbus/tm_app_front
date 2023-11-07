import { IonApp, IonButtons, IonHeader, IonMenuButton, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';

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
import Menu from './components/Menu';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router';
import Footer from './components/Footer';

setupIonicReact();

const menuId = "test"

const App: React.FC = () => (
  <IonApp>
    <Menu id={menuId} />
    <IonHeader>
      <IonToolbar>
        <IonButtons>
          test
          <IonMenuButton />
        </IonButtons>
        <IonTitle>Menu</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/tabs" component={Router} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
