import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const AccountTab = () => {
  return (
    <div className="flex justify-between items-center border-b border-primary-foreground py-3">
      <div className="flex items-center gap-4">
        <Avatar className="h-8 w-8">
          <AvatarImage alt="accountImage" />
          <AvatarFallback>P</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap">
          <p className="text-sm m-0 font-bold">Test Account</p>
          <p className="text-xs m-0">Misc Info</p>
        </div>
      </div>

      <div className="">
        <p className="text-sm font-bold">$100000</p>
      </div>
    </div>
  );
};

export default AccountTab;
