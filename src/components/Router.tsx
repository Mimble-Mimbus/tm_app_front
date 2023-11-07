import { IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { FC, Suspense, lazy } from "react";
import { router } from '../router'
import { Route } from "react-router";
import { personOutline } from 'ionicons/icons'
import Menu from "./Menu";

const Router: FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Suspense fallback={'...loading'}>
          {router.map((route, index) => (
            <Route key={index} path={"/tabs" + route.path} component={lazy(() => import(route.componentPath))} exact={true} />
          ))}
        </Suspense>
      </IonRouterOutlet>
      <IonTabBar className="h-16" color={"medium"} slot="bottom">
        <IonTabButton>
          <div className="w-16 h-16 bg-purple-900">
            <IonIcon className="h-3/4 w-3/4 text-white" icon={personOutline} />
          </div>
        </IonTabButton>
        <IonTabButton>
          <div className="w-16 h-16 bg-purple-900">
            <IonIcon className="h-3/4 w-3/4 text-white" icon={personOutline} />
          </div>
        </IonTabButton>
        <IonTabButton>
          <div className="w-16 h-16 bg-purple-900">
            <IonIcon className="h-3/4 w-3/4 text-white" icon={personOutline} />
          </div>
        </IonTabButton>
        <IonTabButton>
          <div className="w-16 h-16 bg-purple-900">
            <IonIcon className="h-3/4 w-3/4 text-white" icon={personOutline} />
          </div>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default Router