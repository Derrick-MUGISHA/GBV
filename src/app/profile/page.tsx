"use client";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { Button } from "@/components/ui/button";
import { FiEdit, FiSave, FiHome } from "react-icons/fi";
import Link from "next/link";

export default function ProfilePage() {
  const [user] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");

  // Check for admin claim when user changes
  React.useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const token = await user.getIdTokenResult();
        setIsAdmin(!!token.claims.admin);
      }
    };
    checkAdminStatus();
  }, [user]);
  
  const handleSave = () => {
    // Add logic to update the user's profile (e.g., Firebase updateProfile)
    setIsEditing(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 py-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md border border-purple-200">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-purple-800">My Profile</h1>
          <Link href="/">
            <Button 
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"
            >
              <FiHome /> Home
            </Button>
          </Link>
        </div>
        <div className="space-y-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center shadow-md">
              <span className="text-3xl font-bold text-white">
                {user?.displayName?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="form-group mb-4">
                  <label htmlFor="displayName" className="block text-sm font-medium text-purple-700 mb-1">
                    Display Name
                  </label>
                  <input
                    id="displayName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-purple-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter your display name"
                    aria-label="Display Name"
                  />
                </div>
              ) : (
                <h2 className="text-2xl font-semibold text-purple-800">{user?.displayName || "Anonymous User"}</h2>
              )}
              <p className="text-purple-600">{user?.email}</p>
            </div>
          </div>
          
          <div className="flex gap-4">
          {isEditing ? (
            <Button 
              onClick={handleSave} 
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"
            >
              <FiSave /> Save Changes
            </Button>
          ) : (
            <Button 
              onClick={() => setIsEditing(true)} 
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"
            >
              <FiEdit /> Edit Profile
            </Button>
          )}
            <Link href="/notifications">
              <Button 
                variant="outline" 
                className="border-purple-400 text-purple-700 hover:bg-purple-50"
              >
                View Notifications
              </Button>
            </Link>
          </div>
          
          {isAdmin && (
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 mt-6">
              <h3 className="text-xl font-semibold mb-3 text-purple-800">Admin Actions</h3>
              <Link href="/admin">
                <Button 
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Go to Admin Dashboard
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}