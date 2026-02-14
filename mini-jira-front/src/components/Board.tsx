import { columns } from "../types";
import type { Member, Status, Task } from "../types";
import { TaskCard } from "./TaskCard";

export function Board({
  tasksByStatus,
  members,
  memberNameById,
  onAssign,
  onMove,
}: {
  tasksByStatus: Record<Status, Task[]>;
  members: Member[];
  memberNameById: Map<string, string>;
  onAssign: (taskId: string, assigneeId: string) => void;
  onMove: (taskId: string, status: Status) => void;
}) {
  return (
    <section className="mt-8 grid gap-4 md:grid-cols-3">
      {columns.map((col) => (
        <div key={col.key} className="rounded-2xl border border-white/10 bg-zinc-900/20">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <h2 className="text-sm font-semibold">{col.label}</h2>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-zinc-300">
              {tasksByStatus[col.key].length}
            </span>
          </div>

          <div className="flex flex-col gap-3 p-4">
            {tasksByStatus[col.key].map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                members={members}
                assigneeName={t.assigneeId ? memberNameById.get(t.assigneeId) ?? t.assigneeId : "Unassigned"}
                onAssign={onAssign}
                onMove={onMove}
              />
            ))}

            {tasksByStatus[col.key].length === 0 && (
              <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-zinc-500">
                No tasks here
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
