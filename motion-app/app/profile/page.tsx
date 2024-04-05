import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Home, SquareUserRound, Landmark } from "lucide-react";
import SideNavBar from "./components/sideNavBar";
import ReturnButton from "@/components/utils/ReturnToPreviousPage";

const ProfilePage = async () => {
  return (
    <div className="flex p-10">
      Profile Page
      <ReturnButton></ReturnButton>
    </div>
  );
};

export default ProfilePage;
