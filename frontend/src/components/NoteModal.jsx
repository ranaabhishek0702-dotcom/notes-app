import { useState, useEffect } from 'react'

function NoteModal({ note, onSubmit, onClose }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setBody(note.body)
    }
  }, [note])

  const handleSubmit = () => {
    if (!title.trim() || !body.trim()) return
    onSubmit({ title, body })
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: 'var(--dark)',
        border: '1px solid var(--green)',
        padding: '32px',
        width: '100%',
        maxWidth: '520px',
        animation: 'slideIn 0.2s ease',
      }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '18px', letterSpacing: '3px' }}>
            {note ? '> EDIT_FILE' : '> NEW_FILE'} <span className="blink">█</span>
          </div>
          <div style={{ borderBottom: '1px solid var(--border)', marginTop: '12px' }} />
        </div>

        {/* Title input */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ color: 'var(--dim-green)', fontSize: '11px', marginBottom: '6px' }}>
            FILENAME:
          </div>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="enter title..."
            style={{
              width: '100%',
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              color: 'var(--green)',
              padding: '10px 14px',
              fontSize: '14px',
            }}
          />
        </div>

        {/* Body input */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ color: 'var(--dim-green)', fontSize: '11px', marginBottom: '6px' }}>
            CONTENT:
          </div>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="enter content..."
            rows={6}
            style={{
              width: '100%',
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              color: 'var(--green)',
              padding: '10px 14px',
              fontSize: '14px',
              lineHeight: '1.6',
            }}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              color: 'var(--dim-green)',
              border: '1px solid var(--dim-green)',
              padding: '8px 20px',
              fontSize: '13px',
              letterSpacing: '2px',
            }}
          >
            [CANCEL]
          </button>
          <button
            onClick={handleSubmit}
            style={{
              background: 'var(--green)',
              color: 'var(--black)',
              border: '1px solid var(--green)',
              padding: '8px 20px',
              fontSize: '13px',
              letterSpacing: '2px',
              fontWeight: 'bold',
            }}
          >
            {note ? '[UPDATE]' : '[CREATE]'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoteModal