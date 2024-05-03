import { RouteComponentProps } from 'react-router'

export type PageType = "all" | "app" | "web"

export interface RouteData {
  readonly path: string
  readonly pageName :string
  readonly type?: PageType
  readonly auth?: boolean
}

//@ts-ignore
export const router = [{
    path: '/event/:idevent/animation-creation',
    pageName: 'AnimationCreation',
    type: 'all',
    auth: true
  }, {
    path: '/event/:idevent/activity/:type/:id',
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
  }, {
    path: '/tickets',
    pageName: 'Tickets',
    type: 'app'
  }, {
    path: '/login',
    pageName: 'Login',
    type: 'all'
  }, {
    path: '/generate-migration',
    pageName: 'GenerateMigration',
    type: 'all'
  }, {
    path: '*',
    pageName: 'NotFound',
    type: 'all'
  }
] as const

export interface EventParams<T extends Record<string, any> = {}> extends RouteComponentProps<T & { idevent: string }> {}
export interface IdParams <T extends Record<string, any> = {}> extends RouteComponentProps<T & { id: string }> {}
export interface EventAndIdParams <T extends Record<string, any> = {}> extends RouteComponentProps<T & { id: string, idevent: string }> {}
export type RouteName = typeof router[number]['path']
