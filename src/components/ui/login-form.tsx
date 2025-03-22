"use client";
import { cn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, database, ref, get } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [signInWithEmailAndPassword, , loading, authError] = 
    useSignInWithEmailAndPassword(auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(email, password);
      
      if (result?.user) {
        setSuccess("Login successful! Redirecting...");
        setEmail("");
        setPassword("");

        // Force token refresh to get latest claims
        await result.user.getIdToken(true);
        
        const adminCheckRef = ref(database, `users/${result.user.uid}/role`);
        const snapshot = await get(adminCheckRef);

        if (snapshot.exists() && snapshot.val() === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(getFirebaseError(authError));
    }
  };

  const getFirebaseError = (error: unknown) => {
    if (!error || !(error instanceof FirebaseError)) return "Login failed";

    switch (error.code) {
      case "auth/invalid-email": return "Invalid email address";
      case "auth/user-disabled": return "Account disabled";
      case "auth/user-not-found": return "User not found";
      case "auth/wrong-password": return "Incorrect password";
      default: return "Login failed. Please try again.";
    }
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
              {success && (
                <div className="text-green-600 p-3 bg-green-100 rounded-md border border-green-600">
                  {success}
                </div>
              )}

              {error && (
                <div className="text-red-600 p-3 bg-red-100 rounded-md border border-red-600">
                  {error}
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-700 font-semibold">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:ring-2 focus:ring-[#b062b0] focus:border-[#b062b0]"
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-700 font-semibold">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:ring-2 focus:ring-[#b062b0] focus:border-[#b062b0]"
                />
              </div>

              <Button
                type="submit"
                className="w-full flex items-center justify-center mt-4 bg-[#b062b0] hover:bg-[#9b55a3] text-white rounded-md py-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin mr-2" />
                    Logging in...
                  </>
                ) : "Login"}
              </Button>

              <div className="text-center text-sm mt-4 text-gray-700">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline text-[#b062b0] hover:text-[#9b55a3]">
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