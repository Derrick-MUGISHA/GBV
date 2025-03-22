import { LoginForm } from "@/components/ui/login-form";

export default function LoginPage() {
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f5f5f5] p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6 bg-white rounded-xl shadow-lg p-8">  
        {/* Login Form */}
        <LoginForm />
      </div>
    </div>
  );
}
