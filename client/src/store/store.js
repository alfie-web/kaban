import { configureStore } from '@reduxjs/toolkit'
import appReducer from './reducers/app'
import authReducer from './reducers/auth'

export default configureStore({
   reducer: {
		app: appReducer,
		auth: authReducer
	},
})
