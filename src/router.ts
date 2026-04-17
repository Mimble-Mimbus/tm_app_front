import { RouteComponentProps } from 'react-router'
import { isDbAvailable } from './utils'

export type PageType = "all" | "app" | "web"

export interface RouteData {
  readonly path: string
  readonly pageName :string
  readonly type?: PageType
  readonly auth?: boolean
  readonly isActivated?: boolean
}

export const router = [{
    path: '/',
    pageName: "Accueil",
    type: 'all',
  },
  {
    path: '/event/:idevent/animation-creation',
    pageName: 'AnimationCreation',
    type: 'all',
    auth: true,
    isActivated: true
  }, {
    path: '/event/:idevent/activity/:type/:id',
    pageName: "Animation",
    type: 'all',
  }, {
    path: '/event/:idevent/quest',
    pageName: "QuestDetails",
    type: 'all',
    isActivated: true
  },  {
    path: '/event/:idevent/informations',
    pageName: "Informations",
    type: 'all',
  }, {
    path: '/mimble-mibus',
    pageName: "MimbleMimbus",
    type: 'all',
  }, {
    path: '/account',
    pageName: "Account",
    auth: true,
    type: 'all',
    isActivated: true
  }, {
    path: '/event/:idevent/animations',
    pageName: "ListAnimations",
    type: 'all',
  }, {
    path: '/event/:idevent/caracter-card',
    pageName: "CaracterCard",
    type: 'all',
    isActivated: false
  }, {
    path: '/event/:idevent/voluntary-interface',
    pageName: "VoluntaryInterface",
    type: 'all',
    auth: true
  }, {
    path: '/event/:idevent/interactive-map',
    pageName: "InteractiveMap",
    type: "all",
  }, {
    path: '/tickets',
    pageName: 'Tickets',
    type: 'app',
    isActivated: isDbAvailable()
  }, {
    path: '/login',
    pageName: 'Login',
    type: 'all',
  }, {
    path: '/generate-migration',
    pageName: 'GenerateMigration',
    type: 'all',
    isActivated: import.meta.env.DEV
  }, {
    path: '/event/:idevent/quests',
    pageName: 'Quests',
    type: 'all',
  }, {
    path: '/quest-details/:id',
    pageName: 'QuestDetails',
    type: 'all',
  },{
    path: '/contact',
    pageName: 'Contact',
    type: 'all'
  }, {
    path: '/register-account',
    pageName: 'RegisterAccount',
    type: 'all',
  }, {
    path: '/verify-email',
    pageName: 'VerifyEmail',
    type: 'web',
  }, {
    path: '/forgot-password',
    pageName: 'ForgotPassword',
    type: 'all',
  }, {
    path: '/reset-password',
    pageName: 'ResetPassword',
    type: 'web',
  }, {
    path: '/Programme',
    pageName: 'Programme',
    type: 'web',
  },{
    path: '*',
    pageName: 'NotFound',
    type: 'all',
  }
] as const satisfies RouteData[]

export interface EventParams<T extends Record<string, any> = {}> extends RouteComponentProps<T & { idevent: string }> {}
export interface IdParams <T extends Record<string, any> = {}> extends RouteComponentProps<T & { id: string }> {}
export interface EventAndIdParams <T extends Record<string, any> = {}> extends RouteComponentProps<T & { id: string, idevent: string }> {}
export type RouteName = typeof router[number]['path']
