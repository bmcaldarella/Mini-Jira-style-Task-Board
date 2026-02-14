import { Router } from "express";
import crypto from "crypto";
import { tasks, members } from "../db/store";
import { Task } from "../models/types";
import { isNonEmptyString, isValidStatus } from "../utils/validate";

const router = Router();

router.get("/tasks", (req, res) => {
  const status = req.query.status;
  if (status && !isValidStatus(status)) {
    return res.status(400).json({ error: "Invalid status filter" });
  }

  const filtered = status ? tasks.filter(t => t.status === status) : tasks;
  res.json(filtered);
});

router.post("/tasks", (req, res) => {
  const { title, description } = req.body;

  if (!isNonEmptyString(title)) {
    return res.status(400).json({ error: "title is required" });
  }

  const now = new Date().toISOString();
  const task: Task = {
    id: crypto.randomUUID(),
    title: title.trim(),
    description: typeof description === "string" ? description.trim() : undefined,
    status: "Created",
    createdAt: now,
    updatedAt: now
  };

  tasks.push(task);
  res.status(201).json(task);
});

router.patch("/tasks/:id/assign", (req, res) => {
  const { id } = req.params;
  const { assigneeId } = req.body;

  if (!isNonEmptyString(assigneeId)) {
    return res.status(400).json({ error: "assigneeId is required" });
  }

  const memberExists = members.some(m => m.id === assigneeId);
  if (!memberExists) return res.status(404).json({ error: "member not found" });

  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: "task not found" });

  task.assigneeId = assigneeId;
  task.updatedAt = new Date().toISOString();

  res.json(task);
});

router.patch("/tasks/:id/move", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!isValidStatus(status)) {
    return res.status(400).json({ error: "status must be Created | In Progress | Done" });
  }

  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: "task not found" });

  const order = ["Created", "In Progress", "Done"] as const;
  const cur = order.indexOf(task.status);
  const nxt = order.indexOf(status);

  if (Math.abs(nxt - cur) > 1) {
    return res.status(400).json({ error: "invalid workflow move" });
  }

  task.status = status;
  task.updatedAt = new Date().toISOString();

  res.json(task);
});

export default router;
