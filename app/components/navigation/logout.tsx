'use client'

import { useRouter } from "next/navigation"; 

export default  function  Logout() { 

  const router = useRouter();   

  const handleLogout = async (event: React.MouseEvent) => {
  
    event.preventDefault();

    await fetch('/api/logout', {
      method: 'GET',
      credentials: 'same-origin', // Ensure cookies are sent with the request
    });
  
    router.push("/login"); 
  } 
  
  return (
    <button type="button" onClick={handleLogout}>Logout</button> 
  )
}