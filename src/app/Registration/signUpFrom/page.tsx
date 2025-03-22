import { GalleryVerticalEnd } from "lucide-react";
import { SignUpForm } from "@/components/ui/SignIn-form"; // Corrected spelling of 'signUpForm'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="h-6 w-6" />
          </div>
          Acme Inc.
        </a>
        <SignUpForm /> {/* You can replace this with SignUpForm if needed */}
      </div>
    </div>
  );
}
