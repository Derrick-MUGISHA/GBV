"use client";

import { cn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { useState } from "react";
import Link from "next/link";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"; // Added form handling
import * as yup from "yup"; // Added validation
import { yupResolver } from "@hookform/resolvers/yup";

// Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth);
  
  // Use react-hook-form for form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { name: string; email: string; password: string }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(data.email, data.password);
      if (userCredential?.user) {
        await updateProfile(userCredential.user, { displayName: data.name });
        await signInWithEmailAndPassword(auth, data.email, data.password);
        sessionStorage.setItem("user", "true");
        reset();
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-full bg-[#b062b0] border-none rounded-lg shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white font-semibold">Sign Up</CardTitle>
          <CardDescription className="text-white text-lg">Create a new account</CardDescription>
        </CardHeader>
        <CardContent className="bg-white p-8 rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" {...register("name")} disabled={loading} />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} disabled={loading} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" {...register("password")} disabled={loading} />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>

              <Button type="submit" className="w-full mt-4 bg-[#b062b0] hover:bg-[#9b55a3] text-white" disabled={loading}>
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader className="w-4 h-4 animate-spin mr-2" />
                    Creating Account...
                  </span>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>

            <div className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-[#b062b0] hover:text-[#9b55a3] underline">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      {error && (
        <div className="text-red-500 p-4 bg-red-100 rounded border border-red-500">
          {error.message}
        </div>
      )}
    </div>
  );
}
