"use client";
import LoginForm from "@/components/forms/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="sm:min-w-96 lg:min-w-[500px]">
      <CardHeader>
        <div className="text-6xl font-bold leading-none tracking-tight">
          Login
        </div>
      </CardHeader>
      <CardContent>
        <LoginForm></LoginForm>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <div
          className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow
           before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400"
        >
          or
        </div>
        <GoogleSignInButton>Continue with Google</GoogleSignInButton>
        <div className="flex justify-center gap-1 mt-2">
          Not Registered yet?
          <Link className="text-primary hover:underline" href="/auth/register">
            Create an account
          </Link>
        </div>
      </CardFooter>
    </div>
  );
};

export default LoginPage;
