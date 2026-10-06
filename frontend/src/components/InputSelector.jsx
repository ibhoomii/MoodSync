import { MessageIcon, CameraIcon } from './Icons'

function InputSelector({ onSelect }) {
  return (
    <section className="selector-section" aria-labelledby="selector-heading">
      <div className="section-heading centered">
        <span className="eyebrow">Choose how you feel</span>
        <h2 id="selector-heading">How would you like to begin?</h2>
        <p>Share your mood through text or a quick face scan.</p>
      </div>

      <div className="input-selector">
        <button
          className="selection-card text-selection"
          type="button"
          onClick={() => onSelect('text')}
        >
          <span className="selection-icon"><MessageIcon /></span>
          <span className="selection-copy">
            <strong>Text Emotion</strong>
            <small>Tell us how you’re feeling and let AI detect your emotion.</small>
          </span>
          <span className="selection-arrow" aria-hidden="true">→</span>
        </button>

        <button
          className="selection-card face-selection"
          type="button"
          onClick={() => onSelect('face')}
        >
          <span className="selection-icon"><CameraIcon /></span>
          <span className="selection-copy">
            <strong>Face Emotion</strong>
            <small>Use your facial expression to discover your current mood.</small>
          </span>
          <span className="selection-arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  )
}

export default InputSelector
