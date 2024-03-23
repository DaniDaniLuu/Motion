import React, { ReactNode, FC } from "react";
import { Button } from "./ui/button";

interface GoogleSignInButtonProps {
  children: ReactNode;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const loginGoogle = () => {
    console.log("Logged in with google");
  };

  return (
    <Button onClick={loginGoogle} className="w-full">
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
