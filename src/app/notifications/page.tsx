"use client";

import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotificationsPage() {
  const [user] = useAuthState(auth);

  // Example notifications data
  const notifications = [
    {
      id: 1,
      title: "New Message",
      message: "You have a new message from John Doe.",
      date: "2023-10-15",
    },
    {
      id: 2,
      title: "System Update",
      message: "The system will be down for maintenance on 2023-10-20.",
      date: "2023-10-14",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 py-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md border-2 border-pink-300">
        <h1 className="text-3xl font-bold mb-6 text-purple-700">Notifications</h1>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-4 border border-pink-200 rounded-lg hover:bg-pink-50 transition"
            >
              <h2 className="text-xl font-semibold text-purple-600">{notification.title}</h2>
              <p className="text-gray-600">{notification.message}</p>
              <p className="text-sm text-pink-400">{notification.date}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex space-x-3">
          <Link href="/">
            <Button className="bg-pink-500 hover:bg-pink-600 text-white">
              <Home className="mr-2 h-4 w-4" /> Home
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="outline" className="border-purple-400 text-purple-600 hover:bg-purple-50">
              Back to Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}