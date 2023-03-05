// styles and images
import './Navbar.css'
import Temple from "../assets/temple.svg"

// nav components
import { Link } from 'react-router-dom'

// hook
import { useLogout } from '../hooks/useLogout'

// context api
import { useAuthContext } from '../hooks/useAuthContext'


export default function Navbar() {

    const { user } = useAuthContext()

    const { isPending, logout } = useLogout()

  return (
    <div className="navbar">
        <ul>
            <li className="logo">
                <img src={Temple} alt="out logo" />
            </li>

            {!user && (
                <>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                </>
            )}

            {user && (
                <li>
                    {!isPending ? <button className="btn" onClick={logout}>Logout</button> :
                    <button className="btn" disabled>logging out...</button>}
                </li>)}
        </ul>
    </div>
  )
}
