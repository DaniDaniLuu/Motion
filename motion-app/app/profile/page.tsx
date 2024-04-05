import ReturnButton from "@/components/utils/ReturnToPreviousPage";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CardContent, Card, CardHeader } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Pencil } from "lucide-react";
import EditProfilePicture from "./components/EditProfilePicture";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  let sessionEmail;
  if (session?.user) {
    let sessionUser = session.user;
    if (sessionUser.email) {
      sessionEmail = sessionUser.email;
    }
  }

  const accountObject = await db.user.findUnique({
    where: { email: sessionEmail },
  });

  let googleStatus;
  let sessionImage, sessionName;

  if (accountObject?.image) {
    sessionImage = accountObject?.image;
  }
  if (accountObject?.email) {
    sessionEmail = accountObject?.email;
  }
  if (accountObject?.username) {
    sessionName = accountObject?.username;
  } else if (accountObject?.name) {
    sessionName = accountObject?.name;
  }

  if (accountObject?.password === null) {
    googleStatus = true;
  } else {
    googleStatus = false;
  }

  let customImageSource = "default";
  if (sessionImage?.substring(0, 5) !== "https") {
    customImageSource = `/custom-user-images/${sessionEmail}.png`;
  }

  console.log(customImageSource);
  return (
    <div>
      <div className="p-4 space-y-6 sm:px-6">
        <div className="flex flex-row space-x-6 items-center">
          <ReturnButton></ReturnButton>
          <h1 className="text-2xl font-bold">Edit Profile</h1>
        </div>
        <div className="space-y-6 px-20">
          <header className="space-y-2">
            <div className="flex items-center space-x-3">
              <EditProfilePicture
                customImageSource={customImageSource}
                sessionImage={sessionImage}
              ></EditProfilePicture>
              <div className="space-y-1">
                <h1 className="text-xl font-bold">{sessionName}</h1>
              </div>
            </div>
          </header>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <div>General</div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    defaultValue={sessionName}
                    id="name"
                    placeholder="E.g. Jane Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div id="email">{sessionEmail}</div>
                </div>
              </CardContent>
            </Card>
            {googleStatus == false && (
              <Card>
                <CardHeader>
                  <div>Change Password</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          <div className="pt-6">
            <Button>Save || implement later</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
