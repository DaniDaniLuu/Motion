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

const SettingsPage = async () => {
  return (
    <div className="flex p-10">
      Settings Page
      <ReturnButton></ReturnButton>
    </div>
  );
};

export default SettingsPage;
