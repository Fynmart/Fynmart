"use client";
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUserLoginSchema, userLoginSchema } from "@/lib/form-schema";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useImdosUI } from "@/providers/ImdosProvider";
import UserDashboard from "../components/UserDashboard";
import { LogOut } from "lucide-react";
import { Logout } from "@/lib/logout";
import Loader from "../components/Loader";

const Login = () => {
  const router = useRouter();
  const { user, setUser } = useImdosUI();
  const { loggedIn, setLoggedIn } = useImdosUI(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);
  const [userData, setUserData] = useState(null);
  // const [loggedIn, setLoggedIn] = useState(false);
  const [banners, setBanners] = useState(null);

  const checkUser = async () => {
    try {
      const userToken = localStorage.getItem("token") ?? "";
      const payloads = await verifyJWT(userToken);

      if (!payloads) return;

      setLoggedIn(payloads);
      setUser(!user);
      setLoggedIn(true);
    } catch (error) {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const formData = new FormData();
        formData.append("select", JSON.stringify(["*"]));

        formData.append(
          "conditions",
          JSON.stringify([
            {
              on: "id",
              type: "=",
              value: "id",
            },
          ])
        );
        try {
          const response = await fetch("/api/imdos/users/read", {
            method: "POST",
            body: formData,
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();

          setBanners(data.data);
        } catch (error) {
          console.error("Error fetching banners:", error);
        }
      }
    };

    fetchUserData();
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

  if (!loggedIn) {
    return (
      <div class="flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-white z-[9999]">
        <Loader />
      </div>
    );
  }

  const renderSidebar = () => (
    <div className="w-full md:w-1/3 bg-gray-100 p-4">
      <div className="mb-4 text-center">
        <img
          src={userData?.profileImage || "/assets/Logo.png"}
          alt="Profile"
          className="rounded-full mx-auto bg-black w-24 h-24 object-cover"
        />
        <h2 className="mt-2">{loggedIn?.name || "User Name"}</h2>
        <p className="text-sm text-gray-600">
          {loggedIn?.phone || "user@email.com"}
        </p>
      </div>
      <ul className="space-y-2">
        <li
          className={`p-2 cursor-pointer ${
            showDashboard ? "bg-orange-500 text-white rounded" : ""
          }`}
          onClick={() => {
            setShowDashboard(true);
            setShowProfileForm(false);
          }}
        >
          Dashboard
        </li>

        <div className=" items-center flex justify-center">
          {" "}
          <button
            onClick={handleLogout}
            className="text-center bg-orange-500 text-white rounded p-2 flex items-center gap-2 w-full"
          >
            <LogOut size={20} /> Log out
          </button>
        </div>
      </ul>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row px-4 md:px-[50px] lg:px-[100px]">
      {renderSidebar()}
      {showDashboard && <UserDashboard />}
    </div>
  );
};

export default Login;
