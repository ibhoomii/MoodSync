import { useState } from 'react'
import InputSelector from '../components/InputSelector'
import TextEmotion from '../components/TextEmotion'
import FaceEmotion from '../components/FaceEmotion'
import EmotionResult from '../components/EmotionResult'
import SongCard from '../components/SongCard'
import mockSongs from '../data/mockSongs'
import { MusicIcon, SparkleIcon } from '../components/Icons'

function Home() {
  const [activeInput, setActiveInput] = useState(null)
  const [result, setResult] = useState(null)

  const handleAnalyze = (mockResult) => {
    setResult(mockResult)
    window.setTimeout(() => {
      document.getElementById('recommendations')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 100)
  }

  return (
    <main id="top">
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-badge"><SparkleIcon /> Emotion-based music</span>
          <h1>Music that matches your mood.</h1>
          <p>Let AI understand your emotion and discover songs that fit your vibe.</p>
          <a className="hero-link" href="#input-selector">
            Start feeling the music <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="hero-visual" aria-label="Music visual illustration">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="music-disc">
            <MusicIcon />
          </div>
          <div className="floating-note note-one">♪</div>
          <div className="floating-note note-two">♫</div>
          <div className="floating-emoji">😊</div>
        </div>
      </section>

      <section id="input-selector">
        <InputSelector onSelect={(inputType) => {
          setActiveInput(inputType)
          setResult(null)
          window.setTimeout(() => {
            document.getElementById('emotion-input')?.scrollIntoView({ behavior: 'smooth' })
          }, 50)
        }} />

        <div id="emotion-input" className="input-flow">
          {activeInput === 'text' && <TextEmotion onAnalyze={handleAnalyze} />}
          {activeInput === 'face' && <FaceEmotion onAnalyze={handleAnalyze} />}
        </div>
      </section>

      {result && (
        <>
          <EmotionResult result={result} />
          <section id="recommendations" className="recommendations">
            <div className="section-heading">
              <span className="eyebrow">Curated for you</span>
              <h2>Songs for your mood</h2>
              <p>Six mock recommendations based on your detected emotion.</p>
            </div>
            <div className="song-grid">
              {mockSongs.map((song) => <SongCard key={song.id} song={song} />)}
            </div>
          </section>
        </>
      )}
    </main>
  )
}

export default Home
