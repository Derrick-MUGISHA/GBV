import { ref, set } from "firebase/database";
import { database } from "@/app/firebase/config";
import { User } from "firebase/auth";

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