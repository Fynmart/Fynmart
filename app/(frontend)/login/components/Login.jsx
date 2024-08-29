"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userLoginSchema } from "@/lib/form-schema";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useImdosUI } from "@/providers/ImdosProvider";

const Login = () => {
  const router = useRouter();
  const { user, setUser } = useImdosUI();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit = async (value) => {
    try {
      const endpoint = `/api/user/auth`;
      const request = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: value.email, password: value.password }),
      });

      if (!request.ok) {
        throw new Error("Failed");
      }

      const response = await request.json();
      toast.success(response.message);
      setUser(!user);
      localStorage.setItem("token", response.token);
      router.replace("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-start px-6 md:px-[200px] py-[30px] ">
      <div className="w-[40%] md:block hidden">
        <img src="/assets/Logo.png" alt="" className="w-full" />
      </div>
      <section className="flex flex-col items-center justify-center flex-1">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-black"
        >
          <img
            className=" h-[90px] mr-[40px] rounded-sm"
            src="/assets/Logo.png"
            alt="logo"
          />
          {/* GrowHub */}
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 border border-1 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-3 md:space-y-4 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Log in your account
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-5"
            >
              <div>
                <Label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your email
                </Label>
                <Input
                  type="email"
                  className=" border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="name@company.com"
                  {...register("email")}
                />
                {errors?.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className=" border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  {...register("password")}
                />
                {errors?.password && (
                  <p className="text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <Input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border rounded "
                        required
                      />
                  </div>
                  <div className="ml-3 text-sm">
                    <Label htmlFor="terms" className="text-black font-medium">
                      I accept the{" "}
                      <a
                        className="font-medium text-blue-600 hover:underline "
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </Label>
                  </div>
                </div> */}
              <button
                type="submit"
                className="w-full text-white bg-[#1d4ed8] hover:bg-[#1d2dd8] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Login
              </button>
              <p className="text-sm text-[#000000c2] font-medium">
                Don&apos;t have an account ?{" "}
                <a
                  href="/signup"
                  className="font-medium text-[#1d4ed8] hover:underline"
                >
                  Signup here
                </a>
              </p>
            </form>
          </div>
        </div>
        {/* </div> */}
      </section>
    </div>
  );
};

export default Login;
