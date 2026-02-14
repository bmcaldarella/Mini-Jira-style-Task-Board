export function Header({ onRefresh }: { onRefresh: () => void }) {
  return (
    <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Mini Jira Board</h1>
      </div>

      <button
        onClick={onRefresh}
        className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
      >
        Refresh
      </button>
    </header>
  );
}
