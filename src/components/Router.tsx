import { IonRouterOutlet } from "@ionic/react";
import { FC } from "react";
import { router } from '../router'
import { Route } from "react-router";
import { isMobile } from "../util";

import pages from '../pages'

const Router: FC = () => {
  return (
    <IonRouterOutlet>
      {router.filter(route => isMobile ? (route.type !== 'web') : (route.type !== 'app') ).map((route, index) => (
        <Route key={index} component={pages[route.pageName]} path={route.path} />
      ))}
    </IonRouterOutlet>
  )
}

export default Router
