
"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AddBookmarkForm from "@/components/AddBookmarkForm";
import BookmarkList from "@/components/BookmarkList";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        window.location.href = "/";
      } else {
        setUser(data.user);
      }
    };

    getUser();
  }, []);

  if (!user) return null;

  return (
    <main className="min-h-screen bg-blue-100 p-6">
      <h1 className="text-3xl bg-blue-900 text-white font-bold mb-6">
        Welcome {user.user_metadata.full_name}
      </h1>

      <AddBookmarkForm user={user} />
      <BookmarkList user={user} />
    </main>
  );
}
