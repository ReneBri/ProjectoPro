// styles
import './Login.css'

// hooks
import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'


export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const { login, isPending, error } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }
  
  return (
    <div>
      <div className="guest-login">
        <h2>Log in as a guest</h2>
        <p>(by clicking on one of these aliases)</p>
        <div className="guest-login-button-container">
          <button 
            className="btn" 
            onClick={() => {
              let user = "francheskia@francheskia.com"
              setEmail(user)
              setPassword(user)
              setTimeout(() => {
                login(user, user)
              }, 1000)
              }}>
                Francheskia
          </button>
          <button 
            className="btn" 
            onClick={() => {
              let user = "benryan@benryan.com"
              setEmail(user)
              setPassword(user)
              setTimeout(() => {
                login(user, user)
              }, 1000)
              }}>
                Ben Ryan
          </button>
          <button 
            className="btn" 
            onClick={() => {
              let user = "margo@margo.com"
              setEmail(user)
              setPassword(user)
              setTimeout(() => {
                login(user, user)
              }, 1000)
              }}>
                Margo
          </button>
          <button 
            className="btn" 
            onClick={() => {
              let user = "bobbylee@bobbylee.com"
              setEmail(user)
              setPassword(user)
              setTimeout(() => {
                login(user, user)
              }, 1000)
              }}>
                Bobby Lee
          </button>
        </div>
      </div>

      <hr />

      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Or Login with Email & Password here</h2>

        <label>
          <span>email:</span>
          <input 
            required
            type='email' 
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>

        <label>
          <span>password:</span>
          <input 
            required
            type='password' 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>

        {!isPending && <button className="btn">Login</button>}
        {isPending && <button className="btn" disabled>...loading</button>}
        {error && <div className="error">{error}</div>}

      </form>
    </div>
  )
}
