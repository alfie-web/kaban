import { configureStore } from '@reduxjs/toolkit'
import appReducer from './reducers/app'
import authReducer from './reducers/auth'
import boardsReducer from './reducers/boards'

export default configureStore({
   reducer: {
		app: appReducer,
		auth: authReducer,
		boards: boardsReducer,
	},
})
