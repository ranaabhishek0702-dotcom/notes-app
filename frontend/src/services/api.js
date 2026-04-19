import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: BASE_URL,
})


export const getNotes = () => api.get('/notes')
export const getNote = (id) => api.get(`/notes/${id}`)
export const createNote = (data) => api.post('/notes', data)
export const updateNote = (id, data) => api.put(`/notes/${id}`, data)
export const deleteNote = (id) => api.delete(`/notes/${id}`)

export const getArchivedNotes = (passcode) =>
  api.get('/archived', { data: { passcode } })
export const createArchivedNote = (data) => api.post('/archived', data)
export const updateArchivedNote = (id, data) => api.put(`/archived/${id}`, data)
export const deleteArchivedNote = (id, passcode) =>
  api.delete(`/archived/${id}`, { data: { passcode } })

export const setPasscode = (passcode) =>
  api.post('/passcode/set', { passcode })
export const verifyPasscode = (passcode) =>
  api.post('/passcode/verify', { passcode })
export const resetPasscode = (oldPasscode, newPasscode) =>
  api.post('/passcode/reset', { oldPasscode, newPasscode })