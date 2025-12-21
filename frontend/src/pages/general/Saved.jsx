import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../../styles/reels.css'

const Saved = () => {
  const [items, setItems] = useState([])
  const [savedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('savedItems') || '[]') } catch { return [] }
  })

  useEffect(() => {
    if (!savedIds.length) return

    axios.get('http://localhost:3000/api/food')
      .then(res => {
        const all = res.data.foodItems || []
        const filtered = all.filter(i => savedIds.includes(i._id))
        setItems(filtered)
      })
      .catch(err => { console.error('Failed to load saved items', err); setItems([]) })
  }, [savedIds])

  if (!savedIds.length) {
    return (
      <div className="saved-page">
        <h2>No saved items</h2>
        <p>You haven't saved any reels yet.</p>
        <Link to="/">Go to Home</Link>
      </div>
    )
  }

 return (
    <div className="saved-page">
      <h2>Saved Reels</h2>
      <div className="saved-grid">
        {items.map(it => (
          <div className="saved-item" key={it._id}>
            {it.video ? (
              <video src={it.video} muted loop playsInline className="saved-thumb" />
            ) : (
              <div className="saved-thumb" style={{background:'#ddd',height:140}} />
            )}
            <p className="saved-title">{it.description?.slice(0, 80)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Saved
