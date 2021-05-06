import api from '../api'

const boardsAPI = {
   getAll: () => api.get('/boards'),
   getById: boardId => api.get(`/boards/${boardId}`),
   moveList: data => api.post('/boards/moveList', data)
}

export default boardsAPI
