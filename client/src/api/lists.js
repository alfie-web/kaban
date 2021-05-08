import api from './'

const listsAPI = {
   getAll: (boardId) => api.get(`/lists/${boardId}`),
   getCards: (listId, page) => api.get(`/lists/getCards/${listId}?page=${page}`),
   createList: (newListData) => api.post('/lists/create', newListData),
   moveCard: (newCardData) => api.post('/lists/moveCard', newCardData),
}

export default listsAPI
