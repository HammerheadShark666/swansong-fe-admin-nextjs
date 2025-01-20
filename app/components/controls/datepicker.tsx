import {Controller } from "react-hook-form";
 
interface IProps {  
  name: string;
  control: any;
}

export default function DatePicker({name, control}: IProps) {   

return (

  <Controller
    name={name}
    control={control} 
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <div>
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="p-2 grid-cols-12 col-span-12 md:grid-cols-4 md:col-span-4"
        />
        {error && <p className="text-red-500">{error.message}</p>}
      </div>
    )}
  /> 
)}