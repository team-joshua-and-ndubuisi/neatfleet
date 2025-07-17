import React, { useEffect } from "react";
import { LoginForm, LoginBodyT } from "@/features/auth";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/features/auth/stores/";

export default function LoginPage() {
  const { login } = useAuth();
  const { initAuth, token, user } = useAuthStore();
  const {
    mutateAsync: loginMutate,
    isError,
    isPending,
    isSuccess,
    data,
  } = login;
  const handleLogin = async (userCredentials: LoginBodyT) => {
    await loginMutate(userCredentials);
  };

  //when data resolves, initialize auth store
  useEffect(() => {
    console.log("LoginPage init auth");
    if (data) {
      initAuth(data);
    }
  }, [data]);

  if (isError) {
    console.error("Login failed");
  }

  if (isSuccess) {
    console.log("Login successful", { token, user });
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex justify-center items-center">
      <LoginForm apiCall={handleLogin} />
    </div>
  );
}
