import React, { ReactNode, FC } from "react";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { signIn } from "next-auth/react";

interface GoogleSignInButtonProps {
  children: ReactNode;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const loginGoogle = () => {
    signIn("google", { callbackUrl: "http://localhost:3000/app/dashboard" });
  };

  return (
    <Button onClick={loginGoogle} className="w-full flex items-center gap-2">
      <FontAwesomeIcon className="fa-xl" icon={faGoogle} />
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
