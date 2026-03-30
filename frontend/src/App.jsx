import { useState } from 'react'
import NotesPage from './pages/NotesPage'
import ArchivePage from './pages/ArchivePage'

function App() {
  const [page, setPage] = useState('notes')

  return (
    <div style={{ minHeight: '100vh', padding: '24px' }}>

      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '16px', marginBottom: '32px' }}>
        <div style={{ fontSize: '28px', fontFamily: 'VT323', color: 'var(--green)', letterSpacing: '4px' }} className="flicker">
          ██╗  ██╗ ██████╗ ████████╗███████╗███████╗
        </div>
        <div style={{ fontSize: '13px', color: 'var(--dark-green)', marginTop: '4px' }}>
          {'>'} SECURE_NOTES_TERMINAL v1.0.0 _ <span className="blink">█</span>
        </div>

        {/* Nav */}
        <div style={{ marginTop: '20px', display: 'flex', gap: '24px' }}>
          <button
            onClick={() => setPage('notes')}
            style={{
              background: 'transparent',
              color: page === 'notes' ? 'var(--black)' : 'var(--green)',
              backgroundColor: page === 'notes' ? 'var(--green)' : 'transparent',
              border: '1px solid var(--green)',
              padding: '6px 16px',
              fontSize: '13px',
              letterSpacing: '2px',
            }}
          >
            [NOTES]
          </button>
          <button
            onClick={() => setPage('archive')}
            style={{
              background: 'transparent',
              color: page === 'archive' ? 'var(--black)' : 'var(--amber)',
              backgroundColor: page === 'archive' ? 'var(--amber)' : 'transparent',
              border: '1px solid var(--amber)',
              padding: '6px 16px',
              fontSize: '13px',
              letterSpacing: '2px',
            }}
          >
            [ARCHIVE//PROTECTED]
          </button>
        </div>
      </div>

      {/* Pages */}
      {page === 'notes' && <NotesPage />}
      {page === 'archive' && <ArchivePage />}

    </div>
  )
}

export default App
