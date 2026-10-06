import { useState } from 'react'
import TextEmotion from '../components/TextEmotion'
import EmotionResult from '../components/EmotionResult'
import SongCard from '../components/SongCard'
import { MusicIcon, SparkleIcon } from '../components/Icons'

const API_URL = 'http://127.0.0.1:5000'

function Home() {
  const [result, setResult] = useState(null)
  const [songs, setSongs] = useState([])
  const [error, setError] = useState('')

  const handleAnalyze = async (text) => {
    setError('')
    setResult(null)
    setSongs([])

    try {
      // ==========================================
      // 1. SEND TEXT TO ML MODEL
      // ==========================================

      const emotionResponse = await fetch(
        `${API_URL}/api/text-emotion`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: text,
          }),
        },
      )

      if (!emotionResponse.ok) {
        throw new Error(
          'Emotion analysis failed.',
        )
      }

      const emotionData =
        await emotionResponse.json()

      const detectedEmotion =
        emotionData.emotion

      const confidence =
        Number(emotionData.confidence) * 100

      // ==========================================
      // 2. DISPLAY ML RESULT
      // ==========================================

      setResult({
        emotion: detectedEmotion,
        confidence: confidence.toFixed(2),
      })

      // ==========================================
      // 3. GET SONG RECOMMENDATIONS
      // ==========================================

      const recommendationResponse =
        await fetch(
          `${API_URL}/api/recommendations`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              emotion: detectedEmotion,
            }),
          },
        )

      if (!recommendationResponse.ok) {
        throw new Error(
          'Song recommendation failed.',
        )
      }

      const recommendationData =
        await recommendationResponse.json()

      setSongs(recommendationData.songs)

      // Scroll to results
      window.setTimeout(() => {
        document
          .getElementById('recommendations')
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
      }, 100)

    } catch (error) {
      console.error(error)

      setError(
        'Unable to connect to the MoodSync ML server. Make sure the Flask backend is running.',
      )
    }
  }

  return (
    <main id="top">
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-badge">
            <SparkleIcon />
            Emotion-based music
          </span>

          <h1>
            Music that matches your mood.
          </h1>

          <p>
            Tell us how you’re feeling.
            We’ll find the music.
          </p>

          <a
            className="hero-link"
            href="#emotion-input"
          >
            Analyze my mood
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div
          className="hero-visual"
          aria-label="Music visual illustration"
        >
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />

          <div className="music-disc">
            <MusicIcon />
          </div>

          <div className="floating-note note-one">
            ♪
          </div>

          <div className="floating-note note-two">
            ♫
          </div>

          <div className="floating-emoji">
            😊
          </div>
        </div>
      </section>

      <section
        id="emotion-input"
        className="input-flow"
      >
        <TextEmotion
          onAnalyze={handleAnalyze}
        />
      </section>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {result && (
        <>
          <EmotionResult result={result} />

          <section
            id="recommendations"
            className="recommendations"
          >
            <div className="section-heading">
              <span className="eyebrow">
                Curated for you
              </span>

              <h2>
                Songs for your mood
              </h2>

              <p>
                Recommendations generated from
                your detected emotion.
              </p>
            </div>

            <div className="song-grid">
              {songs.map((song, index) => (
                <SongCard
                  key={`${song.title}-${index}`}
                  song={{
                    ...song,
                    id: index + 1,
                    mood: song.emotion,
                  }}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  )
}

export default Home