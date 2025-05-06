import { useState, useEffect, FC } from 'react'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import StatCard from '../components/ui/StatCard'
import Pagination from '../components/ui/Pagination'
import Footer from '../components/Footer'
import { fetchTasks, addTask, updateTask, deleteTask } from '../services/taskService'
import type { Task } from '../services/taskServiceType'
import { useAuth } from '../hook/useAuth'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Filter from '../components/Filter'

const Dashboard: FC = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [showingFullPage, setShowingFullPage] = useState(false)
  const INITIAL_DISPLAY_COUNT = 3
  const [expandedPages, setExpandedPages] = useState<Set<number>>(new Set())
  const ITEMS_PER_PAGE = 3
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])

  useEffect(() => {
    if (user) {
      loadTasks()
    } else {
      setTasks([])
      setLoading(false)
    }
  }, [user])

  const loadTasks = async () => {
    if (!user?.id) return
    
    setLoading(true)
    setError(null)
    try {
      const data = await fetchTasks(user.id)
      setTasks(data)
    } catch (err: any) {
      setError(err.message)
      console.error('Error loading tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let result = [...tasks];

    // Filter by search query
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase()
      result = result.filter(task => 
        task.title.toLowerCase().includes(lowerCaseQuery)
      )
    }

    // Filter by status
    if (filterStatus !== 'all') {
      result = result.filter(task => {
        if (filterStatus === 'completed') return task.is_complete
        return !task.is_complete
      })
    }

    // Sort by creation date
    result.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB
    })

    // Store the filtered and sorted tasks
    setFilteredTasks(result);
  }, [tasks, searchQuery, filterStatus, sortOrder]);

  // Get paginated tasks
  const getPaginatedTasks = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const pageItems = filteredTasks.slice(startIndex, endIndex);
    
    // Return all items for current page or just initial items
    if (showingFullPage) {
      return pageItems;
    } else {
      return pageItems.slice(0, INITIAL_DISPLAY_COUNT);
    }
  };

  // Get current page tasks
  const currentTasks = getPaginatedTasks();

  // Handle page change
  const handlePageChange = (page: number) => {
    // Save current scroll position
    const currentScrollPosition = window.scrollY;
    
    // Update page state
    setCurrentPage(page);
    // Don't reset showingFullPage if the page was already expanded before
    setShowingFullPage(expandedPages.has(page));
    
    // Use requestAnimationFrame to maintain scroll position
    requestAnimationFrame(() => {
      window.scrollTo({
        top: currentScrollPosition,
        behavior: 'auto'
      });
    });
  };
  
  // Handle load more
  const handleLoadMore = () => {
    // Mark this page as expanded
    setExpandedPages(prev => {
      const newSet = new Set(prev);
      newSet.add(currentPage);
      return newSet;
    });
    setShowingFullPage(true);
  };

  const handleAddTask = async (title: string) => {
    if (!user?.id) return
    
    try {
      await addTask(title, user.id)
      await loadTasks()
    } catch (err: any) {
      setError(err.message)
      console.error('Error adding task:', err)
    }
  }

  const handleToggleTask = async (id: string, updates: { is_complete: boolean }) => {
    try {
      await updateTask(id, updates)
      
      // Update the tasks list
      setTasks(tasks.map(task => {
        if (task.id === id) {
          return { ...task, ...updates }
        }
        return task
      }))
    } catch (err: any) {
      console.error('Error updating task:', err)
    }
  }

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id)
      setTasks(tasks.filter(task => task.id !== id))
    } catch (err: any) {
      console.error('Error deleting task:', err)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (err: any) {
      console.error('Error logging out:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="TaskBoard" 
        user={user} 
        onLogout={handleLogout} 
      />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Task Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <StatCard
                title="Total"
                value={tasks.length}
                variant="primary"
                icon={
                  <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                }
              />
              <StatCard
                title="Terminées"
                value={tasks.filter(t => t.is_complete).length}
                variant="success"
                icon={
                  <svg className="w-5 h-5 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                }
              />
              <StatCard
                title="En cours"
                value={tasks.filter(t => !t.is_complete).length}
                variant="warning"
                icon={
                  <svg className="w-5 h-5 text-warning-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                }
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 border-l-4 border-red-500 bg-red-50 text-red-700">
                <p className="font-medium">Erreur:</p>
                <p>{error}</p>
              </div>
            )}
            
            {/* Task Form */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Ajouter une tâche</h2>
              <TaskForm onAdd={handleAddTask} />
            </div>
            
            {/* Task Filter & List */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Mes tâches</h2>
                <Filter
                  onSearch={setSearchQuery}
                  onFilter={setFilterStatus}
                  onSort={setSortOrder}
                />
              </div>
              
              {loading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
                  <span className="ml-3 text-gray-600">Chargement...</span>
                </div>
              ) : (
                <div className="mt-8">
                  <TaskList 
                    tasks={currentTasks} 
                    onToggle={handleToggleTask} 
                    onDelete={handleDeleteTask} 
                  />
                  
                  {/* Pagination Controls */}
                   
                    <Pagination
                      totalItems={filteredTasks.length}
                      itemsPerPage={ITEMS_PER_PAGE}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                      onLoadMore={handleLoadMore}
                      initialDisplayCount={INITIAL_DISPLAY_COUNT}
                      showLoadMore={!showingFullPage}
                      className=""
                    />
                  

                 
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Veuillez vous connecter pour accéder à votre tableau de tâches.</p>
            <Link to="/login" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Se connecter
            </Link>
          </div>
        )}
      </main>
      
      <Footer 
        links={[
          { text: 'Accueil', url: '/' },
          { text: 'Confidentialité', url: '#' },
          { text: 'Conditions', url: '#' }
        ]}
      />
    </div>
  )
}

export default Dashboard
