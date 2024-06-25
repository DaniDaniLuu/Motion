import Link from "next/link";
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
  PageActions,
  PageHeaderDescriptionSmall,
} from "@/components/page-header";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import User from "@/components/User";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import NavBar from "@/components/NavBar/NavBar";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/app/dashboard");
  }
  return (
    <div>
      <NavBar />
      <PageHeader>
        <PageHeaderHeading>Motion</PageHeaderHeading>
        <PageHeaderDescriptionSmall>
          Get Your Financial Life in Motion
        </PageHeaderDescriptionSmall>
        <PageHeaderDescription>
          Take the hassle out of managing your finances. Motion securely
          aggregates your bank accounts and statements, giving you a complete
          view of your money in one place. No more switching between apps or
          logging into multiple accounts.
        </PageHeaderDescription>
        <PageActions>
          <Link href="/auth/login" className={buttonVariants()}>
            Get Started
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={"https://github.com/DaniDaniLuu/Motion"}
            className={buttonVariants({ variant: "outline" })}
          >
            <Icons.gitHub className="mr-2 h-4 w-4" />
            GitHub
          </Link>
        </PageActions>
      </PageHeader>
    </div>
  );
}
