import { createSlice } from '@reduxjs/toolkit'

import listsAPI from '../../api/lists'
import cardsAPI from '../../api/cards'

export const listsSlice = createSlice({
   name: 'lists',
   initialState: {
      items: [],
		isFetching: false,
		isCardsFetching: null	// TODO: Сделать в виде массива
   },
   reducers: {
		setLists: (state, { payload }) => {
         state.items = payload
      },
		setCards: (state, { payload }) => {
			const findedList = state.items.find(item => item._id === payload.listId)
			if (findedList.cardItems) {
				findedList.cardItems.push(...payload.cardItems)
			} else {
				findedList.cardItems = payload.cardItems
			}

			findedList.isLastPage = payload.isLastPage
      },
		setNewList: (state, { payload }) => {
         state.items.push(payload)
      },
		setNewCard: (state, { payload }) => {
         const findedList = state.items.find(item => item._id === payload.listId)
			findedList.cardItems.push(payload)
      },
		setMoveCard: (state, { payload }) => {
			const { startListId, endListId, currentPosition, newPosition } = payload
			const startList = state.items.find(item => item._id === startListId)
			let endList = state.items.find(item => item._id === endListId)
			let newCards = startList.cardItems

			if (startListId === endListId) {	// Если перемещаем карточку внутри текущего листа
				newCards.splice(newPosition, 0, newCards.splice(currentPosition, 1)[0])
			} else {	// Если перемещаем карточку в другой лист
				let card = newCards.splice(currentPosition, 1)[0]
				card.listId = endListId
				newCards = endList.cardItems
				newCards.splice(newPosition, 0, card)
			}

			endList.cardItems = newCards
      },
		setMoveList: (state, { payload }) => {
			const { newPosition, currentPosition } = payload
         const newLists = state.items
			newLists.splice(newPosition, 0, newLists.splice(currentPosition, 1)[0])

			state.items = newLists
      },
		setIsFetching: (state, { payload }) => {
         state.isFetching = payload
      },
		setIsCardsFetching: (state, { payload }) => {
         state.isCardsFetching = payload
      },
   },
})

export const {
   setLists,
   setCards,
   setNewList,
   setNewCard,
   setMoveCard,
   setMoveList,
   setIsFetching,
   setIsCardsFetching,
} = listsSlice.actions

export const fetchLists = (boardId) => async (dispatch) => {
	dispatch(setIsFetching(true))

   try {
      const { data } = await listsAPI.getAll(boardId)
		dispatch(setLists(data.data))
   } catch (error) {

	}
	finally {
		dispatch(setIsFetching(false))
	}
}


export const fetchCards = (listId) => async (dispatch, getState) => {	
	const { lists } = getState()
	if (lists.isCardsFetching === listId) return
	
	// dispatch(setIsCardsFetching(listId))
	
	const findedList = lists.items.find(l => l._id === listId)
	
	if (findedList?.isLastPage) return
	dispatch(setIsCardsFetching(listId))

	const offset = findedList.cardItems ? findedList.cardItems.length : 0

   try {
      const { data } = await listsAPI.getCards(listId, offset)
		
		dispatch(setCards({
			listId,
			cardItems: data.data.cards,
			isLastPage: data.data.isLastPage,
		}))
   } catch (error) {

	} finally {
		dispatch(setIsCardsFetching(null))
	}
}

export const createList = (boardId, title) => async (dispatch) => {
   try {
      const { data } = await listsAPI.createList({ boardId, title })
		dispatch(setNewList(data.data))
   } catch (error) {

	}
}

export const createCard = (listId, title) => async (dispatch, getState) => {
	const { lists } = getState()
	const finded = lists.items.find(l => l._id === listId)

	console.log('finded', finded)

	try {
      const { data } = await cardsAPI.createCard({ listId, title, position: finded.cardItems.length })
		dispatch(setNewCard(data.data))
   } catch (error) {

	}
}

export const moveCard = (moveData) => async (dispatch) => {
	dispatch(setMoveCard(moveData))

   try {
      await listsAPI.moveCard(moveData)

   } catch (error) {

	}
}

export default listsSlice.reducer
