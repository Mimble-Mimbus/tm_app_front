import { IonRouterOutlet } from "@ionic/react";
import { FC } from "react";
import { RouteData, router } from '../router'
import { Redirect, Route, RouterProps } from "react-router";

import pages from '../pages'
import { useMediaQuery } from "usehooks-ts";
import authStore from "../store/authStore";

const Router: FC = () => {
  const isOnPhone = useMediaQuery('(max-width: 768px)')
  function render (props: RouterProps, Component: any, routeInfo: RouteData) {
    if (routeInfo.auth && !authStore.isLogged) {
      return <Redirect from={props.history.location.pathname} to='/login'/>
    }
    return <Component {...props} />
  }
  return (
    <IonRouterOutlet>
      {router.filter(route => isOnPhone ? (route.type !== 'web') : (route.type !== 'app') ).map((route, index) => (
        <Route key={index}  path={route.path} render={(props) => render(props, pages[route.pageName], route)} />
      ))}
    </IonRouterOutlet>
  )
}

export default Router
