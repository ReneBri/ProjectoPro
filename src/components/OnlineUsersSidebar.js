// styles
import { useCollection } from '../hooks/useCollection'
import Avatar from './Avatar'
import './OnlineUsersSidebar.css'


export default function OnlineUsersSidebar() {

    const {documents, error } = useCollection('users')


  return (
    <div className="user-list">
        <h2>All Users</h2>
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
