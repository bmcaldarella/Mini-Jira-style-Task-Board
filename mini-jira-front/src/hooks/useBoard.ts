import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { api } from "../api/client";
import type { Member, Status, Task } from "../types";

export function useBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const aliveRef = useRef(true);
  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);

  const loadAll = useCallback(async () => {
    try {
      setErr(null);
      setLoading(true);
      const [t, m] = await Promise.all([api.getTasks(), api.getMembers()]);
      if (!aliveRef.current) return;
      setTasks(t);
      setMembers(m);
    } catch (e: any) {
      if (!aliveRef.current) return;
      setErr(e?.message ?? "Something went wrong");
    } finally {
      if (!aliveRef.current) return;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const memberById = useMemo(() => new Map(members.map(m => [m.id, m.name])), [members]);

  const tasksByStatus = useMemo(() => {
    const map: Record<Status, Task[]> = { Created: [], "In Progress": [], Done: [] };
    for (const t of tasks) map[t.status].push(t);
    return map;
  }, [tasks]);

  const createTask = useCallback(async (title: string, description?: string) => {
    const t = title.trim();
    const d = (description ?? "").trim();
    if (!t) return;

    try {
      setErr(null);
      await api.createTask({ title: t, description: d || undefined });
      await loadAll();
    } catch (e: any) {
      setErr(e?.message ?? "Failed to create task");
    }
  }, [loadAll]);

  const createMember = useCallback(async (name: string) => {
    const n = name.trim();
    if (!n) return;

    try {
      setErr(null);
      await api.createMember(n);
      await loadAll();
    } catch (e: any) {
      setErr(e?.message ?? "Failed to create member");
    }
  }, [loadAll]);

  const assignTask = useCallback(async (taskId: string, assigneeId: string) => {
    if (!assigneeId) return;
    try {
      setErr(null);
      await api.assignTask(taskId, assigneeId);
      await loadAll();
    } catch (e: any) {
      setErr(e?.message ?? "Failed to assign task");
    }
  }, [loadAll]);

  const moveTask = useCallback(async (taskId: string, status: Status) => {
    try {
      setErr(null);
      await api.moveTask(taskId, status);
      await loadAll();
    } catch (e: any) {
      setErr(e?.message ?? "Failed to move task");
    }
  }, [loadAll]);

  return { members, memberById, tasksByStatus, loading, err, loadAll, createTask, createMember, assignTask, moveTask };
}
