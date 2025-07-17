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

  let displayComponent: React.ReactNode = <SignupForm apiCall={handleSignup} />;

  if (isSuccess && data) {
    console.log("data", data);
  }
  if (isError) {
    console.error("Signup failed");
  }

  if (isPending) {
    displayComponent = <div>Loading...</div>;
  }
  return (
    <div className="w-full flex justify-center h-screen">
      {displayComponent}
    </div>
  );
}
