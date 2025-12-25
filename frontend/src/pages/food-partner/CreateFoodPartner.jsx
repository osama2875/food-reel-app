import React, { useRef, useState } from 'react'
import '../../styles/create-food-partner.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const BACKEND_URL = 'https://zm-ai-backend.onrender.com'

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
      setVideoPreview(URL.createObjectURL(file))
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer?.files?.[0]
    if (file && file.type.startsWith('video')) {
      setVideoFile(file)
      setVideoPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!videoFile) {
      alert('Please upload a video')
      return
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('video', videoFile)

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/food`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      console.log(response.data)
      navigate('/')
    } catch (err) {
      console.error('Create food error:', err)
      alert('You must be logged in as Food Partner')
    }
  }

  return (
    <div className="create-food-wrap">
      <div className="create-food-card">
        <h2 className="create-title">Create Food Item</h2>
        <p className="create-sub">Add a short video, name and description.</p>

        <form className="form" onSubmit={handleSubmit}>
          <label className="form-label">Video</label>

          <div
            className={`video-drop ${isDragOver ? 'dragover' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="drop-text">
              <div className="drop-title">Click or drag a video here</div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              hidden
              onChange={handleVideoChange}
            />
          </div>

          {videoPreview && (
            <video src={videoPreview} controls className="preview-video" />
          )}

          <label className="form-label">Name</label>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="form-label">Description</label>
          <textarea
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <div className="form-actions">
            <button className="btn" type="submit">
              Create Food
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateFoodPartner
