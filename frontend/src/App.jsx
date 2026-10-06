import Home from './pages/Home'
import './styles.css'

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="EmotiTune home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M9 18V5l10-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="16" cy="16" r="3" /></svg>
          </span>
          EmotiTune
        </a>
        <a className="nav-link" href="#emotion-input">Home</a>
      </header>
      <Home />
    </div>
  )
}

export default App
