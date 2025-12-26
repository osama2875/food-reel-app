import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserRegister = () => {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const firstName = e.target.firstName.value
    const lastName = e.target.lastName.value
    const email = e.target.email.value
    const password = e.target.password.value

    try {
      const response = await axios.post(
        "https://zm-ai-backend.onrender.com/api/auth/user/register",
        {
          fullName: firstName + " " + lastName,
          email,
          password
        },
        { withCredentials: true }
      )

      console.log(response.data)
      navigate('/') // home → reels

    } catch (error) {
      console.error('User registration failed:', error)
      alert('Registration failed. Try again.')
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="h-stack">
          <div>
            <div className="auth-title">User Register</div>
            <div className="auth-sub">
              Create an account to order food and track deliveries.
            </div>
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="two-col">
            <div>
              <label className="form-label">First Name</label>
              <input
                className="input"
                name="firstName"
                placeholder="John"
                required
              />
            </div>

            <div>
              <label className="form-label">Last Name</label>
              <input
                className="input"
                name="lastName"
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div>
            <label className="form-label">Email</label>
            <input
              className="input"
              type="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="form-label">Password</label>
            <input
              className="input"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button className="btn" type="submit">
              Create Account
            </button>
            <button className="btn ghost" type="button">
              Cancel
            </button>
          </div>

          <div className="footer-note">
            Already have an account? <a href="/user/login">Sign in</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserRegister
