import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PartnerRegister = () => {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()

    const businessName = e.target.businessName.value;
    const email = e.target.email.value;
    const password = e.target.password.value; 
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value; 

     axios.post("http://localhost:3000/api/auth/food-partner/register",{
      name : businessName,
      email,
      password,
      contactName,
      phone,
      address
    }, {withCredentials: true})
    .then(response => { 
      console.log(response.data);
      navigate('/create-food');
    })
    .catch(error => {
      console.error('There was an error registering the food partner!', error );
    })
    
  }
  return (
    <div className="auth-wrap">
      <div className="auth-card auth-card--dark">
        <div className="h-stack">
          <div>
            <div className="auth-title">Food Partner Register</div>
            <div className="auth-sub">Create an account to manage your menu and orders.</div>
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div>
            <label className="form-label">Business Name</label>
            <input className="input" name="businessName" placeholder="Restaurant Name" />
          </div>

          <div>
            <label className="form-label">Contact Email</label>
            <input className="input" type="email" name="email" placeholder="owner@example.com" />
          </div>

          <div className="two-col">
            <div>
              <label className="form-label">Contact Name</label>
              <input className="input" name="contactName" placeholder="Jane Sharma" />
            </div>

            <div>
              <label className="form-label">Phone</label>
              <input className="input" name="phone" type="tel" placeholder="(123) 456-7890" />
            </div>
          </div>

          <div>
            <label className="form-label">Address</label>
            <textarea className="input" name="address" rows={3} placeholder="123 Street, City, State, ZIP"></textarea>
          </div>

          <div>
            <label className="form-label">Password</label>
            <input className="input" name="password" type="password" placeholder="••••••••" />
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button className="btn" type="submit">Create Account</button>
            <button className="btn ghost" type="button">Cancel</button>
          </div>

          <div className="footer-note">Already onboarding? <a href="/food-partner/login">Sign in</a></div>
        </form>
      </div>
    </div>
  )
}

export default PartnerRegister
