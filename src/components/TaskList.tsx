import { FC } from 'react'
import { useTheme } from './ThemeProvider'
import TaskItem from './TaskItem'
import type { TaskListProps } from '../services/taskServiceType'
import Card from './ui/Card'

const TaskList: FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
  const theme = useTheme();
  
  // Container styles with minimum height to prevent layout shifts
  const containerStyles = {
    minHeight: tasks.length === 0 ? '200px' : `${Math.min(tasks.length * 70, 350)}px`,
    transition: 'min-height 0.3s ease-in-out'
  };

  if (tasks.length === 0) {
    return (
      <div style={containerStyles} className="flex items-center justify-center">
        <Card variant="flat" className="border-2 border-dashed border-secondary-200 p-8 text-center bg-secondary-50 w-full">
          <svg className="mx-auto h-12 w-12 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
          </svg>
          <h3 className={`mt-2 ${theme.components.text.h3}`}>Aucune tâche</h3>
          <p className={`mt-1 ${theme.components.text.small}`}>Commencez par créer votre première tâche.</p>
        </Card>
      </div>
    )
  }

  return (
    <div style={containerStyles} className="overflow-hidden mb-8">
      <ul className="mt-2 transition-all duration-300 ease-in-out">
        {tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onToggle={onToggle} 
            onDelete={onDelete} 
          />
        ))}
      </ul>
    </div>
  )
}

export default TaskList
