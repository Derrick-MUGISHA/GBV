// src/app/firebase/admin.ts
import { getDatabase, ref, set } from "firebase/database";
import admin from "firebase-admin";

export async function assignAdminRole(uid: string) {
  // Set in Realtime Database
  const db = getDatabase();
  await set(ref(db, `users/${uid}/role`), 'admin');

  // Set custom claim
  await admin.auth().setCustomUserClaims(uid, { role: 'admin' });
}