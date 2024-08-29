"use client";
import React from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { userSignSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";

const Signup = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSignSchema),
  });

  const onSubmit = async (value) => {
    try {
      const formData = new FormData();

      Object.entries(value).forEach(([key, val]) => {
        formData.append(key, val);
      });

      formData.append(
        "validation",
        JSON.stringify([
          {
            name: "required|string",
            address: "required|string",
            email: "required|email|unique",
            phone: "required|numeric|unique|length:10",
            password: "required|min-length:6",
          },
        ])
      );

      const endpoint = `/api/imdos/users/create`;
      const request = await fetch(endpoint, { method: "POST", body: formData });

      const response = await request.json();
      if (!request.ok) {
        throw new Error(response.error);
      }
      // toast.success(response.message);

      toast.success("Your account created successfully");
      router.replace("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex items-center justify-start px-6 md:px-[200px] py-5 ">
      <div className="w-[40%] md:block hidden">
        <img src="/assets/ecom.png" alt="" className="w-full" />
      </div>
      <div className="flex flex-col items-center justify-center flex-1">
        <a
          href="#"
          className="flex items-center mb-2 text-2xl font-semibold text-black"
        >
          <img
            className="h-[90px] mr-2 rounded-sm"
            src="/assets/logo-black.png"
            alt="logo"
          />
        </a>
        <div className="w-full bg-white rounded-lg shadow-md mt-4 border border-1 sm:max-w-md xl:p-0">
          <div className="p-6 sm:p-8 space-y-3 md:space-y-3">
            <h1 className="text-xl sm:text-2xl font-bold leading-tight tracking-tight text-gray-900">
              Create an account
            </h1>
            <form
              className="space-y-2 sm:space-y-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <Label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  className="border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="Enter your name"
                  {...register("name")}
                />
                {errors?.name && (
                  <p className="text-red-600">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  your address
                </Label>
                <Textarea
                  type="text"
                  name="address"
                  id="address"
                  className="border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder=" Enter your full address Which is your Default Shipping Address
"
                  {...register("address")}
                />
                {errors?.address && (
                  <p className="text-red-600">{errors.address.message}</p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  className="border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="enter your email address"
                  {...register("email")}
                />
                {errors?.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Phone
                </Label>
                <Input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder=" Enter your contact number"
                  className="border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  {...register("phone")}
                />
                {errors?.phone && (
                  <p className="text-red-600">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder=" Enter your password"
                  className="border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  {...register("password")}
                />
                {errors?.password && (
                  <p className="text-red-600">{errors.password.message}</p>
                )}
              </div>
              {/* <div className="flex items-start">
                <Input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border rounded"
                  required
                />
                <label
                  htmlFor="terms"
                  className="ml-2 text-sm text-gray-900 font-medium"
                >
                  I accept the
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div> */}
              <button
                type="submit"
                className="w-full text-white bg-[#1d4ed8] hover:bg-[#1d2dd8] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>
              <p className="text-sm text-gray-600 font-medium">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-[#1d4ed8] hover:underline"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
