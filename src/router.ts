import { RouteComponentProps } from 'react-router'

export type PageType = "all" | "app" | "web"

interface RouteData {
  readonly path: string
  readonly pageName :string
  readonly type?: PageType
}

// @ts-ignore
export const router = [{
    path: '/event/:idevent/animation-creation',
    pageName: 'AnimationCreation',
    type: 'all',
  }, {
    path: 'event/:idevent/animation/:id',
    pageName: "Animation",
    type: 'all',
  }, {
    path: '/event/:idevent/quest',
    pageName: "Quest",
    type: 'all',
  }, {
    path: '/accueil',
    pageName: "Accueil",
    type: 'app',
  }, {
    path: '/event/:idevent/informations',
    pageName: "Informations",
    type: 'all',
  }, {
    path: ':/QRCode',
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
    path: '/event/:idevent/animations',
    pageName: "ListAnimations",
    type: 'all',
  }, {
    path: '/event/:idevent/caracter-card',
    pageName: "CaracterCard",
    type: 'all',
  }, {
    path: '/event/:idevent/voluntary-interface',
    pageName: "VoluntaryInterface",
    type: 'web',
  }, {
    path: '/event/:idevent/interactive-map',
    pageName: "InteractiveMap",
    type: "all",
  }
] as const satisfies RouteData[]

export interface EventParams<T extends Record<string, any> = {}> extends RouteComponentProps<T & { idevent: string }> {}
export interface IdParams <T extends Record<string, any> = {}> extends RouteComponentProps<T & { id: string }> {}
export interface EventAndIdParams <T extends Record<string, any> = {}> extends RouteComponentProps<T & { id: string, idevent: string }> {}
