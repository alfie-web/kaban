import { createSlice } from '@reduxjs/toolkit'

import boardsAPI from '../../api/boards'

export const boardsSlice = createSlice({
   name: 'boards',
   initialState: {
      items: [],
		isFetching: false
   },
   reducers: {
		setBoards: (state, { payload }) => {
         state.items = payload
      },
		setIsFetching: (state, { payload }) => {
         state.isFetching = payload
      },
   },
})

export const { setBoards, setIsFetching } = boardsSlice.actions

export const fetchBoards = () => async (dispatch) => {
	dispatch(setIsFetching(true))

   try {
      const { data } = await boardsAPI.getAll()
		dispatch(setBoards(data.data))
   } catch (error) {

	}
	finally {
		dispatch(setIsFetching(false))
	}
}

export default boardsSlice.reducer
