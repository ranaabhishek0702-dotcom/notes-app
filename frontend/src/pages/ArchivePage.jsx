import { useState } from 'react'
import { verifyPasscode, setPasscode, getArchivedNotes, createArchivedNote, deleteArchivedNote } from '../services/api'
import NoteCard from '../components/NoteCard'
import NoteModal from '../components/NoteModal'

function ArchivePage() {
  const [passcode, setPasscodeInput] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [notes, setNotes] = useState([])
  const [error, setError] = useState('')
  const [isNew, setIsNew] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleUnlock = async () => {
    setError('')
    setLoading(true)
    try {
      await verifyPasscode(passcode)
      const res = await getArchivedNotes(passcode)
      setNotes(res.data)
      setUnlocked(true)
    } catch (err) {
      if (err.response?.status === 404) {
        setIsNew(true)
        setError('> NO PASSCODE SET. INITIALIZING NEW VAULT...')
      } else {
        setError('> ACCESS DENIED. WRONG PASSCODE.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSetPasscode = async () => {
    try {
      await setPasscode(passcode)
      setNotes([])
      setUnlocked(true)
      setIsNew(false)
      setError('')
    } catch (err) {
      setError('> ERROR SETTING PASSCODE.')
    }
  }

  const handleCreate = async (data) => {
    try {
      await createArchivedNote({ ...data, passcode })
      const res = await getArchivedNotes(passcode)
      setNotes(res.data)
      setShowModal(false)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteArchivedNote(id, passcode)
      const res = await getArchivedNotes(passcode)
      setNotes(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  if (!unlocked) {
    return (
      <div style={{ maxWidth: '400px' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ color: 'var(--amber)', fontSize: '18px', letterSpacing: '3px', marginBottom: '8px' }}>
            {'>'} VAULT ACCESS <span className="blink">█</span>
          </div>
          <div style={{ color: 'var(--dim-green)', fontSize: '12px' }}>
            {'>'} ENTER PASSCODE TO DECRYPT VAULT
          </div>
        </div>

        <div style={{ border: '1px solid var(--amber)', padding: '24px' }}>
          <div style={{ color: 'var(--dim-green)', fontSize: '11px', marginBottom: '8px' }}>
            PASSCODE:
          </div>
          <input
            type="password"
            value={passcode}
            onChange={e => setPasscodeInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleUnlock()}
            placeholder="enter passcode..."
            style={{
              width: '100%',
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--amber)',
              padding: '10px 14px',
              fontSize: '14px',
              marginBottom: '16px',
            }}
          />

          {error && (
            <div style={{ color: error.includes('DENIED') ? 'var(--red)' : 'var(--amber)', fontSize: '12px', marginBottom: '16px' }}>
              {error}
            </div>
          )}

          {isNew ? (
            <button
              onClick={handleSetPasscode}
              style={{
                width: '100%',
                background: 'var(--amber)',
                color: 'var(--black)',
                border: 'none',
                padding: '10px',
                fontSize: '13px',
                letterSpacing: '2px',
              }}
            >
              [INITIALIZE VAULT]
            </button>
          ) : (
            <button
              onClick={handleUnlock}
              style={{
                width: '100%',
                background: 'transparent',
                color: 'var(--amber)',
                border: '1px solid var(--amber)',
                padding: '10px',
                fontSize: '13px',
                letterSpacing: '2px',
              }}
            >
              {loading ? '[DECRYPTING...]' : '[UNLOCK VAULT]'}
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ color: 'var(--amber)', fontSize: '13px' }}>
          {'>'} VAULT UNLOCKED — {notes.length} SECRET FILE(S)
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setShowModal(true)}
            style={{
              background: 'transparent',
              color: 'var(--amber)',
              border: '1px solid var(--amber)',
              padding: '8px 20px',
              fontSize: '13px',
              letterSpacing: '2px',
            }}
          >
            + NEW_SECRET
          </button>
          <button
            onClick={() => { setUnlocked(false); setPasscodeInput('') }}
            style={{
              background: 'transparent',
              color: 'var(--dim-green)',
              border: '1px solid var(--dim-green)',
              padding: '8px 20px',
              fontSize: '13px',
              letterSpacing: '2px',
            }}
          >
            [LOCK]
          </button>
        </div>
      </div>

      {notes.length === 0 ? (
        <div style={{ color: 'var(--dim-green)' }}>{'>'} VAULT IS EMPTY. ADD YOUR FIRST SECRET.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {notes.map(note => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={() => {}}
              onDelete={() => handleDelete(note._id)}
            />
          ))}
        </div>
      )}

      {showModal && (
        <NoteModal
          note={null}
          onSubmit={handleCreate}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

export default ArchivePage