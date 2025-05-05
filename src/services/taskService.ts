// src/services/taskService.ts

import { supabase } from './supabaseClient'
import type { User } from '@supabase/supabase-js'
import type { Task } from './taskServiceType'

// — Authentification —
export const login = async (email: string, password: string): Promise<void> => {
  console.log('[Auth] login', email)
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    console.error('[Auth] login error', error)
    throw error
  }
  console.log('[Auth] login success', data)
}

export const logout = async (): Promise<void> => {
  console.log('[Auth] logout')
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('[Auth] logout error', error)
    throw error
  }
  console.log('[Auth] logout success')
}

// — Récupérer la session/utilisateur —
export const getUser = async (): Promise<User | null> => {
  console.log('[Auth] getUser')
  const res = await supabase.auth.getUser()
  if (res.error) {
    console.error('[Auth] getUser error', res.error)
    throw res.error
  }
  console.log('[Auth] current user', res.data.user)
  return res.data.user
}

// — CRUD Tâches avec debug —
export const fetchTasks = async (userId?: string): Promise<Task[]> => {
  console.log('[Tasks] fetchTasks')
  
  if (!userId) {
    console.error('[Tasks] fetchTasks error: No user ID provided')
    return []
  }
  
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[Tasks] fetchTasks error', error)
    throw error
  }
  console.log('[Tasks] fetchTasks success', data)
  return data ?? []
}

export const addTask = async (title: string, userId: string): Promise<Task> => {
  console.log('[Tasks] addTask', title)
  
  if (!userId) {
    throw new Error('Utilisateur non connecté')
  }
  
  const { data, error } = await supabase
    .from('tasks')
    .insert([{ title, user_id: userId }])
    .select()
  
  if (error) {
    console.error('[Tasks] addTask error', error)
    throw error
  }
  console.log('[Tasks] addTask success', data)
  return data![0]
}

export const updateTask = async (
  id: string,
  updates: Partial<Pick<Task, 'title' | 'is_complete'>>,
  userId?: string
): Promise<Task> => {
  console.log('[Tasks] updateTask', id, updates)
  
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('[Tasks] updateTask error', error)
    throw error
  }
  console.log('[Tasks] updateTask success', data)
  return data![0]
}

export const deleteTask = async (id: string, userId?: string): Promise<void> => {
  console.log('[Tasks] deleteTask', id)
  
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('[Tasks] deleteTask error', error)
    throw error
  }
  console.log('[Tasks] deleteTask success')
}
