import ResetPasswordForm from "../components/resetPasswordForm";
   
export default async function ResetPasswordPage({ params }:{ params: Promise<{ token: string }> } ) {   

  const {token} = await params;   
 
  return (
    <ResetPasswordForm token={token}></ResetPasswordForm> 
  );
};