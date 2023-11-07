export type PageType = "all" | "app" | "web"

interface RouteData {
  path: string
  componentPath: string
  type?: PageType
}

export const router: RouteData[] = [{
    path: '/animation-creation',
    componentPath: '../pages/AnimationCreation.tsx',
    type: 'all',
  }, {
    path: '/animation/:id',
    componentPath: "../pages/Animation.tsx",
    type: 'all',
  }, {
    path: '/quest',
    componentPath: "../pages/Quest.tsx",
    type: 'all',
  }, {
    path: '/accueil',
    componentPath: "../pages/Accueil.tsx",
    type: 'app',
  }, {
    path: '/informations',
    componentPath: "../pages/Informations.tsx",
    type: 'all',
  }, {
    path: '/QRCode',
    componentPath: "../pages/QRCode.tsx",
    type: "app",
  }, {
    path: '/mimble-mibus',
    componentPath: "../pages/MimbleMimbus.tsx",
    type: 'app',
  }, {
    path: '/account',
    componentPath: "../pages/Account.tsx",
    type: 'all',
  }, {
    path: '/animations',
    componentPath: "../pages/ListAnimations.tsx",
    type: 'all',
  }, {
    path: '/caracter-card',
    componentPath: "../pages/CaracterCard.tsx",
    type: 'all',
  }, {
    path: '/voluntary-interface',
    componentPath: "../pages/VoluntaryInterface.tsx",
    type: 'web',
  }, {
    path: '/interactive-map',
    componentPath: "../pages/InteractiveMap.tsx",
    type: "all",
  }
]