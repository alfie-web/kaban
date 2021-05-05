import { createSlice } from '@reduxjs/toolkit'

import { getMe } from './auth'
import usersAPI from '../../api/users'

export const appSlice = createSlice({
   name: 'app',
   initialState: {
      initialized: false,
   },
   reducers: {
		setInitialized: (state) => {
         state.initialized = true
      },
   },
})

export const { setInitialized } = appSlice.actions

export const init = () => async (dispatch) => {
   console.log('init')
   try {
      await usersAPI.refreshTokens()

      // window.flash('Вы успешно авторизованы!', 'success')

   } catch (error) {}

   const authPromise = dispatch(getMe())

   Promise.all([authPromise])
      .finally(
         dispatch(setInitialized())
      )
}

export default appSlice.reducer
