export type PageType = "all" | "app" | "web"

interface RouteData {
  readonly path: string
  readonly pageName :string
  readonly type?: PageType
}

// @ts-ignore
export const router = [{
    path: '/animation-creation',
    pageName: 'AnimationCreation',
    type: 'all',
  }, {
    path: '/animation/:id',
    pageName: "Animation",
    type: 'all',
  }, {
    path: '/quest',
    pageName: "Quest",
    type: 'all',
  }, {
    path: '/accueil',
    pageName: "Accueil",
    type: 'app',
  }, {
    path: '/informations',
    pageName: "Informations",
    type: 'all',
  }, {
    path: '/QRCode',
    pageName: "QRCode",
    type: "app",
  }, {
    path: '/mimble-mibus',
    pageName: "MimbleMimbus",
    type: 'app',
  }, {
    path: '/account',
    pageName: "Account",
    type: 'all',
  }, {
    path: '/animations',
    pageName: "ListAnimations",
    type: 'all',
  }, {
    path: '/caracter-card',
    pageName: "CaracterCard",
    type: 'all',
  }, {
    path: '/voluntary-interface',
    pageName: "VoluntaryInterface",
    type: 'web',
  }, {
    path: '/interactive-map',
    pageName: "InteractiveMap",
    type: "all",
  }
] as const satisfies RouteData[]