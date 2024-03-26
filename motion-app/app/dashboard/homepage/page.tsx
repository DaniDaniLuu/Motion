import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (session?.user) {
    return (
      <h2 className="text-2xl">
        Admin Page - Welcome back {session?.user.username}
      </h2>
    );
  }

  return <h2 className="text-2xl">Please Log In</h2>;
};

export default page;
