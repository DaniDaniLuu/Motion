import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { signOut } from "next-auth/react";
import ClientDropdownMenuItem from "./ClientDropdownitem";
import DropdownPageNavigate from "../utils/DropdownPageNavigate";

const ProfileNav = async () => {
  const session = await getServerSession(authOptions);
  let sessionImage, sessionName, sessionEmail;
  if (session?.user) {
    let sessionUser = session.user;
    if (sessionUser.image) {
      sessionImage = sessionUser.image;
    }
    if (sessionUser.email) {
      sessionEmail = sessionUser.email;
    }
    if (sessionUser.username) {
      sessionName = sessionUser.username;
    } else if (sessionUser.name) {
      sessionName = sessionUser.name;
    }
  }

  let customImageSource = "default";
  if (sessionImage?.substring(0, 5) !== "https") {
    customImageSource = `/custom-user-images/${sessionEmail}.png?${Date.now()}`;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {customImageSource !== "default" && (
              <AvatarImage src={customImageSource} alt="profileImage" />
            )}
            {customImageSource === "default" && (
              <AvatarImage
                src={sessionImage ? sessionImage : ""}
                alt="profileImage"
              />
            )}
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {sessionName ? sessionName : ""}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {sessionEmail ? sessionEmail : ""}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownPageNavigate pagePath="/profile/">
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownPageNavigate>
          <DropdownPageNavigate pagePath="/settings/">
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownPageNavigate>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <ClientDropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </ClientDropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileNav;
