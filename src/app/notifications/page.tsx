"use client";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, database, ref, onValue, set } from "@/app/firebase/config";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotificationsPage() {
  const [user] = useAuthState(auth);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  interface Notification {
    id: string;
    createdAt: Date;
    read: boolean;
    type: string; // e.g., 'report_response'
    message: string; // Notification message
    response?: string; // Admin's response (if applicable)
  }

  useEffect(() => {
    if (user) {
      const notificationsRef = ref(database, `users/${user.uid}/notifications`);
      const unsubscribe = onValue(notificationsRef, (snapshot) => {
        const data = snapshot.val();
        const loadedNotifications = data ? Object.keys(data).map(key => ({
          id: key,
          ...data[key],
          createdAt: data[key].createdAt ? new Date(data[key].createdAt) : new Date(),
          read: data[key].read || false // Handle legacy notifications without read status
        })) : [];
        
        setNotifications(loadedNotifications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
        
        // Calculate unread count
        const unread = loadedNotifications.filter(n => !n.read).length;
        setUnreadCount(unread);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const markAsRead = async (notificationId: string) => {
    if (!user) return;
    
    try {
      const notificationRef = ref(database, `users/${user.uid}/notifications/${notificationId}`);
      await set(notificationRef, {
        ...notifications.find(n => n.id === notificationId),
        read: true
      });
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;

    try {
      const updates: { [key: string]: boolean } = {};
      notifications.forEach(notification => {
        if (!notification.read) {
          updates[`${notification.id}/read`] = true;
        }
      });
      
      const notificationsRef = ref(database, `users/${user.uid}/notifications`);
      await set(notificationsRef, { ...notifications, ...updates });
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 py-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md border-2 border-pink-300">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-purple-700">
            Notifications {unreadCount > 0 && `(${unreadCount})`}
          </h1>
          {unreadCount > 0 && (
            <Button 
              onClick={markAllAsRead}
              className="bg-pink-500 hover:bg-pink-600 text-white"
            >
              Mark All as Read
            </Button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No notifications found
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border rounded-lg transition ${
                  !notification.read 
                    ? 'border-pink-300 bg-pink-50' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-purple-600">
                      {notification.type === 'report_response'
                        ? 'Report Response'
                        : 'System Notification'}
                    </h2>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                    {notification.response && (
                      <div className="mt-2 p-3 bg-blue-50 rounded-md">
                        <p className="text-sm text-blue-700">
                          <strong>Response:</strong> {notification.response}
                        </p>
                      </div>
                    )}
                    <p className="text-sm text-pink-400 mt-2">
                      {notification.createdAt.toLocaleDateString()} -{' '}
                      {notification.createdAt.toLocaleTimeString()}
                    </p>
                  </div>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-sm bg-pink-500 text-white px-3 py-1 rounded-full hover:bg-pink-600"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

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