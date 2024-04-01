"use client";
import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
      {customImageSource !== "default" && (
        <AvatarImage src={customImageSource} alt="profileImage" />
      )}
      {customImageSource === "default" && (
        <AvatarImage
          src={sessionImage ? sessionImage : ""}
          alt="profileImage"
        />
      )}

      {/* Position the Pencil component absolutely in the center and make it visible on group hover */}
      <Pencil className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100" />
    </Avatar>
  );
};

export default EditProfilePicture;
