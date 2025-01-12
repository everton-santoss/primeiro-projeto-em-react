import { useEffect, useState } from 'react'
import './App.css'
import AddTask from './components/AddTask'
import Tasks from './components/Task'

import { v4 } from 'uuid'

function App() {

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  )

  function onTaskClick(taskId) {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted }
      }
      return task
    })
    setTasks(newTasks)
  }

  function handleClicDelete(taskId) {
    const newTasks = tasks.filter(task => task.id !== taskId)
    setTasks(newTasks)
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title: title,
      description: description,
      isCompleted: false
    }
    setTasks([...tasks, newTask])
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  // USEEFFECT PASSO COM UMA LISTA VAZIA SÓ CHAMA UMA VEZ QUANDO O USUARIO ENTRA
  useEffect(() => {
    // CHAMAR API 
    const fetchTask = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      const data = await response.json();

      //PEGAR OS DADOS QUE ELA RETORNA
      setTasks(data)
      //ARMAZANAR/PERSISTIR ESSES DADOS NO STATE
    }
    //fetchTask()
  }, [])

  return (
    <>
      <div className='w-screen h-screen bg-slate-800 flex justify-center p-6'>
        <div className='w-[500px] space-y-4'>
          <h1 className="text-3xl text-slate-100 font-bold text-center">Gerenciador de tarefas</h1>
          <AddTask onAddTaskSubmit={onAddTaskSubmit} />
          <Tasks tasks={tasks}
            onTaskClick={onTaskClick}
            handleClicDelete={handleClicDelete}
          />
        </div>
      </div>
    </>
  )
}

export default App
