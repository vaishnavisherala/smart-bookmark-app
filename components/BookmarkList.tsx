"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BookmarkList({ user }: any) {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchBookmarks();
    }

    const channel = supabase
      .channel("realtime-bookmarks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        () => {
          fetchBookmarks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  const deleteBookmark = async (id: string) => {
  // instantly remove from UI
  setBookmarks((prev) => prev.filter((b) => b.id !== id));

  await supabase.from("bookmarks").delete().eq("id", id);
};


  return (
    <div className="space-y-3 mt-6">
      {bookmarks.length === 0 && (
        <p className="text-gray-500">No bookmarks yet.</p>
      )}

      {bookmarks.map((b) => (
        <div
          key={b.id}
          className="bg-white p-4 rounded shadow flex justify-between items-center"
        >
          <div>
            <a
              href={b.url}
              target="_blank"
              className="font-semibold text-blue-600"
            >
              {b.title}
            </a>
            <p className="text-sm text-gray-500">{b.url}</p>
          </div>

          <button
            onClick={() => deleteBookmark(b.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
