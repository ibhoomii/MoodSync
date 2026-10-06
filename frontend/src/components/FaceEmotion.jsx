import { useRef, useState } from 'react'
import { CameraIcon, CloseIcon, UploadIcon } from './Icons'

function FaceEmotion({ onAnalyze }) {
  const fileInputRef = useRef(null)
  const [preview, setPreview] = useState(null)

  const handleFile = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result)
    reader.readAsDataURL(file)
  }

  const handleAnalyze = () => {
    onAnalyze({ emotion: 'Happy', confidence: 89, source: 'face' })
  }

  return (
    <section className="input-panel" aria-labelledby="face-input-heading">
      <div className="input-panel-header">
        <div className="panel-icon coral"><CameraIcon /></div>
        <div>
          <span className="eyebrow">Face emotion</span>
          <h2 id="face-input-heading">Show us your expression</h2>
        </div>
      </div>

      <div className={`upload-area ${preview ? 'has-preview' : ''}`}>
        {preview ? (
          <>
            <img src={preview} alt="Selected face preview" />
            <button
              className="remove-image"
              type="button"
              onClick={() => {
                setPreview(null)
                if (fileInputRef.current) fileInputRef.current.value = ''
              }}
              aria-label="Remove selected image"
            >
              <CloseIcon />
            </button>
          </>
        ) : (
          <div className="upload-empty">
            <span className="upload-icon"><UploadIcon /></span>
            <strong>Upload a clear face photo</strong>
            <small>PNG, JPG, or WEBP · Mock camera ready</small>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        id="face-image"
        className="sr-only"
        type="file"
        accept="image/*"
        capture="user"
        onChange={handleFile}
      />

      <div className="input-footer">
        <p><CameraIcon /> Camera access is only simulated in this demo.</p>
        <label className="secondary-button" htmlFor="face-image">Choose photo</label>
        <button className="primary-button" type="button" onClick={handleAnalyze}>
          Analyze Face <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  )
}

export default FaceEmotion
