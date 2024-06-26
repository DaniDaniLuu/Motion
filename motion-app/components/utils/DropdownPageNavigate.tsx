"use client";
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const DropdownPageNavigate = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    pagePath?: any;
  }
>(({ className, inset, pagePath, ...props }, ref) => {
  const router = useRouter();
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        "cursor-pointer relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "",
        className
      )}
      onClick={() => {
        router.push(pagePath);
      }}
      {...props}
    />
  );
});

export default DropdownPageNavigate;
