"use client";

import {
  useState,
  useEffect,
  useRef,
  type ChangeEvent,
  type FormEvent,
} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  Pencil,
  ExternalLink,
  LogOut,
  Play,
  X,
  Upload,
  Youtube,
  Loader2,
  Globe,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import type { PressEntry } from "@/lib/db";

// ── Types ────────────────────────────────────────────────────────────────────

type FormState = {
  outlet: string;
  badge: string;
  headline: string;
  url: string;
  year: string;
  image: string;
  object_position: string;
  is_video: boolean;
};

const EMPTY_FORM: FormState = {
  outlet: "",
  badge: "",
  headline: "",
  url: "",
  year: "",
  image: "",
  object_position: "center 50%",
  is_video: false,
};

const POSITION_OPTIONS = [
  { label: "Top", value: "center top" },
  { label: "Center Top", value: "center 25%" },
  { label: "Center", value: "center 50%" },
  { label: "Center Bottom", value: "center 75%" },
  { label: "Bottom", value: "center bottom" },
];

// ── Toast ────────────────────────────────────────────────────────────────────

function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg shadow-xl text-sm font-semibold text-white animate-fade-in ${
        type === "success" ? "bg-[#059669]" : "bg-[#E41133]"
      }`}
    >
      {type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
      {message}
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────

export default function Dashboard() {
  const router = useRouter();
  const [entries, setEntries] = useState<PressEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [ytLoading, setYtLoading] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // ── Helpers ────────────────────────────────────────────────────────────────

  function showToast(message: string, type: "success" | "error") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }

  async function fetchEntries() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/press");
      if (res.ok) setEntries(await res.json());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchEntries(); }, []);

  // ── DB Init / Seed ─────────────────────────────────────────────────────────

  async function handleInit() {
    setInitializing(true);
    try {
      const res = await fetch("/api/admin/init", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        showToast("Database initialized and seeded!", "success");
        await fetchEntries();
      } else {
        showToast(data.error ?? "Init failed", "error");
      }
    } finally {
      setInitializing(false);
    }
  }

  // ── Panel helpers ──────────────────────────────────────────────────────────

  function openAdd() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setImageFile(null);
    setImagePreview("");
    setPanelOpen(true);
  }

  function openEdit(entry: PressEntry) {
    setEditingId(entry.id);
    setForm({
      outlet: entry.outlet,
      badge: entry.badge,
      headline: entry.headline,
      url: entry.url,
      year: entry.year,
      image: entry.image,
      object_position: entry.object_position,
      is_video: entry.is_video,
    });
    setImageFile(null);
    setImagePreview(entry.image);
    setPanelOpen(true);
  }

  function closePanel() {
    setPanelOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setImageFile(null);
    setImagePreview("");
  }

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  // ── Image file pick ────────────────────────────────────────────────────────

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setField("image", ""); // will be set after upload
  }

  // ── YouTube auto-fetch ─────────────────────────────────────────────────────

  async function fetchYoutubeMeta() {
    if (!form.url) return;
    setYtLoading(true);
    try {
      const res = await fetch(`/api/admin/youtube-meta?url=${encodeURIComponent(form.url)}`);
      if (!res.ok) { showToast("Could not fetch video details", "error"); return; }
      const data = await res.json();
      setForm((f) => ({
        ...f,
        headline: f.headline || data.title,
        image: f.image || data.thumbnail,
        badge: f.badge || `YouTube · ${data.author}`,
      }));
      if (!imagePreview) setImagePreview(data.thumbnail);
    } finally {
      setYtLoading(false);
    }
  }

  // ── Save ───────────────────────────────────────────────────────────────────

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      let imageUrl = form.image;

      // Upload file if a new one was picked
      if (imageFile) {
        const fd = new FormData();
        fd.append("file", imageFile);
        const upRes = await fetch("/api/admin/upload", { method: "POST", body: fd });
        if (!upRes.ok) { showToast("Image upload failed", "error"); return; }
        const { url } = await upRes.json();
        imageUrl = url;
      }

      const payload = { ...form, image: imageUrl };
      const url = editingId ? `/api/admin/press/${editingId}` : "/api/admin/press";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast(editingId ? "Entry updated!" : "Entry added!", "success");
        closePanel();
        await fetchEntries();
      } else {
        const data = await res.json();
        showToast(data.error ?? "Save failed", "error");
      }
    } finally {
      setSaving(false);
    }
  }

  // ── Delete ─────────────────────────────────────────────────────────────────

  async function handleDelete(id: number) {
    if (!confirm("Delete this entry? This cannot be undone.")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/press/${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Entry deleted", "success");
        setEntries((prev) => prev.filter((e) => e.id !== id));
      } else {
        showToast("Delete failed", "error");
      }
    } finally {
      setDeleting(null);
    }
  }

  // ── Logout ─────────────────────────────────────────────────────────────────

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  // ── Stats ──────────────────────────────────────────────────────────────────

  const videoCount = entries.filter((e) => e.is_video).length;
  const articleCount = entries.length - videoCount;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0B0F19]/95 backdrop-blur border-b border-white/[0.07]">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#E41133] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-xs">M</span>
            </div>
            <span className="text-white font-bold text-sm">Admin Panel</span>
            <span className="text-[#374151] text-sm hidden sm:inline">/ Press &amp; Media</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-[#9CA3AF] hover:text-white text-xs font-medium transition-colors"
            >
              <Globe size={12} />
              View Site
              <ExternalLink size={10} />
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[#9CA3AF] hover:text-white text-xs font-medium transition-colors"
            >
              <LogOut size={12} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-8">
        {/* Stats + actions row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <StatChip label="Total" value={entries.length} />
            <StatChip label="Articles" value={articleCount} />
            <StatChip label="Videos" value={videoCount} color="#E41133" />
          </div>
          <div className="flex items-center gap-2">
            {entries.length === 0 && !loading && (
              <button
                onClick={handleInit}
                disabled={initializing}
                className="flex items-center gap-1.5 px-3 py-2 bg-[#111827] border border-white/[0.08] hover:border-white/20 text-[#9CA3AF] hover:text-white text-xs font-medium rounded transition-colors disabled:opacity-50"
              >
                {initializing ? <Loader2 size={13} className="animate-spin" /> : <RefreshCw size={13} />}
                Initialize &amp; Seed DB
              </button>
            )}
            <button
              onClick={openAdd}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#E41133] hover:bg-[#cc0f2d] text-white text-sm font-bold rounded transition-colors"
            >
              <Plus size={14} />
              Add Entry
            </button>
          </div>
        </div>

        {/* Entries */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-[#6B7280]">
            <Loader2 size={24} className="animate-spin mr-3" />
            Loading entries…
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#6B7280] mb-4">No entries yet.</p>
            <button
              onClick={handleInit}
              disabled={initializing}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111827] border border-white/[0.08] text-[#9CA3AF] text-sm font-medium rounded hover:border-white/20 transition-colors disabled:opacity-50"
            >
              {initializing ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
              Initialize Database &amp; Seed Entries
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {entries.map((entry) => (
              <EntryRow
                key={entry.id}
                entry={entry}
                onEdit={() => openEdit(entry)}
                onDelete={() => handleDelete(entry.id)}
                isDeleting={deleting === entry.id}
              />
            ))}
          </div>
        )}
      </main>

      {/* Slide-over panel */}
      {panelOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={closePanel}
          />
          {/* Panel */}
          <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-[#111827] border-l border-white/[0.08] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
              <h2 className="text-white font-bold text-base">
                {editingId ? "Edit Entry" : "Add Press Entry"}
              </h2>
              <button onClick={closePanel} className="text-[#6B7280] hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="px-6 py-6 space-y-5">
              {/* Type toggle */}
              <div>
                <label className="field-label">Entry Type</label>
                <div className="flex rounded overflow-hidden border border-white/[0.1]">
                  <ToggleBtn
                    active={!form.is_video}
                    onClick={() => setField("is_video", false)}
                    icon={<Globe size={13} />}
                    label="Article"
                  />
                  <ToggleBtn
                    active={form.is_video}
                    onClick={() => setField("is_video", true)}
                    icon={<Youtube size={13} />}
                    label="Video"
                  />
                </div>
              </div>

              {/* URL + YouTube fetch */}
              <div>
                <label className="field-label">URL *</label>
                <div className="flex gap-2">
                  <input
                    required
                    type="url"
                    value={form.url}
                    onChange={(e) => setField("url", e.target.value)}
                    placeholder="https://"
                    className="field-input flex-1"
                  />
                  {form.is_video && (
                    <button
                      type="button"
                      onClick={fetchYoutubeMeta}
                      disabled={ytLoading || !form.url}
                      className="flex items-center gap-1.5 px-3 py-2 bg-[#E41133]/20 border border-[#E41133]/30 text-[#E41133] text-xs font-bold rounded hover:bg-[#E41133]/30 transition-colors disabled:opacity-40 whitespace-nowrap"
                    >
                      {ytLoading ? <Loader2 size={12} className="animate-spin" /> : <Youtube size={12} />}
                      Auto-fill
                    </button>
                  )}
                </div>
              </div>

              {/* Outlet */}
              <div>
                <label className="field-label">Outlet / Source *</label>
                <input
                  required
                  value={form.outlet}
                  onChange={(e) => setField("outlet", e.target.value)}
                  placeholder="e.g. MSN, Forbes, YouTube"
                  className="field-input"
                />
              </div>

              {/* Badge */}
              <div>
                <label className="field-label">Badge Text *</label>
                <input
                  required
                  value={form.badge}
                  onChange={(e) => setField("badge", e.target.value)}
                  placeholder="e.g. Money & Business, Featured Interview"
                  className="field-input"
                />
              </div>

              {/* Headline */}
              <div>
                <label className="field-label">Headline *</label>
                <textarea
                  required
                  rows={2}
                  value={form.headline}
                  onChange={(e) => setField("headline", e.target.value)}
                  placeholder="Article title or video episode title"
                  className="field-input resize-none"
                />
              </div>

              {/* Year / Label */}
              <div>
                <label className="field-label">Year / Label *</label>
                <input
                  required
                  value={form.year}
                  onChange={(e) => setField("year", e.target.value)}
                  placeholder="e.g. 2026, Ep. 76, Featured"
                  className="field-input"
                />
              </div>

              {/* Image */}
              <div>
                <label className="field-label">Cover Image</label>
                <div className="space-y-3">
                  {/* Preview */}
                  {(imagePreview || form.image) && (
                    <div className="relative w-full aspect-video rounded overflow-hidden bg-[#0B0F19]">
                      <Image
                        src={imagePreview || form.image}
                        alt="Preview"
                        fill
                        unoptimized
                        className="object-cover"
                        style={{ objectPosition: form.object_position }}
                      />
                    </div>
                  )}

                  {/* File upload */}
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-white/[0.15] rounded text-[#9CA3AF] text-sm hover:border-white/30 hover:text-white transition-colors"
                  >
                    <Upload size={14} />
                    {imageFile ? imageFile.name : "Upload image (JPEG, PNG, WebP)"}
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  {/* Or URL */}
                  <div className="flex items-center gap-2 text-[#4B5563] text-xs">
                    <div className="flex-1 h-px bg-white/[0.06]" />
                    or paste URL
                    <div className="flex-1 h-px bg-white/[0.06]" />
                  </div>
                  <input
                    type="url"
                    value={imageFile ? "" : form.image}
                    onChange={(e) => {
                      setField("image", e.target.value);
                      setImagePreview(e.target.value);
                      setImageFile(null);
                    }}
                    placeholder="https://…"
                    className="field-input"
                    disabled={!!imageFile}
                  />
                </div>
              </div>

              {/* Image position */}
              <div>
                <label className="field-label">Image Focus</label>
                <select
                  value={form.object_position}
                  onChange={(e) => setField("object_position", e.target.value)}
                  className="field-input"
                >
                  {POSITION_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closePanel}
                  className="flex-1 px-4 py-2.5 border border-white/[0.1] text-[#9CA3AF] text-sm font-medium rounded hover:border-white/20 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#E41133] hover:bg-[#cc0f2d] disabled:opacity-50 text-white text-sm font-bold rounded transition-colors"
                >
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  {saving ? "Saving…" : editingId ? "Update Entry" : "Add Entry"}
                </button>
              </div>
            </form>
          </aside>
        </>
      )}

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} />}

      <style>{`
        .field-label { display:block; color:#9CA3AF; font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:0.4rem; }
        .field-input { display:block; width:100%; background:#0B0F19; border:1px solid rgba(255,255,255,0.1); border-radius:0.25rem; padding:0.625rem 0.75rem; color:#fff; font-size:0.875rem; outline:none; transition:border-color 0.15s; }
        .field-input:focus { border-color:rgba(228,17,51,0.5); }
        .field-input::placeholder { color:#4B5563; }
        .field-input option { background:#111827; }
        @keyframes fade-in { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }
        .animate-fade-in { animation: fade-in 0.2s ease; }
      `}</style>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatChip({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#111827] border border-white/[0.07] rounded text-sm">
      <span className="text-[#6B7280]">{label}</span>
      <span className="font-black" style={{ color: color ?? "#fff" }}>{value}</span>
    </div>
  );
}

function ToggleBtn({
  active, onClick, icon, label,
}: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-bold transition-colors ${
        active ? "bg-[#E41133] text-white" : "bg-[#0B0F19] text-[#6B7280] hover:text-white"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function EntryRow({
  entry, onEdit, onDelete, isDeleting,
}: { entry: PressEntry; onEdit: () => void; onDelete: () => void; isDeleting: boolean }) {
  return (
    <div className="flex items-center gap-4 bg-[#111827] border border-white/[0.06] rounded-lg px-4 py-3 hover:border-white/[0.12] transition-colors group">
      {/* Thumbnail */}
      <div className="relative w-20 h-14 rounded overflow-hidden flex-shrink-0 bg-[#0B0F19]">
        <Image
          src={entry.image}
          alt={entry.headline}
          fill
          unoptimized
          sizes="80px"
          className="object-cover"
          style={{ objectPosition: entry.object_position }}
        />
        {entry.is_video && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <Play size={14} className="text-white fill-white" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#E41133] rounded text-[10px] font-black text-white uppercase tracking-wide">
            {entry.outlet}
          </span>
          {entry.is_video ? (
            <span className="text-[10px] font-bold text-[#E41133] uppercase tracking-wide">Video</span>
          ) : (
            <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wide">Article</span>
          )}
          <span className="text-[10px] text-[#4B5563]">{entry.year}</span>
        </div>
        <p className="text-white text-sm font-semibold truncate">{entry.headline}</p>
        <a
          href={entry.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4B5563] text-xs hover:text-[#9CA3AF] transition-colors inline-flex items-center gap-1 mt-0.5"
          onClick={(e) => e.stopPropagation()}
        >
          {entry.url.slice(0, 55)}{entry.url.length > 55 ? "…" : ""}
          <ExternalLink size={9} />
        </a>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <button
          onClick={onEdit}
          className="p-2 text-[#6B7280] hover:text-white hover:bg-white/[0.06] rounded transition-colors"
          title="Edit"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={onDelete}
          disabled={isDeleting}
          className="p-2 text-[#6B7280] hover:text-[#E41133] hover:bg-[#E41133]/10 rounded transition-colors disabled:opacity-50"
          title="Delete"
        >
          {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
        </button>
      </div>
    </div>
  );
}
