import { useState } from "react";
import type { Member } from "../types";

export function Forms({
  members,
  onCreateTask,
  onCreateMember,
  err,
  loading
}: {
  members: Member[];
  onCreateTask: (title: string, description?: string) => void;
  onCreateMember: (name: string) => void;
  err: string | null;
  loading: boolean;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [memberName, setMemberName] = useState("");

  return (
    <section className="mt-6 rounded-2xl border border-white/10 bg-zinc-900/40 p-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onCreateTask(title, description);
          setTitle("");
          setDescription("");
        }}
        className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title (required)"
          className="rounded-xl border border-white/10 bg-zinc-950/40 px-4 py-2 text-sm outline-none focus:border-white/20"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="rounded-xl border border-white/10 bg-zinc-950/40 px-4 py-2 text-sm outline-none focus:border-white/20"
        />
        <button type="submit" className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200">
          Create
        </button>
      </form>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onCreateMember(memberName);
          setMemberName("");
        }}
        className="mt-3 flex gap-2"
      >
        <input
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
          placeholder="New team member name"
          className="flex-1 rounded-xl border border-white/10 bg-zinc-950/40 px-4 py-2 text-sm outline-none focus:border-white/20"
        />
        <button type="submit" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
          Add member
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {members.map((m) => (
          <span key={m.id} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
            {m.name}
          </span>
        ))}
        {members.length === 0 && <span className="text-sm text-zinc-500">No members yet.</span>}
      </div>

      {err && (
        <div className="mt-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-200">
          {err}
        </div>
      )}

      {loading && <p className="mt-3 text-sm text-zinc-400">Loading…</p>}
    </section>
  );
}
