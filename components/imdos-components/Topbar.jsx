"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import {
  CloudSun,
  LogOut,
  Menu,
  Moon,
  Palette,
  Sun,
  User,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useImdosUI } from "@/providers/ImdosProvider";
import { Logout } from "@/lib/logout";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const TopBar = ({ siteName }) => {
  const { setTheme } = useTheme();
  const { sideBar, setSideBar } = useImdosUI();

  const router = useRouter();

  const handleLogout = async () => {
    const result = await Logout();
    if (result.status == 200) {
      router.replace("/auth");
      toast.success("Logout successful");
    }
  };
  return (
    <div className="h-[70px] flex sticky top-0 z-[50] backdrop-blur-lg justify-between items-center px-4 border-b">
      <Button
        className="md:hidden"
        onClick={() => {
          setSideBar(!sideBar);
        }}
      >
        {sideBar ? <X /> : <Menu />}
      </Button>
      <h1 className="hidden md:block text-xl">{siteName}</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="relative rounded-full p-2"
          >
            <Avatar className="h-8 w-8 rounded-full">
              {/* <AvatarImage src="https://github.com/shadcn.png" alt="@growhub" /> */}
              <AvatarImage
                src="/assets/frame2.png"
                className="object-contain w-full h-full"
                alt="@growhub"
              />
              <AvatarFallback>FY</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Grow Hub</p>
              <p className="text-xs leading-none text-muted-foreground">
                user@growhub.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Palette className="mr-2 h-4 w-4" />
                <span>Theme</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <CloudSun className="mr-2 h-4 w-4" />
                    <span>System</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TopBar;
