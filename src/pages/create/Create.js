// styles
import './Create.css'

// hooks
import { useEffect, useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useFirestore } from '../../hooks/useFirestore'

// components
import Select from 'react-select'

// config
import { timestamp } from '../../firebase/config'

// context
import { useAuthContext } from '../../hooks/useAuthContext'

// routing
import { useHistory } from 'react-router-dom'

// category array
const categories = [
  { value: 'development', label: 'Development'},
  { value: 'design', label: 'Design'},
  { value: 'sales', label: 'Sales'},
  { value: 'marketing', label: 'Marketing'}
]


export default function Create() {

  const[name, setName] = useState('')
  const[details, setDetails] = useState('')
  const[dueDate, setDueDate] = useState('')
  const[category, setCategory] = useState('')
  const[assignedUsers, setAssignedUsers] = useState([])
  const[formError, setFormError] = useState(null)

  const { documents } = useCollection('users')
  const [users, setUsers] = useState([])

  const { user } = useAuthContext()

  const { response, addDocument } = useFirestore('projects')

  let history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)

    if(!category){
      setFormError('Please assign a category')
      return
    }

    if(assignedUsers.length < 1){
      setFormError('Please assign the project to at least 1 user')
      return
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    const assignedUsersList = assignedUsers.map((user) => {
      return{ 
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.id
      }
    })

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList
    }
    
    await addDocument(project)

    if(!response.error) {
      history.push("/")
    }
    console.log(project)
  }

  useEffect(() => {
    if(documents){
      let options = documents.map((user) => {
        return { value: user, label: user.displayName}
      })
    
      setUsers(options)
    }
    
  }, [documents])




  return (
    <div className="create-form">

      <h2 className="page-title">Create a new project</h2>

      <form onSubmit={handleSubmit}>

        <label>
          <span>Project name:</span>
          <input 
            required
            type="text"
            onChange={(e) => {setName(e.target.value)}}
            value={name}
          />
        </label>

        <label>
          <span>Project details:</span>
          <textarea 
            required
            type="text"
            onChange={(e) => {setDetails(e.target.value)}}
            value={details}
          ></textarea>
        </label>

        <label>
          <span>Set due date:</span>
          <input 
            required
            type="date"
            onChange={(e) => {setDueDate(e.target.value)}}
            value={dueDate}
          />
        </label>

        <label>
          <span>Project category:</span>
          <Select 
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>

        <label>
          <span>Assign to:</span>
          <Select 
            onChange={(option) => {setAssignedUsers(option)}}
            options={users}
            isMulti
          />
        </label>

        <button className='btn'>submit</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}
