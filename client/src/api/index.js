import axios from 'axios'
import usersAPI from './users'

let baseURL

if (process.env.NODE_ENV !== 'production') {
   baseURL = 'http://localhost:7777/api'
} else {
   baseURL = 'https://app-kaban.herokuapp.com/api'
}

const axiosConfig = {
   withCredentials: true,
   baseURL: baseURL,
   headers: {
      'X-Requested-With': 'XMLHttpRequest',
   },
}

const instance = axios.create(axiosConfig) // для обычных запросов, в том числе и с accessToken-ом
export const authInstance = axios.create(axiosConfig) // для авторизации и рефреша токенов

instance.interceptors.request.use(
   async function (config) {
      const ATExpiresIn = localStorage.getItem('ATE')
      const serverTimeOffset = localStorage.getItem('STO')

      if (ATExpiresIn) {
         if (Date.now() - serverTimeOffset >= +ATExpiresIn * 1000) {
            try {
               const { data } = await usersAPI.refreshTokens()

               config.headers.token = data.accessToken || ''

            } catch (e) {
               console.log('e', e)
            }
         }
      }

      return config
   },
   function (error) {
      return Promise.reject(error)
   }
)

export default instance
