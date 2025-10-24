"use client"

import { useState } from "react"
import TodoItem from "./TodoItem"
import type { Todo } from "../types/todo"

interface TodoListProps {
   todos: Todo[]
   onAddTodo: (title: string) => void
   onDeleteTodo: (id: string) => void
   onToggleTodo: (id: string) => void
   onUpdateTodo: (id: string, title: string) => void
}

export default function TodoList({ todos, onAddTodo, onDeleteTodo, onToggleTodo, onUpdateTodo }: TodoListProps) {
   const [input, setInput] = useState("")

   const handleAddTodo = () => {
      if (input.trim()) {
         onAddTodo(input)
         setInput("")
      }
   }

   const completedCount = todos.filter((t) => t.completed).length

   return (
      <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
         <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">My Tasks</h2>
            <p className="text-slate-400 mb-4">
               {completedCount} of {todos.length} completed
            </p>

            {/* Add Todo Input */}
            <div className="flex gap-2">
               <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
                  placeholder="Add a new task..."
                  className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
               />
               <button
                  onClick={handleAddTodo}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
               >
                  Add
               </button>
            </div>
         </div>

         {/* Todo Items */}
         <div className="space-y-2">
            {todos.length === 0 ? (
               <p className="text-slate-400 text-center py-8">No tasks yet. Add one to get started!</p>
            ) : (
               todos.map((todo) => (
                  <TodoItem
                     key={todo.id}
                     todo={todo}
                     onDelete={onDeleteTodo}
                     onToggle={onToggleTodo}
                     onUpdate={onUpdateTodo}
                  />
               ))
            )}
         </div>
      </div>
   )
}
