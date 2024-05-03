import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import fetchApi from '../utils/axios'

type ReqMethod = 'post' | 'get' | 'patch' | 'put' | 'option' | 'head' | 'delete'

interface TokenReponse {
  token: string 
  refresh_token: string
}

interface Endpoint {
  method: ReqMethod
  url: string
}

interface EndpointsList {
  login: Endpoint
  user?: Endpoint
  logout?: Endpoint
  refresh: Endpoint
}

export class AuthStore {
  endpoints: EndpointsList = {
    user: {
      url: '/user/me',
      method: 'get'
    },
    login: {
      url: '/login_check',
      method: 'post'
    },
    logout: {
      url: '/logout',
      method: 'post'
    },
    refresh: {
      url: '/token/refresh',
      method: 'post'
    }
  }

  axios = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API + '/api'
  })

  constructor () {
    makeAutoObservable(this, {
      refresh: false,
    })
  }

  isLogged = false
  user?: any

  get token (): string | null {
    return localStorage.getItem('auth_token')
  }

  private set token (token: string | undefined) {
    if (!token) {
      localStorage.removeItem('auth_token')
    } else {
      localStorage.setItem('auth_token', token)
    }
  }

  get refreshToken (): string | null {
    return localStorage.getItem('auth_token_refresh')
  }

  get retried (): boolean {
    return JSON.parse(localStorage.getItem('retried-connexion') || 'false')
  }

  private set retried (bool: boolean) {
      localStorage.setItem('retried-connexion', JSON.stringify(bool))
  }

  set refreshToken (token: string | undefined) {
    if (!token) {
      localStorage.removeItem('auth_token_refresh')
    } else {
      localStorage.setItem('auth_token_refresh', token)
    }
  }

  setToken (token?: string) {
    this.token = token
  }
  
  setIslogged (isLogged: boolean) {
    this.isLogged = isLogged
  }

  setUser (user: any) {
    this.user = user
  }

  setRefreshToken (refreshToken?: string) {
    this.refreshToken = refreshToken
  }

  setRetried (retried: boolean) {
    this.retried = retried
  }

  async fetchUser () {
    const { user } = this.endpoints

    if (!user) {
      throw new Error('no user endpoint')
    }

    const { data } = await fetchApi(user.url, { method: user.method })
    this.setUser(data)
    return data
  }

  async refresh () {
    if (this.refreshToken) {
      const data = { refresh_token: this.refreshToken }
      const { url, method } = this.endpoints.refresh
      await this.axios<TokenReponse>(url, { method, data })
      .then(({data}) => {
        this.setToken(data.token)
        this.setRefreshToken(data.refresh_token)
        this.setIslogged(true)
      }).catch(() => {
        fetchApi.defaults.headers.Authorization = ''
      })
    }
  }
  
  async login(data: { username: string, password: string}) {
    const { url, method } = this.endpoints.login
    const { token, refresh_token } = (await this.axios<TokenReponse>(url, { method, data })).data
      this.setToken(token)
      this.setRefreshToken(refresh_token)
      this.setIslogged(true)
      this.setRetried(false)
      if (this.endpoints.user) {
        await this.fetchUser()
      }
  }

  async logout () {
    const logout = this.endpoints.logout
  
    if (!logout) {
      throw new Error('no logout endpoint') 
    }

    await axios(logout.url, { method: logout.method })
      .then(() => {
        this.setIslogged(false)
      })
  }
  

  async initialize () {
    this.setRetried(false)
    if (this.token) {
      this.fetchUser().then(() => {
        this.setIslogged(true)
      })
    }
  }
}

export default new AuthStore()
