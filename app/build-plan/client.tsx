'use client';

import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Clock,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Inbox,
  Plus,
  X,
  Tag,
} from "lucide-react";

type Status = "done" | "in-progress" | "blocked" | "todo" | "deferred";
type Priority = "high" | "medium" | "low";

interface Task {
  id: string;
  title: string;
  status: Status;
  priority?: Priority;
  notes?: string;
  owner?: string;
  dueNote?: string;
}

interface Section {
  id: string;
  title: string;
  description?: string;
  tasks: Task[];
}

interface BuildPlanData {
  meta: { title: string; subtitle: string; lastUpdated: string };
  sections: Section[];
}

interface InboxItem {
  id: string;
  text: string;
  addedAt: string;
}

const statusIcon = (status: Status) => {
  switch (status) {
    case "done": return <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />;
    case "in-progress": return <Clock size={16} className="text-amber-400 shrink-0" />;
    case "blocked": return <AlertTriangle size={16} className="text-red-400 shrink-0" />;
    case "deferred": return <Circle size={16} className="text-gray-600 shrink-0" />;
    default: return <Circle size={16} className="text-gray-400 shrink-0" />;
  }
};

const statusLabel: Record<Status, string> = {
  done: "Done",
  "in-progress": "In Progress",
  blocked: "Blocked",
  todo: "To Do",
  deferred: "Deferred",
};

const statusBadge: Record<Status, string> = {
  done: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "in-progress": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  blocked: "bg-red-500/10 text-red-400 border-red-500/20",
  todo: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  deferred: "bg-gray-700/20 text-gray-600 border-gray-700/20",
};

const priorityBadge: Record<Priority, string> = {
  high: "bg-red-500/10 text-red-400",
  medium: "bg-amber-500/10 text-amber-400",
  low: "bg-gray-500/10 text-gray-500",
};

function TaskRow({ task }: { task: Task }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3 rounded-lg hover:bg-white/[0.03] transition-colors">
      <div className="mt-0.5">{statusIcon(task.status)}</div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-sm ${task.status === "done" ? "text-gray-500 line-through" : task.status === "deferred" ? "text-gray-600" : "text-gray-200"}`}>
            {task.title}
          </span>
          {task.priority && (
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${priorityBadge[task.priority]}`}>
              {task.priority}
            </span>
          )}
          {task.owner && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 font-medium">
              👤 {task.owner}
            </span>
          )}
          {task.dueNote && (
            <span className="text-[10px] text-amber-400/70">⏰ {task.dueNote}</span>
          )}
        </div>
        {task.notes && (
          <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{task.notes}</p>
        )}
      </div>
      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium shrink-0 ${statusBadge[task.status]}`}>
        {statusLabel[task.status]}
      </span>
    </div>
  );
}

function SectionCard({ section }: { section: Section }) {
  const [collapsed, setCollapsed] = useState(false);
  const total = section.tasks.length;
  const done = section.tasks.filter(t => t.status === "done").length;
  const blocked = section.tasks.filter(t => t.status === "blocked").length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="bg-[#13161F] border border-white/[0.06] rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors text-left"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-sm font-semibold text-white">{section.title}</h3>
            {blocked > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-medium">
                {blocked} blocked
              </span>
            )}
          </div>
          {section.description && (
            <p className="text-xs text-gray-500 mt-0.5 truncate">{section.description}</p>
          )}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-gray-500">{done}/{total} done</p>
            <div className="w-24 h-1 bg-white/[0.06] rounded-full mt-1">
              <div className="h-full rounded-full bg-[#FF6B00] transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
          {collapsed ? <ChevronRight size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
        </div>
      </button>
      {!collapsed && (
        <div className="border-t border-white/[0.04] px-2 py-2 space-y-0.5">
          {section.tasks.map(task => (
            <TaskRow key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

export type { BuildPlanData };
export function BuildPlanClient({ data }: { data: BuildPlanData }) {
  const [inbox, setInbox] = useState<InboxItem[]>([]);
  const [inboxInput, setInboxInput] = useState("");
  const [filter, setFilter] = useState<Status | "all">("all");

  const allTasks = data.sections.flatMap(s => s.tasks);
  const totalDone = allTasks.filter(t => t.status === "done").length;
  const totalBlocked = allTasks.filter(t => t.status === "blocked").length;
  const totalInProgress = allTasks.filter(t => t.status === "in-progress").length;
  const totalTodo = allTasks.filter(t => t.status === "todo").length;
  const totalAll = allTasks.length;

  const addToInbox = () => {
    if (!inboxInput.trim()) return;
    setInbox(prev => [{
      id: Date.now().toString(),
      text: inboxInput.trim(),
      addedAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }),
    }, ...prev]);
    setInboxInput("");
  };

  const filteredSections = filter === "all"
    ? data.sections
    : data.sections.map(s => ({
        ...s,
        tasks: s.tasks.filter(t => t.status === filter),
      })).filter(s => s.tasks.length > 0);

  const lastUpdated = new Date(data.meta.lastUpdated).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-bold text-white">{data.meta.title}</h1>
          <p className="text-gray-500 text-sm mt-1">{data.meta.subtitle}</p>
        </div>
        <span className="text-xs text-gray-600">Updated {lastUpdated}</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {([
          { label: "Done", value: totalDone, color: "text-emerald-400", status: "done" as Status },
          { label: "In Progress", value: totalInProgress, color: "text-amber-400", status: "in-progress" as Status },
          { label: "Blocked", value: totalBlocked, color: "text-red-400", status: "blocked" as Status },
          { label: "To Do", value: totalTodo, color: "text-gray-400", status: "todo" as Status },
        ]).map(stat => (
          <button
            key={stat.label}
            onClick={() => setFilter(filter === stat.status ? "all" : stat.status)}
            className={`bg-[#13161F] border rounded-xl px-4 py-3 text-left transition-all hover:border-white/20 ${
              filter === stat.status ? "border-[#FF6B00]/50 bg-[#FF6B00]/5" : "border-white/[0.06]"
            }`}
          >
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
          </button>
        ))}
      </div>

      {/* Overall progress */}
      <div className="bg-[#13161F] border border-white/[0.06] rounded-xl px-5 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Overall progress</span>
          <span className="text-sm font-semibold text-white">{Math.round((totalDone / totalAll) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-white/[0.06] rounded-full">
          <div className="h-full rounded-full bg-[#FF6B00] transition-all" style={{ width: `${(totalDone / totalAll) * 100}%` }} />
        </div>
        <p className="text-xs text-gray-600 mt-2">{totalDone} of {totalAll} tasks complete · {totalBlocked} blocked on input</p>
      </div>

      {/* Inbox */}
      <div className="bg-[#13161F] border border-white/[0.06] rounded-xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.04]">
          <Inbox size={16} className="text-[#FF6B00]" />
          <h2 className="text-sm font-semibold text-white">Inbox</h2>
          <span className="text-xs text-gray-500 ml-auto">Dump anything here — allocate it later</span>
        </div>
        <div className="px-5 py-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inboxInput}
              onChange={e => setInboxInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addToInbox()}
              placeholder="Add a task, idea, or question..."
              className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6B00]/50 transition-colors"
            />
            <button onClick={addToInbox} className="px-3 py-2 bg-[#FF6B00] hover:bg-[#e55f00] text-white rounded-lg transition-colors">
              <Plus size={16} />
            </button>
          </div>
          {inbox.length > 0 ? (
            <div className="mt-3 space-y-2">
              {inbox.map(item => (
                <div key={item.id} className="flex items-start gap-3 bg-white/[0.02] border border-white/[0.04] rounded-lg px-3 py-2.5">
                  <Tag size={12} className="text-gray-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-300 flex-1">{item.text}</span>
                  <span className="text-[10px] text-gray-600 shrink-0">{item.addedAt}</span>
                  <button onClick={() => setInbox(prev => prev.filter(i => i.id !== item.id))} className="text-gray-600 hover:text-gray-400 shrink-0">
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-700 mt-3 text-center py-2">No inbox items yet.</p>
          )}
        </div>
      </div>

      {/* Filter indicator */}
      {filter !== "all" && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Filtering by:</span>
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusBadge[filter]}`}>{statusLabel[filter]}</span>
          <button onClick={() => setFilter("all")} className="text-xs text-gray-600 hover:text-gray-400 underline">clear</button>
        </div>
      )}

      {/* Sections */}
      <div className="space-y-4">
        {filteredSections.map(section => (
          <SectionCard key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
}
