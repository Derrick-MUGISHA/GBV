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

export function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!Name || !Email || !password) {
      setError("All fields are required");
      return;
    }

    // Reset the error message if all fields are filled
    setError("");

    try {
      // Perform the POST request
      const res = await fetch("/api/routes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Name, Email, password }), // Send form data
      });

      // Check if the response is successful
      if (res.ok) {
        const form = e.target as HTMLFormElement; // Get the form element
        form.reset(); // Reset the form after successful submission

        // Reset state after successful submission
        setName("");
        setEmail("");
        setPassword("");

        console.log("Form submitted successfully.");
      } else {
        // Handle unsuccessful response
        const errorData = await res.json();
        setError(errorData.message || "Something went wrong.");
      }
    } catch (error) {
      // Catch any errors that occur during the fetch request
      console.error("Error fetching data:", error);
      setError("An unexpected error occurred. Please try again.");
    }

    // Log data to the console (you may want to handle form submission here)
    console.log(Name, Email, password);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-full bg-[#b062b0] border-none rounded-lg shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white font-semibold">Sign In</CardTitle>
          <CardDescription className="text-white text-lg">
            Access your account with your credentials
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-white p-8 rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                {/* Full Name Input */}
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    required
                    onChange={(e) => setName(e.target.value)} // Handle change for full name
                  />
                </div>

                {/* Email Input */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={(e) => setEmail(e.target.value)} // Handle change for email
                  />
                </div>

                {/* Password Input */}
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)} // Handle change for password
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full flex items-center justify-center mt-4 bg-[#b062b0] hover:bg-[#9b55a3] text-white rounded-md py-2">
                  Sign In
                </Button>
              </div>

              <div className="text-center text-sm">
               if you have an account?{" "}
                <Link href="#" className="underline text-[#b062b0] hover:text-[#9b55a3]">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 font-bold p-4 border-2 border-red-500 bg-red-100 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
