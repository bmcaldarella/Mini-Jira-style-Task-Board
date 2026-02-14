export type Status = "Created" | "In Progress" | "Done";

export type Member = {
  id: string;
  name: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  assigneeId?: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
};
