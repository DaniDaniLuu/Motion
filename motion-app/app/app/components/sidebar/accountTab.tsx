import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AccountInfo {
  bankName: string;
  bankImage: string;
  miscInfo: string;
  balance: number;
}

const AccountTab: React.FC<AccountInfo> = ({
  bankName,
  bankImage,
  miscInfo,
  balance,
}) => {
  let customImageSource = "/bank-icons/" + bankName + ".png";

  return (
    <div className="flex justify-between items-center border-b border-primary-foreground py-3 text-secondary">
      <div className="flex items-center gap-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src={customImageSource} alt="accountImage" />
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap">
          <p className="text-sm m-0 font-bold">{bankName}</p>
          <p className="text-xs m-0">{miscInfo}</p>
        </div>
      </div>
      <p className="text-sm font-bold">${balance}</p>
    </div>
  );
};

export default AccountTab;
