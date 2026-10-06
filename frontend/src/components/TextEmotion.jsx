import { useState } from 'react'
import { MessageIcon, SparkleIcon } from './Icons'

function TextEmotion({ onAnalyze }) {
  const [text, setText] = useState(
    "I'm feeling really happy today because I finally finished my project!",
  )

  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    if (!text.trim()) {
      return
    }

    setLoading(true)

    try {
      await onAnalyze(text)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="input-panel" aria-labelledby="text-input-heading">
      <div className="input-panel-header">
        <div className="panel-icon purple">
          <MessageIcon />
        </div>

        <div>
          <span className="eyebrow">Text emotion</span>
          <h2 id="text-input-heading">
            Tell us how you’re feeling
          </h2>
        </div>
      </div>

      <label
        className="sr-only"
        htmlFor="emotion-text"
      >
        Describe your current emotion
      </label>

      <textarea
        id="emotion-text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Tell me how you're feeling..."
        rows="6"
      />

      <div className="input-footer">
        <p>
          <SparkleIcon />
          AI emotion analysis using our ML model.
        </p>

        <button
          className="primary-button"
          type="button"
          onClick={handleAnalyze}
          disabled={loading || !text.trim()}
        >
          {loading ? 'Analyzing...' : 'Analyze My Mood'}
          {!loading && <span aria-hidden="true">→</span>}
        </button>
      </div>
    </section>
  )
}

export default TextEmotion