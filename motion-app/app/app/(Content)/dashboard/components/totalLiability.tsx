import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TotalLiabilityProps {
  totalLiability: number;
  totalLiabilityAccountCount: number;
}

const TotalLiability = ({
  totalLiability,
  totalLiabilityAccountCount = 0,
}: TotalLiabilityProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Liability</CardTitle>
      </CardHeader>
      <CardContent className="text-center text-lg font-bold text-red-600">
        <p>${totalLiability}</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p>
          From {totalLiabilityAccountCount} account
          {totalLiabilityAccountCount !== 1 ? "s" : ""}
        </p>
      </CardFooter>
    </Card>
  );
};

export default TotalLiability;
