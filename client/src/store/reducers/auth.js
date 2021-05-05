import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
      isFetching: false,
	   user: null
   },
   reducers: {
      setUser: (state, { payload }) => {
         state.user = payload
         state.isFetching = false
      },
   },
})


export const { setUser } = authSlice.actions

export default authSlice.reducer
