// styles
import './OnlineUsersSidebar.css'

// hooks
import { useCollection } from '../hooks/useCollection'

// components
import Avatar from './Avatar'


export default function OnlineUsersSidebar() {

    const {documents, error } = useCollection('users')


  return (
    <div className="user-list">
        <h2>The Team</h2>
        {error && <div className="error">{error}</div>}
        {documents && documents.map((user) => (
            <div className="user-list-item" key={user.id}>
                {user.online && (<span className="online-user"></span>)}
                <span className="hidden-at-550px">{user.displayName}</span>
                <Avatar src={user.photoURL} />
            </div>
        ))}
    </div>
  )
}
