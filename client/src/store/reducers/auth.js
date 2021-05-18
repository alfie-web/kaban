import { createSlice } from '@reduxjs/toolkit'

import api from '../../api'
import usersAPI from '../../api/users'


export const authSlice = createSlice({
   name: 'auth',
   initialState: {
      isFetching: false,
      isAuth: false,
	   user: null
   },
   reducers: {
      setUser: (state, { payload }) => {
         state.user = payload
         state.isAuth = true
         state.isFetching = false
      },
      setLogout: (state) => {
         state.user = null
         state.isAuth = false
         state.isFetching = false
      },
      setIsFetching: (state, { payload } ) => {
         state.isFetching = payload
      }
   },
})


export const { setUser, setIsFetching, setLogout } = authSlice.actions

export const getMe = () => async (dispatch) => {
   dispatch(setIsFetching(true))
   try {
      const { data } = await usersAPI.getMe()
      dispatch(setUser(data.data))

      // window.flash('Вы успешно авторизованы!', 'success')

   } catch (error) {
      console.log('Самсинг вент ронг', error)
      dispatch(setIsFetching(false))
   }
}

export const login = (formData) => async (dispatch) => {
   dispatch(setIsFetching(true))
   try {
      const { data } = await usersAPI.login(formData)
      
      localStorage.setItem('ATE', JSON.stringify(data.data.exp))
      api.defaults.headers.common['token'] = data.data.accessToken

      await dispatch(getMe())

      window.flash('Вы успешно авторизованы!', 'success')

   } catch (error) {
      window.flash(error.response.data.message, 'error')
      
   } finally {
      dispatch(setIsFetching(false))
   }
}

export const logout = () => async (dispatch) => {
   await usersAPI.removeToken()

   localStorage.removeItem('ATE')
   api.defaults.headers.common['token'] = ''

   dispatch(setLogout())
}

export default authSlice.reducer
