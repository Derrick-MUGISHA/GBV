import { ref, set } from "firebase/database";
import { database } from "@/app/firebase/config";
import { User } from "firebase/auth";
import { firestore, auth } from "@/app/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";

export async function createUserProfile(user: User) {
  const userRef = ref(database, "users/" + user.uid);
  await set(userRef, {
    email: user.email,
    communities: [],
    createdAt: new Date().toISOString()
  });
}



import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const useUserRole = () => {
  const [role, setRole] = useState<"user" | "admin" | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        } else {
          setRole("user");
        }
      } else {
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return role;
};