import { Router } from "express";
import crypto from "crypto";
import { members } from "../db/store";
import { isNonEmptyString } from "../utils/validate";

const router = Router();

router.get("/members", (_req, res) => {
  res.json(members);
});

router.post("/members", (req, res) => {
  const { name } = req.body;

  if (!isNonEmptyString(name)) {
    return res.status(400).json({ error: "name is required" });
  }

  const clean = name.trim();
  const exists = members.some(m => m.name.toLowerCase() === clean.toLowerCase());
  if (exists) return res.status(409).json({ error: "member already exists" });

  const newMember = { id: crypto.randomUUID(), name: clean };
  members.push(newMember);

  res.status(201).json(newMember);
});

export default router;
