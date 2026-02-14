import type { Member, Status, Task } from "../types";

export function TaskCard({
  task,
  members,
  assigneeName,
  onAssign,
  onMove
}: {
  task: Task;
  members: Member[];
  assigneeName: string;
  onAssign: (taskId: string, assigneeId: string) => void;
  onMove: (taskId: string, status: Status) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium">{task.title}</p>
          {task.description && <p className="mt-1 text-xs text-zinc-400">{task.description}</p>}
        </div>

        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-zinc-300">
          {task.status}
        </span>
      </div>

      <div className="mt-3 grid gap-2">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-zinc-400">
            Assignee: <span className="text-zinc-200">{assigneeName}</span>
          </p>

          <select
            value={task.assigneeId ?? ""}
            onChange={(e) => onAssign(task.id, e.target.value)}
            className="rounded-xl border border-white/10 bg-zinc-950/40 px-2 py-1 text-xs outline-none focus:border-white/20"
          >
            <option value="" disabled>
              Assign…
            </option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          {task.status !== "Created" && (
            <button
              onClick={() => onMove(task.id, task.status === "In Progress" ? "Created" : "In Progress")}
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
            >
              ← Back
            </button>
          )}

          {task.status !== "Done" && (
            <button
              onClick={() => onMove(task.id, task.status === "Created" ? "In Progress" : "Done")}
              className="flex-1 rounded-xl bg-white px-3 py-2 text-xs font-medium text-zinc-900 hover:bg-zinc-200"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
