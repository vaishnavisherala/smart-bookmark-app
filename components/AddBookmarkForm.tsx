"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AddBookmarkForm({ user }: any) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addBookmark = async (e: any) => {
    e.preventDefault();
    await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ]);
    setTitle("");
    setUrl("");
  };

  return (
    <form onSubmit={addBookmark} className="flex gap-3 mb-6">
      <input
        className="border p-2 text-black rounded w-1/3"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className="border p-2 text-black rounded w-1/2"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <button className="bg-indigo-600 text-white px-4 rounded">
        Add
      </button>
    </form>
  );
}
