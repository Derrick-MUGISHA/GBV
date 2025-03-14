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
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { FiBell, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { database, ref, onValue } from '@/app/firebase/config';

interface User {
  displayName: string | null;
  isAdmin?: boolean;
  uid: string;
  read: boolean;
}

interface ProfileDropdownProps {
    user: User | null | undefined; // Allow `null` and `undefined` to be valid
  }

  function ProfileDropdown({ user }: ProfileDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const [unreadCount, setUnreadCount] = useState(0);

    interface Notification {
      read: boolean;
      // Add other properties as needed
    }
  
    const handleLogout = () => {
      signOut(auth)
        .then(() => {
          localStorage.removeItem("user");
          router.push("/");
        })
        .catch((error) => console.error("Logout error:", error));
    };
  
    useEffect(() => {
      if (user) {
        const notificationsRef = ref(database, `users/${user.uid}/notifications`);
        const unsubscribe = onValue(notificationsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const notifications = Object.values(data).filter(
              (notification) => notification as Notification
            ) as Notification[];
            setUnreadCount(notifications.length);
          } else {
            setUnreadCount(0);
          }
        });
  
        return () => unsubscribe();
      }
    }, [user]);
  
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
