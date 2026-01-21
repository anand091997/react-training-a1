import { useState } from 'react'
import './App.css'
import AssignmentNavigation from './components/AssignmentNavigation'
import ProductList from './assignments/1.ProductList/ProductList'
import TodoList from './assignments/2.TodoList/TodoList'
import UserManagementApp from './assignments/3.UserManagementApp/UserManagementApp'

const App = () => {
  const [currentAssignment, setCurrentAssignment] = useState(1)

  const assignments = [
    {
      id: 1,
      title: 'Product List',
      component: ProductList
    },
    {
      id: 2,
      title: 'To Do List',
      component: TodoList
    },
    {
      id: 3,
      title: 'User Management Mini App',
      component: UserManagementApp
    }
  ]

  const handleSelectAssignment = (assignmentId) => {
    setCurrentAssignment(assignmentId)
  }

  const CurrentAssignmentComponent = assignments.find(a => a.id === currentAssignment)?.component || ProductList

  return (
    <>
      <AssignmentNavigation 
        assignments={assignments}
        currentAssignment={currentAssignment}
        onSelectAssignment={handleSelectAssignment}
      />
      <div className="assignment-content">
        <CurrentAssignmentComponent />
      </div>
    </>
  )
}

export default App
