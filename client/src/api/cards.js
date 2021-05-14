import api from './'

const cardsAPI = {
   createCard: ({ listId, title, position }) =>
      api.post('/cards/create', { listId, title, position }),
   editCard: (data) => api.patch('/cards/edit', data),
   // deleteCard: ({ cardId, listId }) =>
   //    api.post('/cards/delete', { cardId, listId }),
}

export default cardsAPI
