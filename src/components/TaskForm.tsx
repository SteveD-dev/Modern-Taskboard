import { useState, FC } from 'react'

interface TaskFormProps {
  onAdd: (title: string) => Promise<void>
}

const TaskForm: FC<TaskFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    try {
      await onAdd(title)
      setTitle('')
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex">
      <div className="flex w-full shadow-sm">
        <input
          type="text"
          placeholder="Nouvelle tâche…"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="flex-1 block w-full px-4 py-3 text-gray-900 border border-r-0 border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Ajouter
        </button>
      </div>
    </form>
  )
}

export default TaskForm
