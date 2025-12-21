import React from 'react'
import { Link } from 'react-router-dom'

const BottomNav = () => {
  const openComments = () => {
    // send custom event for VideoReels to handle
    const first = document.querySelector('.reel')
    const id = first?.querySelector('.reel-overlay')?.dataset?.id
    window.dispatchEvent(new CustomEvent('open-comments', { detail: { id } }))
  }

  return (
    <div className="bottom-nav">
      <Link to="/" title="Home">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.5z" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </Link>

      <button onClick={openComments} title="Comments" style={{background:'none',border:'none'}}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      <Link to="/saved" title="Saved">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="8" height="8" stroke="#fff" strokeWidth="1.2" /><rect x="13" y="3" width="8" height="8" stroke="#fff" strokeWidth="1.2" /><rect x="3" y="13" width="8" height="8" stroke="#fff" strokeWidth="1.2" /></svg>
      </Link>
    </div>
  )
}

export default BottomNav
