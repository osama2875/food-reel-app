import React, { useRef, useState } from 'react'
import '../../styles/create-food-partner.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateFoodPartner = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const navigate = useNavigate()

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('video')) {
      setVideoFile(file)
      const url = URL.createObjectURL(file)
      setVideoPreview(url)
    } else {
      setVideoFile(null)
      setVideoPreview(null)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
    const file = e.dataTransfer?.files?.[0]
    if (file && file.type.startsWith('video')) {
      setVideoFile(file)
      setVideoPreview(URL.createObjectURL(file))
      try {
        if (fileInputRef.current) fileInputRef.current.files = e.dataTransfer.files
      } catch (err) {
        // ignore: some browsers make FileList readonly
        // log for debugging if needed
        console.debug('Failed to assign files to input:', err)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
   

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('video', videoFile) 

    const response = await axios.post('http://localhost:3000/api/food', formData, {
     withCredentials: true,
  })

  console.log(response.data)
  navigate('/')

}

  

  return (
    <div className="create-food-wrap">
      <div className="create-food-card">
        <h2 className="create-title">Create Food Item</h2>
        <p className="create-sub">Add a short video, name and description for the food item.</p>

        <form className="form" onSubmit={handleSubmit}>

          <div>
            <label className="form-label">Video</label>
            <div
              className={`video-drop ${isDragOver ? 'dragover' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click() }}
              aria-label="Upload video, click or drop file"
            >
              <svg className="drop-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M3 7a2 2 0 0 1 2-2h10l5 5v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 14l4-3-4-3v6z" fill="currentColor"/>
              </svg>

              <div className="drop-text">
                <div className="drop-title">Click or drag a video here</div>
                <div className="small file-note">MP4, MOV — up to 50MB</div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                className="input file-input-hidden"
                onChange={handleVideoChange}
                aria-label="Upload video"
              />
            </div>
            {videoFile && (
              <div className="file-meta" aria-hidden>
                <div className="file-name">{videoFile.name}</div>
                <div className="file-size">{Math.round((videoFile.size || 0) / 1024)} KB</div>
              </div>
            )}
          </div>

          {videoPreview && (
            <div className="video-preview">
              <video controls src={videoPreview} className="preview-video" />
              <div className="video-actions">
                <button
                  type="button"
                  className="btn ghost small"
                  onClick={() => {
                    setVideoFile(null)
                    setVideoPreview(null)
                    if (fileInputRef.current) fileInputRef.current.value = null
                  }}
                >
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                    <path d="M3 6h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 11v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 11v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="form-label" htmlFor="name">Name</label>
            <input
              id="name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Spicy Chicken Wrap"
              required
            />
          </div>

          <div>
            <label className="form-label" htmlFor="description">Description</label>
            <textarea
              id="description"
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description"
              rows={4}
              required
            />
          </div>

          <div className="form-actions">
            <button className="btn" type="submit">Create Food</button>
            <button
              type="button"
              className="btn ghost"
              onClick={() => {
                setName('')
                setDescription('')
                setVideoFile(null)
                setVideoPreview(null)
                if (fileInputRef.current) fileInputRef.current.value = null
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateFoodPartner
