import { SparkleIcon } from './Icons'

const emotionDetails = {
  joy: {
    emoji: '😊',
    label: 'Joy',
    tone: 'happy',
  },

  sadness: {
    emoji: '😔',
    label: 'Sadness',
    tone: 'sad',
  },

  love: {
    emoji: '❤️',
    label: 'Love',
    tone: 'happy',
  },

  anger: {
    emoji: '😠',
    label: 'Anger',
    tone: 'angry',
  },

  fear: {
    emoji: '😨',
    label: 'Fear',
    tone: 'fear',
  },

  surprise: {
    emoji: '🤩',
    label: 'Surprise',
    tone: 'surprise',
  },
}

function EmotionResult({ result }) {
  const emotion =
    emotionDetails[result.emotion] || {
      emoji: '🙂',
      label: result.emotion,
      tone: 'neutral',
    }

  return (
    <section
      className={`emotion-result ${emotion.tone}`}
      aria-labelledby="emotion-result-heading"
    >
      <div className="result-heading">
        <span className="result-icon">
          <SparkleIcon />
        </span>

        <div>
          <span className="eyebrow">
            Analysis complete
          </span>

          <h2 id="emotion-result-heading">
            Detected Emotion
          </h2>
        </div>
      </div>

      <div className="result-card">
        <div
          className="emotion-emoji"
          aria-hidden="true"
        >
          {emotion.emoji}
        </div>

        <div className="emotion-copy">
          <span>Current mood</span>
          <strong>
            {emotion.label.toUpperCase()}
          </strong>
        </div>

        <div className="confidence-block">
          <span>Confidence</span>
          <strong>
            {result.confidence}%
          </strong>
        </div>
      </div>
    </section>
  )
}

export default EmotionResult