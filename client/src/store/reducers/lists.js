import { createSlice } from '@reduxjs/toolkit'

import listsAPI from '../../api/lists'
import cardsAPI from '../../api/cards'

export const listsSlice = createSlice({
   name: 'lists',
   initialState: {
      items: [],
		isFetching: false,
		isCardsFetching: null
   },
   reducers: {
		setLists: (state, { payload }) => {
         state.items = payload
      },
		setCards: (state, { payload }) => {
			const findedList = state.items.find(item => item._id === payload.listId)
			if (findedList.cardItems) {
				console.log('payload.cardItems', payload.cardItems)
				// findedList.cardItems.concat(payload.cardItems)
				findedList.cardItems.push(...payload.cardItems)
			} else {
				findedList.cardItems = payload.cardItems
			}

			findedList.isLastPage = payload.isLastPage
			findedList.page = payload.page
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

	dispatch(setIsCardsFetching(listId))
	let page = 1

	const findedList = lists.items.find(l => l._id === listId)

	if (findedList) {
		page = findedList.page
		if (findedList.isLastPage) return
		page = findedList.page + 1
	}

	console.log(page)
	if (!page) page = 1

   try {
      const { data } = await cardsAPI.getAll(listId, page)
		
		dispatch(setCards({
			listId,
			cardItems: data.data.cards,
			isLastPage: data.data.isLastPage,
			page: data.data.page
		}))
   } catch (error) {

	} finally {
		dispatch(setIsCardsFetching(null))
	}
}

// export const fetchCards = (listId) => async (dispatch) => {
// 	dispatch(setIsCardsFetching(true))
//    try {
//       const { data } = await cardsAPI.getAll(listId)
// 		console.log('DATA', data)
// 		dispatch(setCards({
// 			listId,
// 			// cardItems: data.data,
// 			cardItems: data.data.cards,
// 			isLastPage: data.data.isLastPage
				// page: data.data.page
// 		}))
//    } catch (error) {

// 	} finally {
// 		dispatch(setIsCardsFetching(false))
// 	}
// }

export const createList = (boardId, title) => async (dispatch) => {
   try {
      const { data } = await listsAPI.createList({ boardId, title })
		dispatch(setNewList(data.data))
   } catch (error) {

	}
}

export const createCard = (listId, title) => async (dispatch) => {
   try {
      const { data } = await cardsAPI.createCard({ listId, title })
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
