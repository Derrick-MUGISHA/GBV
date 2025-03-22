// Updated types.ts with proper typing for Firebase

import { Timestamp } from 'firebase/firestore';

export interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string | number;
  userId: string;
  isAuthenticated?: boolean;
  persistent?: boolean;
  
}


export type ChatGroupId = "Rwanda" | "General" | "Help" | "Announcements" | "Resources" | "Others";

export interface ChatGroup {
  id: ChatGroupId;
  name?: string; // Making name optional with ?
}

export interface UserProfile {
  displayName: string;
  createdAt: Timestamp | null; // Firebase timestamp
  lastSeen: Timestamp | null; // Firebase timestamp
  groups: {
    [groupId: string]: boolean;
  };
}