import { useState } from 'react'
import { MessageIcon, SparkleIcon } from './Icons'

function TextEmotion({ onAnalyze }) {
  const [text, setText] = useState(
    "I'm feeling really happy today because everything went perfectly!",
  )

  const handleAnalyze = () => {
    onAnalyze({ emotion: 'Happy', confidence: 92, source: 'text' })
  }

  return (
    <section className="input-panel" aria-labelledby="text-input-heading">
      <div className="input-panel-header">
        <div className="panel-icon purple"><MessageIcon /></div>
        <div>
          <span className="eyebrow">Text emotion</span>
          <h2 id="text-input-heading">How are you feeling today?</h2>
        </div>
      </div>

      <label className="sr-only" htmlFor="emotion-text">Describe your current emotion</label>
      <textarea
        id="emotion-text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Tell me how you're feeling..."
        rows="6"
      />

      <div className="input-footer">
        <p><SparkleIcon /> Mock analysis is ready for this demo.</p>
        <button className="primary-button" type="button" onClick={handleAnalyze}>
          Analyze Emotion <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  )
}

export default TextEmotion
