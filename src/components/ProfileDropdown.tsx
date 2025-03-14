import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { FiBell, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import Link from "next/link";

interface User {
  displayName: string | null;
  isAdmin?: boolean;
}

interface ProfileDropdownProps {
    user: User | null | undefined; // Allow `null` and `undefined` to be valid
  }

function ProfileDropdown({ user }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        router.push("/");
      })
      .catch((error) => console.error("Logout error:", error));
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-white hover:bg-white/20 flex items-center gap-2"
        >
          <FiUser className="text-lg" />
          <span>{user?.displayName || "Profile"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white text-black rounded-lg shadow-lg w-48 border-none mt-2">
        <DropdownMenuItem className="hover:bg-gray-100 px-4 py-2.5 cursor-pointer">
          <Link href="/profile" className="w-full flex items-center gap-2">
            <FiUser className="text-lg" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-gray-100 px-4 py-2.5 cursor-pointer">
          <Link href="/notifications" className="w-full flex items-center gap-2">
            <FiBell className="text-lg" />
            Notifications
          </Link>
        </DropdownMenuItem>
        {user?.isAdmin && (
          <DropdownMenuItem className="hover:bg-gray-100 px-4 py-2.5 cursor-pointer">
            <Link href="/admin" className="w-full flex items-center gap-2">
              <FiSettings className="text-lg" />
              Admin
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          className="hover:bg-gray-100 px-4 py-2.5 cursor-pointer"
          onClick={handleLogout}
        >
          <div className="w-full flex items-center gap-2">
            <FiLogOut className="text-lg" />
            Logout
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropdown;
