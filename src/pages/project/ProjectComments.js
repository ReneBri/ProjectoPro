// hooks
import { useState } from 'react'

// firebase
import { timestamp } from '../../firebase/config'
import { useFirestore } from '../../hooks/useFirestore'

// context
import { useAuthContext } from '../../hooks/useAuthContext'

// cool date formatting
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

// components
import Avatar from '../../components/Avatar'


export default function ProjectComments({ project }) {

    const { response, updateDocument } = useFirestore('projects')

    const [newComment, setNewComment] = useState('')

    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random()
        }
        await updateDocument(project.id, { comments: [ ...project.comments, commentToAdd] })
        
        if(!response.error) {
            setNewComment('')
        }
    }

  return (
    <div className="project-comments" onSubmit={handleSubmit}>
        <h4>Project Comments</h4>

        <ul>
            {project.comments.length > 0 && project.comments.map(comment => (
                <li key={comment.id}>
                    <div className="comment-author">
                        <Avatar src={comment.photoURL} />
                        <p>{comment.displayName}</p>
                    </div>
                    <div className='comment-date'>
                        <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}</p>
                    </div>
                    <div className="comment-content">
                        <p>{comment.content}</p>
                    </div>
                    
                </li>
            ))}
        </ul>

        <form className="add-comment">
            <label>
                <span>Add new comment:</span>
                <textarea
                    required
                    onChange={(e) => setNewComment(e.target.value)}
                    value={newComment}
                    ></textarea>
            </label>

            <button className="btn">Add Comment</button>

        </form>
    </div>
  )
}
