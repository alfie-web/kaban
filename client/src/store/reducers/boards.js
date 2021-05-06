import { createSlice } from '@reduxjs/toolkit'

import boardsAPI from '../../api/boards'

import { fetchLists, setMoveList } from './lists'

export const boardsSlice = createSlice({
   name: 'boards',
   initialState: {
      items: [],
      currentBoard: null,
		isFetching: false
   },
   reducers: {
		setBoards: (state, { payload }) => {
         state.items = payload
      },
      setCurrentBoard: (state, { payload }) => {
         state.currentBoard = payload
      },
		setIsFetching: (state, { payload }) => {
         state.isFetching = payload
      },
   },
})

export const { setBoards, setCurrentBoard, setIsFetching } = boardsSlice.actions

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

export const fetchBoardById = (id) => async (dispatch, getState) => {
   const { boards } = getState()
	dispatch(setIsFetching(true))

   // if (!boards.currentBoard || boards.currentBoard._id !== id)

   try {
      if (!boards.currentBoard || boards.currentBoard._id !== id) {
         const { data } = await boardsAPI.getById(id)
         await dispatch(setCurrentBoard(data.data))
         // тут же получать листы
         await dispatch(fetchLists(id))
      }


   } catch (error) {

	}
	finally {
		dispatch(setIsFetching(false))
	}
}

export const moveList = (moveData) => async (dispatch) => {
	dispatch(setMoveList(moveData))

   try {
      await boardsAPI.moveList(moveData)

   } catch (error) {

	}
	finally {
		// dispatch(setIsFetching(false))
	}
}

export default boardsSlice.reducer
