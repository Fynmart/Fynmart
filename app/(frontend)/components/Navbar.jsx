"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useImdosUI } from "@/providers/ImdosProvider";
import { verifyJWT } from "@/lib/token";
import { Logout } from "@/lib/logout";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

import {
  Search,
  ShoppingCartIcon,
  Store,
  CircleUserRound,
  LogOut,
  HistoryIcon,
  BadgeInfoIcon,
} from "lucide-react";
import { FaBars, FaUser } from "react-icons/fa";

import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserLink from "./UserLink";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { user, setUser } = useImdosUI();
  const { loggedIn, setLoggedIn } = useImdosUI();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearch = () => {
    if (query !== "") {
      router.push("/products/search/" + query);
    }
  };

  const checkUser = async () => {
    try {
      const userToken = localStorage.getItem("token") ?? "";
      const payloads = await verifyJWT(userToken);

      if (!payloads) return;

      setLoggedIn(payloads);
      setUser(!user);
      // setLoggedIn(true);
    } catch (error) {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const handleLogout = async () => {
    const result = await Logout();
    if (result.status === 200) {
      localStorage.removeItem("token");
      router.replace("/");
      setLoggedIn(false);
      toast.success("Logout successful");
    }
  };

  return (
    <div className="sticky backdrop:blur-md z-[49] top-0">
      <nav className="bg-white border-b border-opacity-10 border-gray-300 py-2 sm:py-4 space-y-3 lg:px-[100px] md:px-[50px] px-4">
        <div className="flex items-center justify-between">
          <div className="shrink-0">
            <Link href="/">
              <img
                src="/assets/Logo.png"
                className="w-[180px] h-[55px] shrink-0 ml-[-14px] object-cover"
                alt="Logo"
              />
            </Link>
          </div>

          <div className="w-[65%] mx-4 hidden md:block">
            <div className="flex items-center relative">
              <Input
                type="text"
                placeholder="Search Product Here..."
                className="w-full px-4 py-2 focus:outline-none rounded-l-lg bg-[#f0f5ff] text-black"
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                value={query}
              />
              <button
                onClick={handleSearch}
                type="submit"
                className="bg-[#bed7ff] rounded-r-lg text-white px-4 py-2 hover:bg-[#079281] focus:outline-none"
              >
                <Search size={25} className="text-black" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 md:gap-8">
            <Link href="/userCart">
              <ShoppingCartIcon className="cursor-pointer size-6 md:size-7 outline-none text-black" />
            </Link>

            <Store
              className="cursor-pointer outline-none text-black size-6 md:size-7"
              onClick={toggleMenu}
            />

            {loggedIn ? (
              <Link href="/userProfile">
                <FaUser className="text-[#000] size-6 md:size-6" />
              </Link>
            ) : (
              <Link href="/login">
                <FaUser className="text-[#000] size-6 md:size-6" />
              </Link>
            )}

            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <FaBars
                    className="cursor-pointer outline-none text-black size-6 md:size-7"
                    onClick={toggleMenu}
                  />
                </SheetTrigger>
                <SheetContent
                  side={"left"}
                  className="z-[10012] pt-[70px] px-10 w-full space-y-4"
                >
                  <SheetClose
                    asChild
                    className="w-full bg-zinc-200 py-2 rounded-md text-center font-bold text-xl"
                  >
                    <Link href="/">Home</Link>
                  </SheetClose>
                  <SheetClose
                    asChild
                    className="w-full bg-zinc-200 py-2 rounded-md text-center font-bold text-xl"
                  >
                    <Link href="/categories">Categories</Link>
                  </SheetClose>
                  <SheetClose
                    asChild
                    className="w-full bg-zinc-200 py-2 rounded-md text-center font-bold text-xl"
                  >
                    <Link href="/brands">Brands</Link>
                  </SheetClose>
                  <SheetClose
                    asChild
                    className="w-full bg-zinc-200 py-2 rounded-md text-center font-bold text-xl"
                  >
                    <Link href="/about">About Us</Link>
                  </SheetClose>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="md:hidden p-2">
          <div className="flex items-center relative">
            <Input
              type="text"
              placeholder="Search Product Here..."
              className="w-full px-4 py-2 rounded-l-md focus:outline-none text-gray-800"
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              value={query}
            />
            <button
              onClick={handleSearch}
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600 focus:outline-none"
            >
              <Search size={25} className="text-black" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
