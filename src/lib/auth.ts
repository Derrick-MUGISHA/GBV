import { doc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { User } from "firebase/auth";

export async function createUserProfile(user: User) {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    email: user.email,
    communities: [],
    createdAt: new Date()
  });
}



import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}