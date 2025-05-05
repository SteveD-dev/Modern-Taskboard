// ================================
// src/stores/taskStore.ts
// ================================
import create from 'zustand'
import type { Task } from '../services/taskServiceType'
import {
  fetchTasks as fetchTasksService,
  addTask as addTaskService,
  updateTask as updateTaskService,
  deleteTask as deleteTaskService,
} from '../services/taskService'
import { useAuth } from '../hook/useAuth'

interface TaskState {
  tasks: Task[]
  loading: boolean
  error: string | null
  searchQuery: string
  filterStatus: 'all' | 'completed' | 'pending'
  sortOrder: 'asc' | 'desc'
  loadTasks: (userId?: string) => Promise<void>
  addTask: (title: string, userId?: string) => Promise<void>
  updateTask: (id: string, updates: Partial<Pick<Task, 'title' | 'is_complete'>>, userId?: string) => Promise<void>
  deleteTask: (id: string, userId?: string) => Promise<void>
  setSearchQuery: (query: string) => void
  setFilterStatus: (status: 'all' | 'completed' | 'pending') => void
  setSortOrder: (order: 'asc' | 'desc') => void
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,
  searchQuery: '',
  filterStatus: 'all',
  sortOrder: 'desc',

  loadTasks: async (userId) => {
    set({ loading: true, error: null })
    try {
      // If userId is not provided, try to get it from the auth hook
      if (!userId) {
        const { user } = useAuth.getState()
        userId = user?.id
      }
      
      if (userId) {
        const tasks = await fetchTasksService(userId)
        set({ tasks })
      } else {
        // If still no userId, set empty tasks
        set({ tasks: [], error: 'User not authenticated' })
      }
    } catch (err: any) {
      set({ error: err.message })
    } finally {
      set({ loading: false })
    }
  },

  addTask: async (title, userId) => {
    set({ loading: true, error: null })
    try {
      // If userId is not provided, try to get it from the auth hook
      if (!userId) {
        const { user } = useAuth.getState()
        userId = user?.id
      }
      
      if (!userId) {
        set({ error: 'User not authenticated' })
        return
      }
      
      await addTaskService(title, userId)
      await get().loadTasks(userId)
    } catch (err: any) {
      set({ error: err.message })
    } finally {
      set({ loading: false })
    }
  },

  updateTask: async (id, updates, userId) => {
    set({ loading: true, error: null })
    try {
      // If userId is not provided, try to get it from the auth hook
      if (!userId) {
        const { user } = useAuth.getState()
        userId = user?.id
      }
      
      await updateTaskService(id, updates)
      await get().loadTasks(userId)
    } catch (err: any) {
      set({ error: err.message })
    } finally {
      set({ loading: false })
    }
  },

  deleteTask: async (id, userId) => {
    set({ loading: true, error: null })
    try {
      // If userId is not provided, try to get it from the auth hook
      if (!userId) {
        const { user } = useAuth.getState()
        userId = user?.id
      }
      
      await deleteTaskService(id)
      await get().loadTasks(userId)
    } catch (err: any) {
      set({ error: err.message })
    } finally {
      set({ loading: false })
    }
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterStatus: (status) => set({ filterStatus: status }),
  setSortOrder: (order) => set({ sortOrder: order }),
}))