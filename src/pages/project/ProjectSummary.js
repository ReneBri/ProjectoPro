// components
import Avatar from "../../components/Avatar";

// context
import { useAuthContext } from "../../hooks/useAuthContext";

// firestore
import { useFirestore } from "../../hooks/useFirestore";

// routing
import { useHistory } from 'react-router-dom'


export default function ProjectSummary({ project }) {

    const { deleteDocument } = useFirestore('projects')

    const { user } = useAuthContext()

    let history = useHistory()

    console.log(user)

    const handleClick = (e) => {
        deleteDocument(project.id)
        history.push('/')
    }
    
  return (
    <div className="project-summary-wrapper">
        <div className="project-summary">
            <h2 className="page-title">{project.name}</h2>
            <p>By {project.createdBy.displayName}</p>
            <p className="due-date">Project due by {project.dueDate.toDate().toDateString()}</p>
            <p className="details">{project.details}</p>
            <h4>Project assigned to:</h4>
            <div className="assigned-users">
                {project.assignedUsersList.map(user => (
                    <div key={user.photoURL}>
                        <Avatar src={user.photoURL} />
                    </div>
                ))}
            </div>
        </div>
        {user.uid === project.createdBy.id && <button className="btn" onClick={handleClick}>Mark as complete / delete</button>}
    </div>
  )
}
