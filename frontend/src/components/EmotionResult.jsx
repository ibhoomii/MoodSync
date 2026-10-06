import { SparkleIcon } from './Icons'

const emotionDetails = {
  Happy: { emoji: '😊', label: 'Happy', tone: 'happy' },
  Sad: { emoji: '😔', label: 'Sad', tone: 'sad' },
  Angry: { emoji: '😠', label: 'Angry', tone: 'angry' },
  Fear: { emoji: '😨', label: 'Fear', tone: 'fear' },
  Surprise: { emoji: '🤩', label: 'Surprise', tone: 'surprise' },
  Neutral: { emoji: '😐', label: 'Neutral', tone: 'neutral' },
}

function EmotionResult({ result }) {
  const emotion = emotionDetails[result.emotion] || emotionDetails.Neutral

  return (
    <section className={`emotion-result ${emotion.tone}`} aria-labelledby="emotion-result-heading">
      <div className="result-heading">
        <span className="result-icon"><SparkleIcon /></span>
        <div>
          <span className="eyebrow">Analysis complete</span>
          <h2 id="emotion-result-heading">Detected Emotion</h2>
        </div>
      </div>

      <div className="result-card">
        <div className="emotion-emoji" aria-hidden="true">{emotion.emoji}</div>
        <div className="emotion-copy">
          <span>Current mood</span>
          <strong>{emotion.label.toUpperCase()}</strong>
        </div>
        <div className="confidence-block">
          <span>Confidence</span>
          <strong>{result.confidence}%</strong>
        </div>
      </div>
    </section>
  )
}

export default EmotionResult
