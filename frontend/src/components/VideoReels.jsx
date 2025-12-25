import React, { useEffect, useRef, useState } from 'react'
import '../styles/reels.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const BACKEND_URL = 'https://zm-ai-backend.onrender.com'

const VideoReels = ({ partnerId }) => {
  const containerRef = useRef(null)
  const [videos, setVideos] = useState([])

  // 🎥 Auto play / pause based on visibility
  useEffect(() => {
    if (!containerRef.current) return

    const videoElements = containerRef.current.querySelectorAll('video')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const video = entry.target
          if (entry.intersectionRatio >= 0.6) {
            video.muted = true
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: [0.25, 0.5, 0.6, 0.85] }
    )

    videoElements.forEach(v => observer.observe(v))
    return () => observer.disconnect()
  }, [videos])

  // 📡 Fetch videos from backend (PUBLIC)
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/food`, {
        withCredentials: true
      })
      .then(res => {
        const all = res.data.foodItems || []
        const filtered = partnerId
          ? all.filter(v => String(v.foodPartner) === String(partnerId))
          : all
        setVideos(filtered)
      })
      .catch(err => {
        console.error('Error fetching videos:', err)
        setVideos([])
      })
  }, [partnerId])

  return (
    <div className="reels-container" ref={containerRef}>
      {videos.map(item => (
        <section key={item._id} className="reel">
          <video
            src={item.video}
            className="reel-video"
            muted
            playsInline
            loop
            preload="metadata"
          />

          <div className="reel-overlay">
            <p className="reel-description">{item.description}</p>

            <Link
              className="visit-btn"
              to={`/food-partner/${item.foodPartner}`}
            >
              Visit store
            </Link>
          </div>
        </section>
      ))}
    </div>
  )
}

export default VideoReels
