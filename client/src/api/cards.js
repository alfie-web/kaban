import api from './'

const cardsAPI = {
   createCard: ({ listId, title, position }) =>
      api.post('/cards/create', { listId, title, position }),
   // editCard: ({ cardId, text }) =>
   //    api.post('/cards/edit', { cardId, text }),
   // deleteCard: ({ cardId, listId }) =>
   //    api.post('/cards/delete', { cardId, listId }),
}

export default cardsAPI
