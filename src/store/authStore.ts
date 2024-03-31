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
}

export class AuthStore {
  endpoints: EndpointsList = {
    user: {
      url: '/api/apirest/user',
      method: 'get'
    },
    login: {
      url: '/login_check',
      method: 'post'
    },
    logout: {
      url: '/logout',
      method: 'post'
    }
  }

  constructor () {
    makeAutoObservable(this)
  }

  isLogged = false
  user?: any

  get token (): string | null {
    return localStorage.getItem('auth_token')
  }

  set token (token: string) {
    localStorage.setItem('auth_token', token)
  }

  get refreshToken (): string | null {
    return localStorage.getItem('auth_token_refresh')
  }

  set refreshToken (token: string) {
    localStorage.setItem('auth_token_refresh', token)
  }

  setToken (token: string) {
    this.token = token
  }
  
  setIslogged (isLogged: boolean) {
    this.isLogged = isLogged
  }

  setUser (user: any) {
    this.user = user
  }

  setRefreshToken (refreshToken: string) {
    this.refreshToken = refreshToken
  }

  async fetchUser () {
    const { user } = this.endpoints

    if (!user) {
      throw new Error('no user endpoint')
    }
  
    const { data } = await axios.get(user.url, { method: user.method })
    this.setUser(data)
    return data
    
  }
  
  async login(data: { username: string, password: string}) {
    const { url, method } = this.endpoints.login
    const { token, refresh_token } = (await axios<TokenReponse>(url, { method, data })).data
      this.setToken(token)
      this.setRefreshToken(refresh_token)
      fetchApi.defaults.headers.Authorization = 'Bearer ' + token
      this.setIslogged(true)
      if (this.endpoints.user) {
        await this.fetchUser()
      }
  }

  async logout () {
    const logout = this.endpoints.logout
    if (!logout) {
      throw new Error('no logout endpoint') 
    }
    this.setIslogged(false)
    return axios(logout.url, { method: logout.method }) 
  }
  

  async initialize () {
    if (this.token) {
      this.fetchUser()
      this.setIslogged(true)
    }
  }
}

export default new AuthStore()