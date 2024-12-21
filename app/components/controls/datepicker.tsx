import { Controller } from "react-hook-form";

interface IProps {  
  name: string;
  control: any;
}

export default function DatePicker({name, control}: IProps) {   

return (

  <Controller
    name={name}
    control={control} 
    render={({ field: { onChange, value }, fieldState: { error } }) => ( //onChange,
      <div>
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="grid-cols-12 col-span-12 md:grid-cols-4 md:col-span-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {error && <p className="text-red-500">{error.message}</p>}
      </div>
    )}
  /> 
)}