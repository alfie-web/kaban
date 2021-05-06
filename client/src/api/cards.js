import api from './'

const cardsAPI = {
   getAll: (listId) => api.get(`/cards/${listId}`),
   createCard: ({ listId, title }) =>
      api.post('/cards/create', { listId, title }),
   // editCard: ({ cardId, text }) =>
   //    api.post('/cards/edit', { cardId, text }),
   // deleteCard: ({ cardId, listId }) =>
   //    api.post('/cards/delete', { cardId, listId }),
}

export default cardsAPI
