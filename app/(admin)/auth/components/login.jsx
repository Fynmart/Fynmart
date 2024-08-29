"use client";
import React from "react";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/imdos-components/LoadingButton";
import { loginSchema } from "@/lib/form-schema";
import { useImdosUI } from "@/providers/ImdosProvider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/imdos-ui/form";

export default function Login() {
  const [isVisible, setIsVisible] = React.useState(false);
  const { setLoading } = useImdosUI();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const request = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });

    const response = await request.json();

    if (!request.ok) {
      toast.error(response.message);
    }
    if (request.status == 200) {
      toast.success(response.message);
      router.replace("/panel/dashboard");
    }
    setLoading(false);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    defaultValue={field.value}
                    onChange={(event) => {
                      const { value } = event.target;
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"password"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type={isVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    defaultValue={field.value}
                    onChange={(event) => {
                      const { value } = event.target;
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton type="submit">Login</LoadingButton>
        </form>
      </Form>
    </>
  );
}
