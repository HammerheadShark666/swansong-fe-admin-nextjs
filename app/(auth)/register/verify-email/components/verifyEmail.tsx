'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { verifyEmailRegistrationFromApi } from "../actions/verifyEmail";

interface IProps {
  token: string;
}

export default function VerifyEmail({token}: IProps) {
    
  const router = useRouter(); 
  const [verificationFailed, setVerificationFailed] = useState<boolean>(false);

  useEffect(()  => {    
    const verifyRegistration = async () => {
      const response = await verifyEmailRegistrationFromApi(token); 
      if(response.status == 200)        
        router.push("/login");     
      else
        setVerificationFailed(true);
    }

    verifyRegistration();

  });   

  return (
    <>
      {(verificationFailed) ? (<h1>Registration verification failed.</h1>) : (<h1>Verifying registration</h1>)}
    </>     
  ) 
}