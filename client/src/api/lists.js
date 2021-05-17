import api from './'

const listsAPI = {
   getAll: (boardId) => api.get(`/lists/${boardId}`),
   getCards: (listId, offset) => api.get(`/lists/getCards/${listId}?offset=${offset}`),
   createList: (newListData) => api.post('/lists/create', newListData),
   deleteList: (listId) => api.delete(`/lists/delete/${listId}`),
   moveCard: (newCardData) => api.post('/lists/moveCard', newCardData),
}

export default listsAPI
