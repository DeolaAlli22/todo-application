"use client"

import { useState, useEffect } from "react"
import type { Todo } from "../types/todo"

export function useTodos() {
   const [todos, setTodos] = useState<Todo[]>([])

   // Load from localStorage on mount
   useEffect(() => {
      const saved = localStorage.getItem("todos")
      if (saved) {
         setTodos(JSON.parse(saved))
      }
   }, [])

   // Save to localStorage whenever todos change
   useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos))
   }, [todos])

   const addTodo = (title: string) => {
      const newTodo: Todo = {
         id: Date.now().toString(),
         title,
         completed: false,
         createdAt: new Date(),
      }
      setTodos((prev) => [newTodo, ...prev])
   }

   const deleteTodo = (id: string) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
   }

   const toggleTodo = (id: string) => {
      setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
   }

   const updateTodo = (id: string, title: string) => {
      setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, title } : todo)))
   }

   return { todos, addTodo, deleteTodo, toggleTodo, updateTodo }
}
