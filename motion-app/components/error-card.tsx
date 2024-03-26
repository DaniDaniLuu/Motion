"use client";
import React from "react";
import { Card, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const ErrorCard = () => {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <div>Oops! Something went wrong!</div>
      </CardHeader>
      <CardFooter>
        <Button
          onClick={() => {
            router.push("/auth/login");
          }}
          className="w-full flex items-center gap-2"
        >
          Back to login
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ErrorCard;
