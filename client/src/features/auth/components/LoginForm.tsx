import React from "react";
import { LoginBodyT } from "../authTypes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

interface LoginFormProps {
  apiCall: (userCredentials: LoginBodyT) => Promise<void>;
}

const LoginForm = ({ apiCall }: LoginFormProps) => {
  return (
    // <section>
    //   <h2>Login</h2>

    //   <form
    //     action=""
    //     onSubmit={async (e) => {
    //       e.preventDefault();
    //       const form = e.target as HTMLFormElement;
    //       console.log("form", form.email.value);

    //       const email = form.email.value;
    //       const password = form.password.value;

    //       apiCall({ email, password });
    //     }}>
    //     <label htmlFor="email">
    //       Email:
    //       <input
    //         type="email"
    //         id="email"
    //       />
    //     </label>

    //     <label htmlFor="password">
    //       Password:
    //       <input
    //         type="password"
    //         id="password"
    //       />
    //     </label>
    //     <button type="submit">Login</button>
    //   </form>
    // </section>
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Link to="/signup">
            <Button variant="link">Sign Up</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            console.log("form", form.email.value);

            const email = form.email.value;
            const password = form.password.value;

            apiCall({ email, password });
          }}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full">
          Login
        </Button>
        <Button
          variant="outline"
          className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
