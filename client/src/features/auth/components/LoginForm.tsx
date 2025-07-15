import React from "react";
import { LoginBodyT } from "../authTypes";

interface LoginFormProps {
  apiCall: (userCredentials: LoginBodyT) => Promise<void>;
}

const LoginForm = ({ apiCall }: LoginFormProps) => {
  return (
    <section>
      <h2>Login</h2>

      <form
        action=""
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          console.log("form", form.email.value);

          const email = form.email.value;
          const password = form.password.value;

          apiCall({ email, password });
        }}>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
          />
        </label>

        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default LoginForm;
