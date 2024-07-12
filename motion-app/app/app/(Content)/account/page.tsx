import { Card, CardHeader, CardContent } from "@/components/ui/card";

const Account = () => {
  return (
    <>
      <div className="font-bold text-2xl text-primary py-3 px-5 bg-background">
        Account Overview
      </div>
      <div className="mt-5 grid grid-cols-2">
        <Card>
          <CardHeader>
            <CardContent>Content 1</CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardContent>Content 2</CardContent>
          </CardHeader>
        </Card>
      </div>
    </>
  );
};

export default Account;
