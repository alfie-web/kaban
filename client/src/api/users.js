import api, { authInstance } from '../api'

const usersAPI = {
   getMe: () => api.get('/users/getMe'),
   login: (formData) => authInstance.post('/users/login', formData),
   refreshTokens: () => authInstance.post('/users/refresh-tokens')
      .then(({ data }) => {
         localStorage.setItem('ATE', JSON.stringify(data.data.exp))
         // TODO: А вообще, нужно учитывать то, что время у пользователя может отставать от серверного
         localStorage.setItem('STO', JSON.stringify(Date.now() - data.data.serverTime))
         api.defaults.headers.common['token'] = data.data.accessToken

         return data
      }),
   removeToken: () => api.delete('/users/remove-token'),
}

export default usersAPI
