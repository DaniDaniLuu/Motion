import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { signOut } from "next-auth/react";
import UserAccountNav from "./UserAccountNav";

const NavBar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <div className="text-center text-2xl font-extrabold">Motion</div>
        </Link>

        <div>
          {session?.user ? (
            <UserAccountNav></UserAccountNav>
          ) : (
            <Link className={buttonVariants()} href="/login">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
