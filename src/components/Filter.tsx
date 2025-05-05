import { FC, useState } from 'react'

interface FilterProps {
  onSearch: (query: string) => void
  onFilter: (status: 'all' | 'completed' | 'pending') => void
  onSort: (order: 'asc' | 'desc') => void
}

const Filter: FC<FilterProps> = ({ onSearch, onFilter, onSort }) => {
  const [query, setQuery] = useState<string>('')
  const [status, setStatus] = useState<'all' | 'completed' | 'pending'>('all')
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'all' | 'completed' | 'pending'
    setStatus(value)
    onFilter(value)
  }

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'asc' | 'desc'
    setOrder(value)
    onSort(value)
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-3">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Rechercher une tâche..."
          value={query}
          onChange={handleSearchChange}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
        />
      </div>
      <div className="flex space-x-2">
        <select
          value={status}
          onChange={handleStatusChange}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md transition duration-150 ease-in-out"
        >
          <option value="all">Toutes</option>
          <option value="completed">Terminées</option>
          <option value="pending">En cours</option>
        </select>
        <select
          value={order}
          onChange={handleOrderChange}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md transition duration-150 ease-in-out"
        >
          <option value="desc">Plus récentes</option>
          <option value="asc">Plus anciennes</option>
        </select>
      </div>
    </div>
  )
}

export default Filter
