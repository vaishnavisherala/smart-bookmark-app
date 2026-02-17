
"use client";
export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/dashboard",
      },
    });
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <button
        onClick={login}
        className="bg-white text-blue-600 px-6 py-3 rounded-xl shadow-lg font-semibold hover:scale-105 transition"
      >
        Sign in with Google
      </button>
    </main>
  );
}
