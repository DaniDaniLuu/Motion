"use client";
import React from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Pencil } from "lucide-react";

// Define props type
interface CustomAvatarProps {
  customImageSource: string;
  sessionImage?: string; // sessionImage is optional
}

// Define the component with TypeScript, using the props type
const EditProfilePicture: React.FC<CustomAvatarProps> = ({
  customImageSource,
  sessionImage,
}) => {
  return (
    <Avatar
      style={{ width: "120px", height: "120px" }}
      className="group h-15 w-15 rounded-full outline cursor-pointer relative hover:filter hover:brightness-75"
      onClick={() => {
        console.log("Hi");
      }}
    >
      {customImageSource !== "default" ? (
        <AvatarImage src={customImageSource} alt="profileImage" />
      ) : (
        <AvatarImage src={sessionImage || ""} alt="profileImage" />
      )}

      {/* Position the Pencil component absolutely in the center */}
    </Avatar>
  );
};

export default EditProfilePicture;
