export type ResetPassword = {     
    email: string;
    currentPassword: string;
    password: string;
    confirmPassword: string;
    token: string;
  }