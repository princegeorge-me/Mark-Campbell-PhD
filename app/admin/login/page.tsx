"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Incorrect password. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#E41133] mb-4">
            <span className="text-white font-black text-lg">M</span>
          </div>
          <h1 className="text-white text-xl font-black tracking-tight">Admin Panel</h1>
          <p className="text-[#6B7280] text-sm mt-1">markcampbellphd.com</p>
        </div>

        {/* Card */}
        <div className="bg-[#111827] border border-white/[0.08] rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#9CA3AF] text-xs font-bold uppercase tracking-widest mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0B0F19] border border-white/[0.12] rounded px-3 py-2.5 text-white text-sm placeholder:text-[#4B5563] focus:outline-none focus:border-[#E41133]/60 transition-colors"
                placeholder="Enter admin password"
                required
                autoFocus
              />
            </div>

            {error && (
              <p className="text-[#E41133] text-sm bg-[#E41133]/10 border border-[#E41133]/20 rounded px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E41133] hover:bg-[#cc0f2d] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded text-sm transition-colors"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-[#374151] text-xs mt-6">
          &larr;{" "}
          <a href="/" className="hover:text-[#6B7280] transition-colors">
            Back to website
          </a>
        </p>
      </div>
    </div>
  );
}
