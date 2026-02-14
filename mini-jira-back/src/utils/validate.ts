import { Status } from "../models/types";

export function isNonEmptyString(x: unknown): x is string {
  return typeof x === "string" && x.trim().length > 0;
}

export function isValidStatus(x: unknown): x is Status {
  return x === "Created" || x === "In Progress" || x === "Done";
}
