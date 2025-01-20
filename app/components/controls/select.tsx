'use client'

import { SelectItem } from "@/app/types/selectItem";
import { UseFormRegister, UseFormTrigger } from "react-hook-form";  

interface InputFieldProps {  
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  trigger: UseFormTrigger<any>; 
  items: SelectItem[];
  className?: string;
} 

export default function Select({name, register, items, className}: InputFieldProps) {
 
  return (
    <>       
      <select 
         id={name}  
         {...register(name)}  
         className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  ${className}`}      
          >
          <option value="">Select...</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
      </select>
    </>
  );
};