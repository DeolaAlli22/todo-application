"use client"

import { useState, useRef, useEffect } from "react"
import type { Todo } from "../types/todo"

interface Message {
   id: string
   role: "user" | "assistant"
   content: string
   timestamp: Date
}

interface ChatBotProps {
   onSendMessage: (message: string) => void
   todos: Todo[]
}

export default function ChatBot({ onSendMessage, todos }: ChatBotProps) {
   const [messages, setMessages] = useState<Message[]>([
      {
         id: "1",
         role: "assistant",
         content:
            "Hi! I'm your AI assistant. I can help you manage your todos and answer questions. What can I do for you?",
         timestamp: new Date(),
      },
   ])
   const [input, setInput] = useState("")
   const [isLoading, setIsLoading] = useState(false)
   const messagesEndRef = useRef<HTMLDivElement>(null)

   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
   }

   useEffect(() => {
      scrollToBottom()
   }, [messages])

   const handleSendMessage = async () => {
      if (!input.trim()) return

      // Add user message
      const userMessage: Message = {
         id: Date.now().toString(),
         role: "user",
         content: input,
         timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setInput("")
      setIsLoading(true)

      // Simulate API call to OpenAI
      // In production, this would call your backend API
      setTimeout(() => {
         const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: generateMockResponse(input, todos),
            timestamp: new Date(),
         }
         setMessages((prev) => [...prev, assistantMessage])
         setIsLoading(false)
      }, 1000)

      onSendMessage(input)
   }

   return (
      <div className="bg-slate-800 rounded-lg p-6 shadow-lg flex flex-col h-96">
         <h2 className="text-2xl font-bold text-white mb-4">AI Assistant</h2>

         {/* Messages */}
         <div className="flex-1 overflow-y-auto mb-4 space-y-3">
            {messages.map((message) => (
               <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                     className={`max-w-xs px-4 py-2 rounded-lg ${message.role === "user" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-100"
                        }`}
                  >
                     <p className="text-sm">{message.content}</p>
                  </div>
               </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                  <div className="bg-slate-700 text-slate-100 px-4 py-2 rounded-lg">
                     <p className="text-sm">Thinking...</p>
                  </div>
               </div>
            )}
            <div ref={messagesEndRef} />
         </div>

         {/* Input */}
         <div className="flex gap-2">
            <input
               type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
               placeholder="Ask me anything..."
               className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none text-sm"
               disabled={isLoading}
            />
            <button
               onClick={handleSendMessage}
               disabled={isLoading}
               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50"
            >
               Send
            </button>
         </div>
      </div>
   )
}

// Mock response generator - replace with actual OpenAI API call
function generateMockResponse(userInput: string, todos: Todo[]): string {
   const lowerInput = userInput.toLowerCase()

   if (lowerInput.includes("how many") || lowerInput.includes("count")) {
      return `You have ${todos.length} total tasks, with ${todos.filter((t) => t.completed).length} completed.`
   }

   if (lowerInput.includes("list") || lowerInput.includes("show")) {
      const todoList = todos.map((t) => `${t.completed ? "✓" : "○"} ${t.title}`).join("\n")
      return `Here are your tasks:\n${todoList || "No tasks yet"}`
   }

   if (lowerInput.includes("help")) {
      return "I can help you with your todos! Try asking me to:\n- Show your tasks\n- Count your tasks\n- Get productivity tips"
   }

   return "That's interesting! I'm here to help you manage your tasks. What would you like to do?"
}
