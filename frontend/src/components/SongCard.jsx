import { useRef, useState } from 'react'
import { PlayIcon } from './Icons'

const emotionStyles = {
  joy: {
    color: 'coral',
    artwork: '♪',
  },
  sadness: {
    color: 'blue',
    artwork: '☁',
  },
  love: {
    color: 'violet',
    artwork: '♥',
  },
  anger: {
    color: 'red',
    artwork: '⚡',
  },
  fear: {
    color: 'purple',
    artwork: '◐',
  },
  surprise: {
    color: 'yellow',
    artwork: '✦',
  },
}

function SongCard({ song }) {
  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef = useRef(null)

  const emotion = (
    song.emotion ||
    song.mood ||
    'joy'
  ).toLowerCase()

  const style =
    emotionStyles[emotion] || emotionStyles.joy

  const audioPath = `/audio/${emotion}.wav`

  const handlePlay = async () => {
    if (!audioRef.current) {
      return
    }

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        await audioRef.current.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.error('Audio playback failed:', error)
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
  }

  return (
    <article className="song-card">

      <div
        className={`album-art ${style.color}`}
        aria-label={`${song.title} album artwork`}
      >
        <span>{style.artwork}</span>
        <div className="album-glow" />
      </div>

      <div className="song-content">

        <div className="song-meta">
          <span className="mood-tag">
            {emotion}
          </span>

          <span>
            {song.genre || 'Music'}
          </span>
        </div>

        <h3>{song.title}</h3>

        <p>{song.artist}</p>

        <button
          className="play-button"
          type="button"
          onClick={handlePlay}
          aria-label={
            isPlaying
              ? `Pause ${song.title}`
              : `Play ${song.title}`
          }
        >
          <PlayIcon />

          <span>
            {isPlaying ? 'Pause' : 'Play'}
          </span>
        </button>

        <audio
          ref={audioRef}
          src={audioPath}
          preload="none"
          onEnded={handleEnded}
        />

      </div>
    </article>
  )
}

export default SongCard