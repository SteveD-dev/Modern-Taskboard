// src/services/taskService.types.ts

/**
 * Type definitions for tasks used in taskService
 */
export interface Task {
  /** Unique identifier of the task */
  id: string
  /** ID of the user who owns the task */
  user_id: string
  /** Title or description of the task */
  title: string
  /** Completion status */
  is_complete: boolean
  /** Timestamp when the task was created */
  created_at: string
}

export interface TaskListProps {
  tasks: Task[]
  onToggle: (id: string, updates: { is_complete: boolean }) => Promise<void>
  is_complete?: boolean  
  onDelete: (id: string) => Promise<void>
}