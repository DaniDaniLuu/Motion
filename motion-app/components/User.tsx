"use client";
import { useSession } from "next-auth/react";

const User = () => {
  const { data: session } = useSession();

  return <pre>{JSON.stringify(session?.user)}</pre>;
};

export default User;
