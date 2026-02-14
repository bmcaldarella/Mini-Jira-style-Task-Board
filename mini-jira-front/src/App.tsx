import { Header } from "./components/Header";
import { Forms } from "./components/Forms";
import { Board } from "./components/Board";
import { useBoard } from "./hooks/useBoard";

export default function App() {
  const { members, memberById, tasksByStatus, loading, err, loadAll, createTask, createMember, assignTask, moveTask } =
    useBoard();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Header onRefresh={loadAll} />

        <Forms members={members} onCreateTask={createTask} onCreateMember={createMember} err={err} loading={loading} />

        <Board tasksByStatus={tasksByStatus} members={members} memberNameById={memberById} onAssign={assignTask} onMove={moveTask} />

      </div>
    </div>
  );
}
