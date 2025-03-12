"use client"
// import React, { useState, useRef, useEffect } from 'react';
// import { Send, Brain } from 'lucide-react';

// type Message = {
//   role: 'user' | 'assistant';
//   content: string;
// };

// const SYSTEM_PROMPT = `You are a gender-based violence support specialist. Follow these rules:
// 1. ALWAYS include relevant statistics from this data:
//    - Psychological: 45%
//    - Physical: 35%
//    - Sexual: 28%
//    - Economic: 22%
// 2. Offer support resources and ask follow-up questions
// 3. Use clear formatting with bullet points and line breaks
// 4. Maintain empathetic, professional tone
// 5. Never provide medical/legal advice
// 6. If unsure, direct to official resources`;

// function ChatApp() {
//   const [messages, setMessages] = useState<Message[]>([{
//     role: 'assistant',
//     content: "Hello! I'm here to provide information about gender-based violence. How can I help you today?"
//   }]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const chatContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim() || isLoading) return;

//     // Add user message
//     const userMessage: Message = { role: 'user', content: input };
//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       // API call to DeepSeek
//       const response = await fetch('/api/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           model: 'deepseek-chat',
//           messages: [
//             { role: 'system', content: SYSTEM_PROMPT },
//             ...messages,
//             userMessage
//           ],
//           temperature: 0.7,
//           max_tokens: 500
//         })
//       });
//       console.log(response);

//       if (!response.ok) throw new Error('API request failed');

//       const data = await response.json();
//       const aiResponse = data.choices[0].message.content;
      
//       // Add AI response
//       setMessages(prev => [...prev, { 
//         role: 'assistant', 
//         content: aiResponse 
//       }]);
//     } catch (error) {
//       console.error('Error:', error);
//       setMessages(prev => [...prev, {
//         role: 'assistant',
//         content: "⚠️ Connection error. Please try again or contact support directly:\n\n• National Hotline: 1-800-799-7233\n• Emergency Services: 911"
//       }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-50">
//       <header className="bg-white border-b border-gray-200 py-4 px-4">
//         <div className="max-w-3xl mx-auto flex items-center gap-3">
//           <Brain className="w-8 h-8 text-purple-600" />
//           <h1 className="text-xl font-semibold text-gray-800">Gender Violence Support Assistant</h1>
//         </div>
//       </header>

//       <main className="flex-1 overflow-auto p-4">
//         <div 
//           ref={chatContainerRef}
//           className="max-w-3xl mx-auto space-y-4"
//         >
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
//             >
//               <div
//                 className={`max-w-[80%] rounded-lg px-4 py-2 ${
//                   message.role === 'user'
//                     ? 'bg-purple-600 text-white'
//                     : 'bg-white shadow text-gray-800'
//                 }`}
//               >
//                 <div className="whitespace-pre-line">{message.content}</div>
//               </div>
//             </div>
//           ))}
          
//           {isLoading && (
//             <div className="flex justify-start">
//               <div className="bg-white shadow rounded-lg px-4 py-2">
//                 <div className="flex gap-1">
//                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
//                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>

//       <footer className="bg-white border-t border-gray-200 p-4">
//         <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Ask about gender-based violence..."
//             className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
//             disabled={isLoading}
//           />
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="px-4 py-2 bg-purple-600 text-white rounded flex items-center gap-2 disabled:bg-purple-300 hover:bg-purple-700 transition-colors"
//           >
//             <Send className="w-4 h-4" />
//           </button>
//         </form>
//       </footer>
//     </div>
//   );
// }

// export default ChatApp;





import React, { useState, useRef, useEffect } from 'react';
import { Send, Brain } from 'lucide-react';
import type { Message } from '@/app/ai/type';
import { Button } from '@/components/ui/button';

// Helper function to generate responses based on keywords
const generateResponse = (input: string): string => {
  const lowercaseInput = input.toLowerCase();
  
  if (lowercaseInput.includes('psychological') || lowercaseInput.includes('mental')) {
    return "According to our data, psychological violence represents the highest percentage at 45% of reported cases. This form of abuse includes emotional manipulation, threats, and controlling behavior. Would you like to know more about specific types of psychological violence or available support services?";
  }
  
  if (lowercaseInput.includes('physical')) {
    return "Physical violence accounts for 35% of reported cases. This significant number highlights the ongoing challenge of addressing direct physical abuse in our communities. I can provide more information about prevention strategies or support resources if you're interested.";
  }
  
  if (lowercaseInput.includes('sexual')) {
    return "Sexual violence makes up 28% of reported cases. This statistic is particularly concerning and may be underreported due to various social and personal barriers. Would you like information about confidential support services or reporting options?";
  }
  
  if (lowercaseInput.includes('economic') || lowercaseInput.includes('financial')) {
    return "Economic violence represents 22% of reported cases. This includes financial control, preventing access to resources, and economic dependence exploitation. I can provide information about financial independence resources and support services.";
  }
  
  if (lowercaseInput.includes('statistics') || lowercaseInput.includes('data') || lowercaseInput.includes('numbers')) {
    return "Our current data shows the following distribution of gender-based violence:\n\n• Psychological Violence: 45%\n• Physical Violence: 35%\n• Sexual Violence: 28%\n• Economic Violence: 22%\n\nThese numbers highlight the complex nature of gender-based violence and the need for comprehensive support systems. Would you like to explore any specific category in more detail?";
  }
  
  if (lowercaseInput.includes('help') || lowercaseInput.includes('support')) {
    return "If you or someone you know is experiencing gender-based violence, here are some immediate resources:\n\n1. Emergency Services: Call 911 if you're in immediate danger\n2. National Domestic Violence Hotline: Available 24/7\n3. Local Support Organizations: Provide counseling and shelter services\n4. Legal Aid Services: Offer free legal consultation\n\nWould you like more specific information about any of these resources?";
  }
  
  return "I'm here to provide information about gender-based violence statistics and support resources. You can ask me about:\n\n• Different types of violence (psychological, physical, sexual, economic)\n• Current statistics and trends\n• Available support services\n• Prevention strategies\n• Reporting options\n\nWhat would you like to know more about?";
};

function App() {
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    content: "Hello! I'm here to provide information about gender-based violence. How can I help you today?"
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate response delay for more natural interaction
    setTimeout(() => {
      const response = generateResponse(input);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Brain className="w-8 h-8 text-purple-600" />
          <h1 className="text-xl font-semibold text-gray-800">Gender Violence Support Assistant</h1>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4">
        <div 
          ref={chatContainerRef}
          className="max-w-3xl mx-auto space-y-4"
        >
          {/* Chat Messages */}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white shadow text-gray-800'
                }`}
              >
                <div className="whitespace-pre-line">{message.content}</div>
              </div>
            </div>
          ))}
          
          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white shadow rounded-lg px-4 py-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about gender-based violence..."
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-purple-600 text-white rounded flex items-center gap-2 disabled:bg-purple-300 hover:bg-purple-700 transition-colors"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </footer>
    </div>
  );
}

export default App; 