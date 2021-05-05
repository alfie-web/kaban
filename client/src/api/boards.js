import api from '../api'

const boardsAPI = {
   getAll: () => api.get('/boards'),
   getById: (boardId) => api.get(`/boards/${boardId}`),
}

export default boardsAPI
