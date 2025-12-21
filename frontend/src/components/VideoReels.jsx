import React, { useEffect, useRef, useState } from 'react'
import '../styles/reels.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom' 

const VideoReels = ({ partnerId }) => {
  const containerRef = useRef(null)
  const [videos, setVideos] = useState([])
  const [savedIds, setSavedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('savedItems') || '[]') } catch (e) { return [] }
  })
  const [activeCommentFor, setActiveCommentFor] = useState(null)
  const [commentText, setCommentText] = useState('')
  const navigate = useNavigate()

  // Listen for a custom event to open comments from the BottomNav
  useEffect(() => {
    const handler = (e) => {
      // event may include an id, otherwise open first visible reel
      const id = e.detail?.id || (videos[0]?._id)
      if (id) setActiveCommentFor(id)
    }
    window.addEventListener('open-comments', handler)
    return () => window.removeEventListener('open-comments', handler)
  }, [videos])
 useEffect(() => {
    // persist saved ids
    localStorage.setItem('savedItems', JSON.stringify(savedIds))
  }, [savedIds])

   const toggleSave = (id) => setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [id, ...prev])
  const openComments = (id) => { setActiveCommentFor(id); setCommentText('') }
  const sendComment = (id) => { console.log('Comment for', id, commentText); setActiveCommentFor(null); setCommentText('') }


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

  // 📡 Fetch videos from backend (PUBLIC ROUTE) and optionally filter by partnerId
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/food')
      .then(res => {
        // IMPORTANT: backend sends { foodItems: [] }
        const all = res.data.foodItems || []
        const filtered = partnerId ? all.filter(v => String(v.foodPartner) === String(partnerId)) : all
        setVideos(filtered)
      })
      .catch(err => {
        console.error('Error fetching videos:', err)
        setVideos([])
      })
  }, [partnerId])

  return (
    <div className="reels-container" ref={containerRef}>
      {Array.isArray(videos) && videos.map(item => (
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
