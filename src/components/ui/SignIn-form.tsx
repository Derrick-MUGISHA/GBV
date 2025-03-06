"use client";

import { cn } from "@/lib/utils";
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
import { useState } from "react";
import Link from "next/link";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { updateProfile } from "firebase/auth";
import { Loader } from "lucide-react"; // Adjust import based on your icon library

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      if (!name || !email || !password) {
        throw new Error("All fields are required");
      }

      const userCredential = await createUserWithEmailAndPassword(email, password);

      if (userCredential?.user) {
        await updateProfile(userCredential.user, { displayName: name });
        setSuccess(true);
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-full bg-[#b062b0] border-none rounded-lg shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white font-semibold">Sign Up</CardTitle>
          <CardDescription className="text-white text-lg">
            Create a new account
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-white p-8 rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-4">
                {/* Form Fields */}
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full mt-4 bg-[#b062b0] hover:bg-[#9b55a3] text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <Loader className="w-4 h-4 animate-spin mr-2" />
                      Creating Account...
                    </span>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-[#b062b0] hover:text-[#9b55a3] underline">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Success Message */}
      {success && (
        <div className="text-green-500 p-4 bg-green-100 rounded border border-green-500">
          Account created successfully! You can now login.
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-red-500 p-4 bg-red-100 rounded border border-red-500">
          {error}
        </div>
      )}
    </div>
  );
}