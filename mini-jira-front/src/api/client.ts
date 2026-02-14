import type { Member, Status, Task } from "../types";

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const msg = await res.json().catch(() => null);
    throw new Error(msg?.error ?? `Request failed (${res.status})`);
  }
  return res.json();
}

export const api = {
  getTasks: async (): Promise<Task[]> => json(await fetch(`/api/tasks`)),
  getMembers: async (): Promise<Member[]> => json(await fetch(`/api/members`)),

  createTask: async (data: { title: string; description?: string }) =>
    json<Task>(
      await fetch(`/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
    ),

  createMember: async (name: string) =>
    json<Member>(
      await fetch(`/api/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      })
    ),

  assignTask: async (taskId: string, assigneeId: string) =>
    json<Task>(
      await fetch(`/api/tasks/${taskId}/assign`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assigneeId })
      })
    ),

  moveTask: async (taskId: string, status: Status) =>
    json<Task>(
      await fetch(`/api/tasks/${taskId}/move`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      })
    )
};
