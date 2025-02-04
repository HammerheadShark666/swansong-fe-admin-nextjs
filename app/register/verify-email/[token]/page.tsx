import VerifyEmail from "../components/verifyEmail";

export default async function VerifyEmailPage({ params }:{ params: Promise<{ token: string }> } ) {      
  
  const {token} = await params; 
    
  return  (    
    <>       
      <div className="flex flex-col w-full border-gray-100 bg-white h-full flex-1 pl-4 pr-4">
        <VerifyEmail token={token}></VerifyEmail>
      </div>      
    </>   
  )
}; 