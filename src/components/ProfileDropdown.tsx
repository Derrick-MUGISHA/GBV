"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { signOut } from "firebase/auth";
import { auth, database, ref, onValue } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { FiBell, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import Link from "next/link";

interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
}

interface Notification {
  read: boolean;
}

interface ProfileDropdownProps {
  user: User | null | undefined;
}

function ProfileDropdown({ user }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouter();

  // Real-time admin status check
  useEffect(() => {
    if (!user?.uid) return;
  
    const adminCheckRef = ref(database, `users/${user.uid}/role`);
    const unsubscribe = onValue(adminCheckRef, (snapshot) => {
      setIsAdmin(snapshot.exists() && snapshot.val() === "admin");
    });
  
    return () => unsubscribe();
  }, [user?.uid]);

  // Notifications check
  useEffect(() => {
    if (!user?.uid) return;

    const notificationsRef = ref(database, `users/${user.uid}/notifications`);
    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      const notifications = snapshot.val() || {};
      const unread = Object.values(notifications).filter(
        (n: unknown) => (n as Notification)?.read === false
      ).length;
      setUnreadCount(unread);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-white hover:bg-white/20 flex items-center gap-2"
          aria-label="User menu"
        >
          <FiUser className="text-lg" />
          <span className="truncate max-w-[120px]">
            {user?.displayName || "Profile"}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="bg-white text-black rounded-lg shadow-lg w-48 border-none mt-2"
        align="end"
      >
        <DropdownMenuItem className="hover:bg-gray-100 px-4 py-2.5">
          <Link href="/profile" className="w-full flex items-center gap-2">
            <FiUser className="text-lg" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="hover:bg-gray-100 px-4 py-2.5">
          <Link
            href="/notifications"
            className="w-full flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <FiBell className="text-lg" />
              Notifications
            </div>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs min-w-[24px] flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Link>
        </DropdownMenuItem>

        {isAdmin && (
          <DropdownMenuItem>
            <Link href="/admin" className="flex items-center gap-2 w-full">
              <FiSettings />
              Admin Dashboard
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          className="hover:bg-gray-100 px-4 py-2.5 text-red-600"
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
