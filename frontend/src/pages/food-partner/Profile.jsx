import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import VideoReels from '../../components/VideoReels'
import '../../styles/profile.css'
import axios from 'axios'

const Profile = () => {
  const { id } = useParams()

  const [profile, setProfile] = useState({
    businessName: 'Food Partner',
    address: '',
    totalMeals: 0,
    customers: 0,
    servers: 0,
    avatar: ''
  })

  // 🔗 Fetch food partner profile (LIVE BACKEND)
  useEffect(() => {
    if (!id) return

    axios
      .get(`https://zm-ai-backend.onrender.com/api/food-partner/${id}`)
      .then(res => {
        const data = res.data.foodPartner || res.data || {}

        setProfile({
          businessName: data.name || 'Food Partner',
          address: data.address || '',
          totalMeals: data.totalMeals || 0,
          customers: data.customers || 0,
          servers: data.servers || 0,
          avatar: data.avatar || ''
        })
      })
      .catch(err => {
        console.log('Partner profile fetch failed (fallback used)')
      })
  }, [id])

  return (
    <div className="partner-profile">
      <div className="profile-card">
        <div className="avatar-wrap">
          {profile.avatar ? (
            <img className="avatar" src={profile.avatar} alt="avatar" />
          ) : (
            <div className="avatar-placeholder">
              {profile.businessName.charAt(0)}
            </div>
          )}
        </div>

        <div className="profile-info">
          <h2 className="business-name">{profile.businessName}</h2>
          <p className="address">{profile.address}</p>

          <div className="stats">
            <div className="stat">
              <div className="num">{profile.totalMeals}</div>
              <div className="label">Total Meals</div>
            </div>

            <div className="stat">
              <div className="num">{profile.customers}</div>
              <div className="label">Customers</div>
            </div>

            <div className="stat">
              <div className="num">{profile.servers}</div>
              <div className="label">Servers</div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="reels-title">Reels</h3>
      <VideoReels partnerId={id} />
    </div>
  )
}

export default Profile
