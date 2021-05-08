import api from './'

const listsAPI = {
   getAll: (boardId) => api.get(`/lists/${boardId}`),
   getCards: (listId, offset) => api.get(`/lists/getCards/${listId}?offset=${offset}`),
   createList: (newListData) => api.post('/lists/create', newListData),
   moveCard: (newCardData) => api.post('/lists/moveCard', newCardData),
}

export default listsAPI
