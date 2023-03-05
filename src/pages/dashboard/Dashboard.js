import './Dashboard.css'

import { useCollection } from '../../hooks/useCollection'
import { useEffect, useState } from "react"

// components
import ProjectList from '../../components/ProjectList'
import ProjectFilter from './ProjectFilter'
import { useAuthContext } from '../../hooks/useAuthContext'


export default function Dashboard() {

  const { documents, error } = useCollection('projects')

  const { user } = useAuthContext()

  const [currentFilter, setCurrentFilter] = useState("all")

  const [filteredProjects, setFilteredProjects] = useState([])

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }
  // console.log(user, documents)


  useEffect(() => {
    let tempFilteredProjects = []

    if(currentFilter === "all"){

      setFilteredProjects(documents)

    } else if (currentFilter === "mine") {

      documents.forEach(item => {
        item.assignedUsersList.forEach(usr => {
          if(usr.id.includes(user.uid)){
            tempFilteredProjects.push(item)
          }
        })
      })

      setFilteredProjects(tempFilteredProjects)

    } else {

      tempFilteredProjects = documents.filter(project => {
        return project.category === currentFilter
      })

      setFilteredProjects(tempFilteredProjects)

    }

  }, [currentFilter, documents, user.uid])
  

 
  

  return (
    <div className="dashboard">
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />}
      {filteredProjects && filteredProjects.length > 0 && <ProjectList projects={filteredProjects}/>}
    </div>
  )
}
