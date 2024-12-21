import { Message } from "@/app/types/message";
 
interface IProps {  
  messages: Message[]; 
} 

export default function Messages({messages}: IProps) {
  return (
    <div>
      {messages.length > 0 && (
        <div className="p-4 border border-red-500 bg-red-100 rounded-md">
          <ul className="list-disc list-inside text-red-700">
            {messages.map((error, index) => (
              <li key={index}>{error.text}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
} 