"use client";
import React, { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent } from "react";

// Define props type
interface CustomAvatarProps {
  sessionImage?: string; // sessionImage is optional
  sessionEmail?: string;
}

// Define the component with TypeScript, using the props type
const EditProfilePicture: React.FC<CustomAvatarProps> = ({
  sessionImage,
  sessionEmail,
}) => {
  const [key, setKey] = useState(0);
  const refreshImageUrl = () => {
    // Increment the key value to force re-render
    setKey((prevKey) => prevKey + 1);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    console.log(file);
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        console.log("Here");
        const response = await fetch("/api/upload-profile-picture", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("File uploaded successfully");
          const objectURL = URL.createObjectURL(file);
          refreshImageUrl();

          // Optionally, you can perform additional actions after successful upload
        } else {
          console.error("Failed to upload file:", response.statusText);
          // Handle error
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        // Handle error
      }
    }
  };
  let customImageSource = "default";
  if (sessionImage?.substring(0, 5) !== "https") {
    customImageSource = `/custom-user-images/${sessionEmail}.png?${Date.now()}`;
  }

  return (
    <label htmlFor="avatar-upload">
      <Avatar
        style={{ width: "120px", height: "120px" }}
        className="group h-15 w-15 rounded-full outline cursor-pointer relative hover:filter hover:brightness-75"
        onClick={() => {
          console.log("Hi");
        }}
      >
        {customImageSource !== "default" && (
          <AvatarImage key={key} src={customImageSource} alt="profileImage" />
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
      <input
        type="file"
        id="avatar-upload"
        accept=".jpg, .png"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </label>
  );
};

export default EditProfilePicture;
