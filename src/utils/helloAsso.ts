import axios, { AxiosInstance } from "axios";



interface TokenReponse {
  access_token: string
  refresh_token: string
  token_type: 'bearer'
  expires_in: number
}

export const helloAssoClient = new class HelloAssoClient {
  apiUrl = 'https://api.helloasso.com/oauth2/token'
  client: AxiosInstance
  constructor () {
    if (import.meta.env.PROD) {
      this.apiUrl = 'https://api.helloasso.com'
    } else {
      this.apiUrl = 'https://api.helloasso-sandbox.com'
    }

    this.client = axios.create({
      baseURL: this.apiUrl
    })
  }
  refreshToken?: string
  accessToken?: string
  expireIn?: number
  

  private async verify () {
    if (!this.expireIn) {
      throw new Error('missing expireIn value')
    }

    if (this.expireIn < Date.now()) {
      await this.refresh()
    }
  }

  setAccessToken (token: string) {
    this.client.interceptors.request.use(config => {
      config.headers.authorization = 'Bearer ' + token

      return config
    })
  }

  private async  oauthToken (grantType: 'client_credentials' | 'refresh_token', refreshToken?: string) {
    const params: any = {}
    params.client_id = import.meta.env.VITE_REACT_APP_HELLO_ASSO_CLIENT_ID
    params.grant_type = grantType

    if (grantType === 'client_credentials') {
      params.client_secret = import.meta.env.VITE_REACT_APP_HELLO_ASSO_CLIENT_SECRET
    }

    if (refreshToken) {
      params.refreshToken = refreshToken
    }

    const { data } = await this.client.post<TokenReponse>('/oauth2/token', params)

    this.refreshToken = data.refresh_token
    this.accessToken = data.access_token
    this.expireIn = Date.now() + (data.expires_in * 1000)
   
    this.setAccessToken(data.access_token)
  }

  refresh () {
    return this.oauthToken('refresh_token', this.refreshToken)
  }

  getToken () {
    return this.oauthToken('client_credentials')
  }

  async getOrganization () {
    await this.verify()
    const { data } = await this.client('/users/me/organizations')
    return data
  }
} ()
