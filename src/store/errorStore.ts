import { makeAutoObservable } from 'mobx'
import { ConstraintError } from '../types'
import fetchApi from '../utils/axios'
import { AxiosError } from 'axios'
interface FormError {
  path: string
  message: string
  value: string
}

export class ErrorStore {
  errors: FormError[] = []
  constructor () {
    makeAutoObservable(this, {
      get: false
    })
  }

  get (path: string) {
    return this.errors.filter(error => error.path === path)
  }

  initialise () {
    fetchApi.interceptors.response.use(res => {
      this.setErrors([])
      return res
    }, (err: AxiosError<ConstraintError>) => {
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
}

export default new ErrorStore()
