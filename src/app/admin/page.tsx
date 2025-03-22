"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, push, update, remove } from "firebase/database";
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const database = getDatabase();

type DataItem = {
  id: string;
  name: string;
};

function AdminDashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState<DataItem[]>([]);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (session) {
      const dbRef = ref(database, "your_data");
      onValue(dbRef, (snapshot) => {
        const fetchedData = snapshot.val();
        const dataArray = fetchedData ? Object.keys(fetchedData).map((key) => ({ id: key, ...fetchedData[key] })) : [];
        setData(dataArray);
      });
    }
  }, [session]);

  const handleAdd = () => {
    if (newName.trim() !== "") {
      push(ref(database, "your_data"), { name: newName });
      setNewName("");
    }
  };

  const handleUpdate = (id: string, updatedName: string) => {
    update(ref(database, `your_data/${id}`), { name: updatedName });
  };

  const handleDelete = (id: string) => {
    remove(ref(database, `your_data/${id}`));
  };

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <button onClick={() => signIn("google")} className="btn btn-primary">
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Welcome, {session.user?.email}</p>
      <button onClick={() => signOut()} className="btn btn-error mt-4">
        Sign Out
      </button>

      <div className="mt-5">
        <h2 className="text-xl font-semibold">Realtime Database Data:</h2>
        <input 
          type="text" 
          value={newName} 
          onChange={(e) => setNewName(e.target.value)} 
          placeholder="Enter name" 
          className="input input-bordered my-2"
        />
        <button onClick={handleAdd} className="btn btn-success ml-2">Add</button>
        {data.length ? (
          data.map((item) => (
            <div key={item.id} className="card bg-gray-100 p-3 my-2 flex justify-between">
              <label className="flex flex-col">
                <span className="mb-1">Edit Name</span>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleUpdate(item.id, e.target.value)}
                  className="input input-bordered"
                  placeholder="Enter new name"
                  title="Edit name input field"
                />
              </label>
              <button onClick={() => handleDelete(item.id)} className="btn btn-error ml-2">Delete</button>
            </div>
          ))
        ) : (
          <p>No data found</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
