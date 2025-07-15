import React from "react";
import SignupForm from "@/features/auth/components/SignupForm";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { SignupBodyT } from "@/features/auth";
export default function SignupPage() {
  const { signup } = useAuth();
  const {
    mutateAsync: signupMutate,
    data,
    isError,
    isPending,
    isSuccess,
  } = signup;
  const handleSignup = async (userCredentials: SignupBodyT) => {
    await signupMutate(userCredentials);
  };

  if (isSuccess && data) {
    console.log("data", data);
  }
  if (isError) {
    console.error("Signup failed");
  }

  if (isPending) {
    return <div>Loading...</div>;
  }
  return <SignupForm apiCall={handleSignup} />;
}
