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
import Link from "next/link";
import { Loader } from "lucide-react";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const signUpLink = "/signin";
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(""); // To handle email input
  const [password, setPassword] = useState(""); // To handle password input

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate a network request
    setTimeout(() => {
      setIsLoading(false); // Set loading state to false once done
      // Proceed with your form submission logic here, like making an API request
      console.log("Form submitted with:", { email, password });
    }, 2000); // Simulating a 2-second network request
  };

  return (
    <div className={cn("flex flex-col gap-6 w-full max-w-sm mx-auto", className)} {...props}>
      <Card className="w-full bg-[#b062b0] border-none rounded-lg shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white font-semibold">Welcome back</CardTitle>
          <CardDescription className="text-white text-lg">Login to your account</CardDescription>
        </CardHeader>
        <CardContent className="bg-white p-8 rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              {/* Email Input */}
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-700 font-semibold">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Handle email input change
                  className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:ring-2 focus:ring-[#b062b0] focus:border-[#b062b0]"
                />
              </div>
              
              {/* Password Input */}
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-700 font-semibold">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Handle password input change
                  className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:ring-2 focus:ring-[#b062b0] focus:border-[#b062b0]"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full flex items-center justify-center mt-4 bg-[#b062b0] hover:bg-[#9b55a3] text-white rounded-md py-2"
                disabled={isLoading} // Disable the button while loading
              >
                {isLoading ? (
                  <Loader className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  "Login"
                )}
              </Button>

              {/* Sign Up Link */}
              <div className="text-center text-sm mt-4 text-gray-700">
                Don&apos;t have an account?{" "}
                <Link
                  href={signUpLink}
                  className="underline text-[#b062b0] hover:text-[#9b55a3]"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
