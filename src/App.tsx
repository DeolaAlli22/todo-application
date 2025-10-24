"use client"

import { useState } from "react"
import TodoList from "./components/TodoList"
import ChatBot from "./components/ChatBot"
import { useWebSocket } from "./hooks/useWebSocket"
import { useTodos } from "./hooks/useTodos"

export default function App() {
  const [activeTab, setActiveTab] = useState<"todos" | "chat">("todos")
  const { todos, addTodo, deleteTodo, toggleTodo, updateTodo } = useTodos()
  const { sendMessage, isConnected } = useWebSocket()

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto p-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Todo App</h1>
          <p className="text-slate-400">
            WebSocket Status:{" "}
            <span className={isConnected ? "text-green-400" : "text-red-400"}>
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("todos")}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${activeTab === "todos" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
          >
            My Todos
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${activeTab === "chat" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
          >
            AI Assistant
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {activeTab === "todos" && (
            <div className="lg:col-span-2">
              <TodoList
                todos={todos}
                onAddTodo={addTodo}
                onDeleteTodo={deleteTodo}
                onToggleTodo={toggleTodo}
                onUpdateTodo={updateTodo}
              />
            </div>
          )}

          {activeTab === "chat" && (
            <div className="lg:col-span-2">
              <ChatBot onSendMessage={sendMessage} todos={todos} />
            </div>
          )}

          {/* Sidebar - Always visible on desktop */}
          <div className="hidden lg:block">
            <ChatBot onSendMessage={sendMessage} todos={todos} />
          </div>
        </div>
      </div>
    </main>
  )
}
