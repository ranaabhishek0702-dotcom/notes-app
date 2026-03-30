import { useState, useEffect } from 'react'
import { getNotes, createNote, updateNote, deleteNote } from '../services/api'
import NoteCard from '../components/NoteCard'
import NoteModal from '../components/NoteModal'

function NotesPage() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editNote, setEditNote] = useState(null)

  const fetchNotes = async () => {
    try {
      const res = await getNotes()
      setNotes(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const handleCreate = async (data) => {
    try {
      await createNote(data)
      fetchNotes()
      setShowModal(false)
    } catch (err) {
      console.error(err)
    }
  }

  const handleUpdate = async (data) => {
    try {
      await updateNote(editNote._id, data)
      fetchNotes()
      setEditNote(null)
      setShowModal(false)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteNote(id)
      fetchNotes()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ color: 'var(--dark-green)', fontSize: '13px' }}>
          {'>'} {notes.length} FILE(S) FOUND IN SYSTEM
        </div>
        <button
          onClick={() => { setEditNote(null); setShowModal(true) }}
          style={{
            background: 'transparent',
            color: 'var(--green)',
            border: '1px solid var(--green)',
            padding: '8px 20px',
            fontSize: '13px',
            letterSpacing: '2px',
          }}
        >
          + NEW_FILE
        </button>
      </div>

      {/* Notes Grid */}
      {loading ? (
        <div style={{ color: 'var(--dim-green)' }}>{'>'} LOADING FILES<span className="blink">_</span></div>
      ) : notes.length === 0 ? (
        <div style={{ color: 'var(--dim-green)' }}>{'>'} NO FILES FOUND. CREATE YOUR FIRST NOTE.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {notes.map(note => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={() => { setEditNote(note); setShowModal(true) }}
              onDelete={() => handleDelete(note._id)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <NoteModal
          note={editNote}
          onSubmit={editNote ? handleUpdate : handleCreate}
          onClose={() => { setShowModal(false); setEditNote(null) }}
        />
      )}
    </div>
  )
}

export default NotesPage