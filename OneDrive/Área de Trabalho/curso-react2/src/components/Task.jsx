import { ChevronRightIcon, TrashIcon } from "lucide-react"

import { useNavigate } from "react-router-dom"

/* eslint-disable react/prop-types */
const Tasks = ({ tasks, onTaskClick, handleClicDelete }) => {

    const navigate = useNavigate()

    function onSeeDetailsClick(task) {
        navigate(`/task?title=${task.title}&description=${task.description}`)
    }

    return (
        <div>
            <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">{tasks.map((task) =>
                <li key={task.id} className="flex gap-2">
                    <button onClick={() => onTaskClick(task.id)} className={`bg-slate-400 text-left text-white p-2 rounded-md w-full ${task.isCompleted && "line-through"}`}>
                        {task.title}
                    </button>
                    <button onClick={() => onSeeDetailsClick(task)} className="bg-slate-400 p-2 rounded-md text-white">
                        <ChevronRightIcon />
                    </button>
                    <button onClick={() => handleClicDelete(task.id)} className="bg-slate-400 p-2 rounded-md text-white">
                        <TrashIcon />
                    </button>
                </li>)}
            </ul>
        </div>
    )
}

export default Tasks