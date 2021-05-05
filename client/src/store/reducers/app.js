import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
   name: 'app',
   initialState: {
      initialized: false,
		isFetching: false
   },
   reducers: {
		setInitialized: (state) => {
         state.initialized = true
      },
      setIsFetching: (state, { payload }) => {
         state.isFetching = payload
      },
   },
})

export const { setInitialized, setIsFetching } = appSlice.actions

export default appSlice.reducer
