"use client";
import RegisterForm from "@/components/forms/RegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import GoogleSignInButton from "@/components/GoogleSignInButton";

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="sm:min-w-96 lg:min-w-[500px]">
        <CardHeader>
          <div className="text-6xl font-bold leading-none tracking-tight">
            Register
          </div>
        </CardHeader>
        <CardContent>
          <RegisterForm></RegisterForm>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <div
            className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow
           before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400"
          >
            or
          </div>
          <div className="flex justify-center gap-1">
            <GoogleSignInButton>Sign Up with Google</GoogleSignInButton>
            <Link
              className={buttonVariants({ variant: "destructive" })}
              href="/login"
            >
              Head Back
            </Link>
          </div>
        </CardFooter>
      </div>
    </div>
  );
};

export default RegisterPage;
