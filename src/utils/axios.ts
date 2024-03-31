import axios, { CreateAxiosDefaults } from "axios";
import authStore from "../store/authStore";
const configs: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_REACT_APP_API + '/api/apirest',
}

if (authStore.token) {
  configs.headers = {
    Authorization: 'Bearer ' + authStore.token
  }
}

const instance = axios.create({
  ...configs,
  baseURL: import.meta.env.VITE_REACT_APP_API + '/api/apirest',
})

export default instance
