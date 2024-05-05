import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TotalCashProps {
  totalCash: number;
  totalCashAccountCount: number;
}

const TotalCash = ({
  totalCash,
  totalCashAccountCount = 0,
}: TotalCashProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Cash</CardTitle>
      </CardHeader>
      <CardContent className="text-center text-lg font-bold text-green-600">
        <p>${totalCash}</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p>
          From {totalCashAccountCount} account
          {totalCashAccountCount !== 1 ? "s" : ""}
        </p>
      </CardFooter>
    </Card>
  );
};

export default TotalCash;
