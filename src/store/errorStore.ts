import { makeAutoObservable } from 'mobx'
import { ConstraintError } from '../types'
import fetchApi, { addRequestInterceptor, addResponseInterceptor } from '../utils/axios'
import { AxiosError } from 'axios'
import authStore from './authStore'
import retry from 'axios-retry'
interface FormError {
  path: string
  message: string
  value: string
}

export class ErrorStore {
  errors: FormError[] = []
  constructor () {
    makeAutoObservable(this, {
      get: false,
      initialise: false
    })
  }

  get (path: string) {
    return this.errors.filter(error => error.path === path)
  }

  initialise () {
    retry(fetchApi, {
      retries: 2,
      async retryCondition (err) {
        if (!authStore.retried) {
          const code = err.response?.status
          if (code === 401) {
            await authStore.refresh()
              .catch(() => {
                authStore.setIslogged(false)
                authStore.setToken(undefined)
                authStore.setRefreshToken(undefined)
                authStore.setRetried(true)
              })
          }
        }
        return true
      }
    })

    addRequestInterceptor(config => {
      if (authStore.token) {
        config.headers.set('Authorization','Bearer ' + authStore.token)
      } else {
        config.headers.delete('Authorization')
      }
      return config
    })

    addResponseInterceptor(res => {
      this.clear()
      return res
    }, async (err: AxiosError<ConstraintError>) => {
      const data = err.response?.data
      if (data && 'type' in data && data.type === 'ConstraintError' ) {
        this.addError(data)
      }

      return Promise.reject(err)
    })
  }

  setErrors (errors: FormError[]) {
    this.errors = errors
  }

  addError (error: ConstraintError) {
    const errors: FormError[] = []
    error.details.properties.forEach((detail) => {
      errors.push({
        path: detail.name,
        message: detail.message,
        value: detail.value
      })
    })
    this.setErrors(errors)
 }

 clear () {
  this.setErrors([])
 }
}

export default new ErrorStore()
