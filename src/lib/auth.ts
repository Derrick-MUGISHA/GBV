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

export interface AppUser extends User {
  role?: 'user' | 'admin';
}

export const useAuth = () => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Force token refresh to get latest claims
        const token = await firebaseUser.getIdTokenResult(true);
        
        const enhancedUser: AppUser = {
          ...firebaseUser,
          role: (token.claims.role as 'user' | 'admin') || 'user'
        };

        setUser(enhancedUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};