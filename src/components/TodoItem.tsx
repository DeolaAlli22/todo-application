"use client"

import { useState } from "react"
import type { Todo } from "../types/todo"

interface TodoItemProps {
   todo: Todo
   onDelete: (id: string) => void
   onToggle: (id: string) => void
   onUpdate: (id: string, title: string) => void
}

export default function TodoItem({ todo, onDelete, onToggle, onUpdate }: TodoItemProps) {
   const [isEditing, setIsEditing] = useState(false)
   const [editValue, setEditValue] = useState(todo.title)

   const handleSave = () => {
      if (editValue.trim()) {
         onUpdate(todo.id, editValue)
         setIsEditing(false)
      }
   }

   return (
      <div className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
         <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="w-5 h-5 cursor-pointer"
         />

         {isEditing ? (
            <input
               type="text"
               value={editValue}
               onChange={(e) => setEditValue(e.target.value)}
               onBlur={handleSave}
               onKeyPress={(e) => e.key === "Enter" && handleSave()}
               autoFocus
               className="flex-1 px-2 py-1 bg-slate-600 text-white rounded border border-blue-500 focus:outline-none"
            />
         ) : (
            <span
               onClick={() => setIsEditing(true)}
               className={`flex-1 cursor-pointer ${todo.completed ? "line-through text-slate-400" : "text-white"}`}
            >
               {todo.title}
            </span>
         )}

         <button
            onClick={() => onDelete(todo.id)}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
         >
            Delete
         </button>
      </div>
   )
}
