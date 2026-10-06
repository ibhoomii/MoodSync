import { PlayIcon } from './Icons'

function SongCard({ song }) {
  return (
    <article className="song-card">
      <div className={`album-art ${song.color}`} aria-label={`${song.title} album artwork`}>
        <span>{song.artwork}</span>
        <div className="album-glow" />
      </div>
      <div className="song-content">
        <div className="song-meta">
          <span className="mood-tag">{song.mood}</span>
          <span>{song.duration}</span>
        </div>
        <h3>{song.title}</h3>
        <p>{song.artist}</p>
        <button className="play-button" type="button" aria-label={`Play ${song.title} by ${song.artist}`}>
          <PlayIcon />
          <span>Play</span>
        </button>
      </div>
    </article>
  )
}

export default SongCard
