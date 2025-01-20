import { IonRouterOutlet } from "@ionic/react";
import { FC } from "react";
import { RouteData, router } from '../router'
import { Redirect, Route, RouterProps, Switch } from "react-router";

import pages from '../pages'
import { useMediaQuery } from "usehooks-ts";
import authStore from "../store/authStore";
import errorStore from "../store/errorStore";

const Router: FC = () => {
  const isOnPhone = useMediaQuery('(max-width: 768px)')

  function isActive (route: RouteData) {
    return 'isActivated' in route ? (route.isActivated !== false) : true
  }

  function render (props: RouterProps, Component: any, routeInfo: RouteData) {
    if (routeInfo.auth && !authStore.isLogged) {
      return <Redirect from={props.history.location.pathname} to='/login'/>
    }
    errorStore.clear()
    return  <>
      <Component {...props} />
    </>
  }
  return (
    <IonRouterOutlet className="z-20">
      <Switch>
        {router.filter(route => isActive(route) && (isOnPhone ? (route.type !== 'web') : (route.type !== 'app')) ).map((route, index) => (
          <Route  key={index }exact path={route.path} render={(props) => render(props, pages[route.pageName], route)} />
        ))}
      </Switch>
    </IonRouterOutlet>
  )
}

export default Router
