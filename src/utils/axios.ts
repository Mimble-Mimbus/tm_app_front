import axios, { AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from "axios";

const configs: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_REACT_APP_API + '/api/apirest',
}



const instance = axios.create({
  ...configs,
  baseURL: import.meta.env.VITE_REACT_APP_API + '/api/apirest',
})

export function addRequestInterceptor(interceptor: (value: InternalAxiosRequestConfig<any>) => Promise<InternalAxiosRequestConfig<any>> | InternalAxiosRequestConfig<any>) {
  instance.interceptors.request.use(interceptor)
}

export function addResponseInterceptor<T>(interceptor: (value: AxiosResponse<any>) => Promise<AxiosResponse<any>> | AxiosResponse, errorInteceptor: (error: T) => any | Promise<any>) {
  instance.interceptors.response.use(interceptor, errorInteceptor)
}

export default instance
