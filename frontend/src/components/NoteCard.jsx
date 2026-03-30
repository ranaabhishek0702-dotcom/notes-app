function NoteCard({ note, onEdit, onDelete }) {
  const date = new Date(note.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: '2-digit', day: '2-digit'
  })

  return (
    <div style={{
      background: 'var(--card-bg)',
      border: '1px solid var(--border)',
      padding: '20px',
      animation: 'slideIn 0.3s ease',
      position: 'relative',
    }}>
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ color: 'var(--dim-green)', fontSize: '11px' }}>
          FILE_{note._id.slice(-6).toUpperCase()}
        </span>
        <span style={{ color: 'var(--dim-green)', fontSize: '11px' }}>{date}</span>
      </div>

      {/* Title */}
      <div style={{ color: 'var(--green)', fontSize: '16px', marginBottom: '10px', letterSpacing: '1px' }}>
        {'>'} {note.title}
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border)', margin: '10px 0' }} />

      {/* Body */}
      <div style={{ color: 'var(--dark-green)', fontSize: '13px', lineHeight: '1.6', minHeight: '60px' }}>
        {note.body}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
        <button
          onClick={onEdit}
          style={{
            background: 'transparent',
            color: 'var(--green)',
            border: '1px solid var(--dim-green)',
            padding: '4px 12px',
            fontSize: '12px',
            letterSpacing: '1px',
          }}
        >
          [EDIT]
        </button>
        <button
          onClick={onDelete}
          style={{
            background: 'transparent',
            color: 'var(--red)',
            border: '1px solid var(--red)',
            padding: '4px 12px',
            fontSize: '12px',
            letterSpacing: '1px',
            opacity: '0.7',
          }}
        >
          [DELETE]
        </button>
      </div>
    </div>
  )
}

export default NoteCard