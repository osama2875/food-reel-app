import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const UserLogin = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = e.target.email.value;
    const password = e.target.password.value;

    const responce = await axios.post("http://localhost:3000/api/auth/user/login",{
      email,
      password
    }, {withCredentials: true})
    console.log(responce.data);
    navigate('/')
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="h-stack">
          <div>
            <div className="auth-title">User Login</div>
            <div className="auth-sub">Welcome back — sign in to continue.</div>
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div>
            <label className="form-label">Email</label>
            <input className="input" type="email" name='email' placeholder="you@example.com" />
          </div>

          <div>
            <label className="form-label">Password</label>
            <input className="input" type="password" name='password' placeholder="••••••••" />
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button className="btn" type="submit">Sign in</button>
            <button className="btn ghost" type="button">Forgot</button>
          </div>

          <div className="auth-links">
            <a className="auth-link" href="/user/register">Register as User</a>
            <a className="auth-link" href="/food-partner/register">Register as Food Partner</a>
          </div>

          <div className="footer-note">New here? <a href="/user/register">Create an account</a></div>
        </form>
      </div>
    </div>
  )
}

export default UserLogin
