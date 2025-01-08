'use client'

import { SelectItem } from "@/app/types/selectItem";
import { UseFormRegister, UseFormTrigger } from "react-hook-form";  

interface InputFieldProps {  
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  trigger: UseFormTrigger<any>; 
  items: SelectItem[];
} 

export default function Select({name, register, items}: InputFieldProps) {
 
  return (
    <>       
      <select 
         id={name}  
         {...register(name)}        
         className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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