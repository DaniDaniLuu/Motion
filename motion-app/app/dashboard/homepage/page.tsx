import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Home, SquareUserRound, Landmark } from "lucide-react";
import SideNavBar from "./components/sideNavBar";

const HomePage = async () => {
  return (
    <div className="flex p-10">
      <SideNavBar></SideNavBar>
    </div>
  );
};

export default HomePage;
