import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import VideoReels from '../../components/VideoReels'
import '../../styles/profile.css'
import axios from 'axios'

const Profile = () => {
  const { id } = useParams()

  const [profile, setProfile] = useState({
    businessName: 'Awesome Bites',
    address: '123 Food Street, Flavor Town',
    totalMeals: 1200,
    customers: 850,
    servers: 12,
    avatar: ''
  })

  // Try to fetch partner info if backend exposes an endpoint. Fallback to mock data.
  useEffect(() => {
    if (!id) return

    axios
      .get(`http://localhost:3000/api/food-partner/${id}`)
      .then(res => {
        // backend shape may vary; attempt to pick reasonable fields
        const d = res.data.foodPartner || res.data || {}
        setProfile(prev => ({ ...prev, ...d }))
      })
      .catch(() => {
        // silent fallback — keep mock data
      })
  }, [id])

  return (
    <div className="partner-profile">
      <div className="profile-card">
        <div className="avatar-wrap">
          {profile.avatar ? (
            <img className="avatar" src={profile.avatar} alt="avatar" />
          ) : (
            <div className="avatar-placeholder">{(profile.businessName || '').charAt(0)}</div>
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
      {/* Pass partner id to VideoReels to show only this partner's videos when available */}
      <VideoReels partnerId={id} />
    </div>
  )
}

export default Profile
