
// import { createUrl } from "../lib/http"; 

 
// interface Item {
//   id: number;
//   name: string;
// }

// async function fetchData(): Promise<Item[]> {
   
//   const response = await fetch(createUrl('record-labels'), { cache: 'no-store' });

//   if (!response.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   return response.json();
// }

// export default async function SelectComponent() {
 
//   const items = await fetchData();  

//   return (
//     <>       
//       <select id="items-select" name="items" className="grid-cols-12 col-span-12 md:grid-cols-10 md:col-span-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//         <option value="0">Select a record label...</option>
//         {items.map((item) => (
//           <option key={item.id} value={item.id}>
//             {item.name}
//           </option>
//         ))}
//       </select>
//     </>
//   );
// }






//000000000000000000000000000000000000000000000000000000

"use client";

import { useState, useEffect } from 'react';
import { createUrl } from '../lib/http';

interface Option {
  id: number; // Adjust this type based on your API response
  name: string; // Adjust this type based on your API response
}

export default function SelectComponent() {
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchOptions = async () => {
      try {
        const response = await fetch('https://localhost:50925/api/v1/record-labels', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Failed to fetch options');
        }
        const data: Option[] = await response.json();
        setOptions(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(Number(event.target.value));
  };

  if (loading) return <p>Loading options...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    < >
       
      <select
        id="api-select"
        value={selectedOption ?? ''}
        onChange={handleSelectChange}
        className="grid-cols-12 col-span-12 md:grid-cols-10 md:col-span-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
         <option value="0">Select a record label...</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {selectedOption !== null && (
        <p>You selected: {options.find((opt) => opt.id === selectedOption)?.name}</p>
      )}
    </>
  );
}


//0000000000000000000000000000000000000

// import { Form } from "react-bootstrap";
// import { Field, ErrorMessage } from "formik"; 
// import { useEffect } from "react";

// function CompanySelect(props) {
//   const [options, setOptions] = useState(RecordLabel[] = []);

//   useEffect(() => {
//     async function fetchData() {
//       // Fetch data
//       const { data } = await fetch('https://localhost:50925/api/v1/record-labels', { cache: 'no-store' });
//       const results = []
//       // Store results in the results array
//       data.forEach((value) => {
//         results.push({
//           key: value.name,
//           value: value.id,
//         });
//       });
//       // Update the options state
//       setOptions([
//         {key: 'Select a company', value: ''}, 
//         ...results
//       ])
//     }

//     // Trigger the fetch
//     fetchData();
//   }, []);

//   const { label, name, ...rest } = props;

//   return (
//     <Form.Group className="mb-2">
//       <Form.Label htmlFor={name}>{label}</Form.Label>
//       <Field id={name} name={name} {...rest} as={Form.Select}>
//         {options.map((option) => {
//           return (
//             <option key={option.value} value={option.value}>
//               {option.key}
//             </option>
//           );
//         })}
//       </Field>
//       <ErrorMessage className="text-danger" name={name} component={Form.Text} />
//     </Form.Group>
//   );
// }

// export default CompanySelect;