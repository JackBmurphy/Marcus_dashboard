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
  subtasks?: Task[];
}

interface Section {
  id: string;
  title: string;
  description?: string;
  tasks: Task[];
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

const initialSections: Section[] = [
  {
    id: "foundations",
    title: "Foundations & Identity",
    description: "Core system identity, governance, and operating rules.",
    tasks: [
      { id: "f1", title: "Marcus identity defined (IDENTITY.md, SOUL.md)", status: "done" },
      { id: "f2", title: "Operating rules and governance absorbed", status: "done" },
      { id: "f3", title: "Quoting rules: no ranges, ask-then-price", status: "done" },
      { id: "f4", title: "Sandbox pricing matrix built", status: "done", notes: "pricing/sandbox-matrix-default.md — in use until live matrices provided" },
      { id: "f5", title: "Live pricing matrices (per franchise)", status: "blocked", priority: "high", owner: "Jack", dueNote: "Monday 2026-03-17" },
    ],
  },
  {
    id: "channels",
    title: "Channels",
    description: "Communication channels the agent operates on.",
    tasks: [
      { id: "ch1", title: "WhatsApp connected and live", status: "done", notes: "Inbound enquiries active. Group messages disabled." },
      { id: "ch2", title: "Instagram DM plugin downloaded", status: "done", notes: "~/.openclaw/plugins-src/openclaw-instagram — NOT connected yet. Pre-launch only." },
      { id: "ch3", title: "Connect Instagram DM channel", status: "todo", priority: "medium", notes: "Connect at pre-launch. Will use identical Customer Enquiries logic as WhatsApp." },
      { id: "ch4", title: "Facebook Messenger", status: "deferred", notes: "No OpenClaw plugin exists. Feature request open on GitHub. Revisit when plugin ships." },
      { id: "ch5", title: "Email (Outlook)", status: "deferred", notes: "Research done. Plugin available on ClaWHub. Deferred until workflow is ready." },
    ],
  },
  {
    id: "workflow1",
    title: "Workflow 1 — Inbound Quote & Enquiry Follow-up",
    description: "The front-line customer enquiry workflow. Handles quotes, info gathering, and follow-up on WhatsApp (and Instagram at launch).",
    tasks: [
      { id: "w1-1", title: "Workflow framework designed", status: "done", notes: "workflows/workflow-01-inbound-enquiry.md" },
      { id: "w1-2", title: "Customer Enquiries Agent formally defined", status: "done", notes: "agents/01-customer-enquiries-agent.md" },
      { id: "w1-3", title: "Follow-up cadence confirmed", status: "done", notes: "24h → +48h → +48h → stale" },
      { id: "w1-4", title: "Turnaround time language confirmed", status: "done", notes: "Powder coat: next working day. DC: 3 working days. Always 'subject to availability'." },
      { id: "w1-5", title: "Quote logging in place (markdown)", status: "done", notes: "quotes/quote-log.md — interim until CRM confirmed" },
      { id: "w1-6", title: "Test agent end-to-end on WhatsApp", status: "in-progress", priority: "high", notes: "Jack to test with a live enquiry and confirm conversation flow is correct." },
      { id: "w1-7", title: "Live pricing matrices loaded", status: "blocked", priority: "high", owner: "Jack", dueNote: "Monday 2026-03-17", notes: "Sandbox in use until then." },
      { id: "w1-8", title: "Website quote form integration", status: "todo", priority: "medium", notes: "thewheelspecialist.co.uk/quote-request — does this feed into the workflow?" },
      { id: "w1-9", title: "Locations data loaded into agent context", status: "done", notes: "data/locations.md — 23 live franchises with address + phone." },
    ],
  },
  {
    id: "workflow2",
    title: "Workflow 2 — Trade Business Development",
    description: "Outreach and follow-up with trade prospects (dealerships, garages, body shops, fleet operators).",
    tasks: [
      { id: "w2-1", title: "Workflow framework drafted", status: "in-progress", notes: "workflows/workflow-02-trade-development.md" },
      { id: "w2-2", title: "Trade Development Agent defined", status: "todo", priority: "high" },
      { id: "w2-3", title: "Define: what counts as a trade lead?", status: "blocked", priority: "high", owner: "Jack" },
      { id: "w2-4", title: "Define: outreach cadence (timing + number of touches)", status: "blocked", priority: "high", owner: "Jack" },
      { id: "w2-5", title: "Define: what can be sent automatically vs reviewed first?", status: "blocked", priority: "high", owner: "Jack" },
      { id: "w2-6", title: "Define: what outcome = 'qualified lead'?", status: "blocked", priority: "medium", owner: "Jack" },
      { id: "w2-7", title: "Apollo.io API connected", status: "in-progress", priority: "medium", notes: "API key received. Scaffold at integrations/apollo-trade-prospecting.md. Awaiting plan tier + prospect profile." },
      { id: "w2-8", title: "Confirm Apollo plan tier (credit limits)", status: "blocked", priority: "medium", owner: "Jack" },
      { id: "w2-9", title: "Define priority prospect types (dealerships / garages / fleet?)", status: "blocked", priority: "medium", owner: "Jack" },
      { id: "w2-10", title: "CRM sync vs in-flight Apollo use decision", status: "todo", priority: "low", owner: "Jack" },
    ],
  },
  {
    id: "workflow3",
    title: "Workflow 3 — Complaints Handling",
    description: "Handling customer complaints, escalation rules, and resolution paths.",
    tasks: [
      { id: "w3-1", title: "Workflow framework drafted", status: "in-progress", notes: "workflows/workflow-03-complaints.md" },
      { id: "w3-2", title: "Define complaint categories", status: "blocked", priority: "high", owner: "Jack" },
      { id: "w3-3", title: "Define complaint severity levels", status: "blocked", priority: "high", owner: "Jack" },
      { id: "w3-4", title: "Define escalation path (who do complaints go to?)", status: "blocked", priority: "high", owner: "Jack" },
      { id: "w3-5", title: "Define: what can Marcus say automatically on a complaint?", status: "blocked", priority: "high", owner: "Jack" },
      { id: "w3-6", title: "Define: what requires mandatory human sign-off?", status: "blocked", priority: "high", owner: "Jack" },
      { id: "w3-7", title: "Target response time for complaints", status: "blocked", priority: "medium", owner: "Jack" },
      { id: "w3-8", title: "Refund / remedy / compensation policy", status: "blocked", priority: "medium", owner: "Jack" },
    ],
  },
  {
    id: "workflow4",
    title: "Workflow 4 — National Account Allocation",
    description: "Allocating national accounts fairly across the franchise network.",
    tasks: [
      { id: "w4-1", title: "Workflow framework drafted", status: "in-progress", notes: "workflows/workflow-04-national-accounts.md" },
      { id: "w4-2", title: "Define: what is a national account?", status: "blocked", priority: "high", owner: "Jack" },
      { id: "w4-3", title: "Define allocation rules across the network", status: "blocked", priority: "high", owner: "Jack" },
      { id: "w4-4", title: "Define: who has final allocation authority?", status: "blocked", priority: "high", owner: "Jack" },
      { id: "w4-5", title: "Define: recommend only vs auto-assign?", status: "blocked", priority: "medium", owner: "Jack" },
      { id: "w4-6", title: "Define fairness principles", status: "blocked", priority: "medium", owner: "Jack" },
      { id: "w4-7", title: "Define minimum info required before allocation", status: "blocked", priority: "medium", owner: "Jack" },
    ],
  },
  {
    id: "crm",
    title: "CRM Integration (Separate Project)",
    description: "Live CRM + calendar integration. Enables real booking availability, proper quote logging, and lead tracking. Separate from v1 agent activation.",
    tasks: [
      { id: "crm1", title: "CRM platform confirmed", status: "blocked", priority: "high", owner: "Jack / Devs", notes: "Awaiting developer response (requested 2026-03-14)" },
      { id: "crm2", title: "Review CRM API documentation", status: "todo", priority: "high" },
      { id: "crm3", title: "Design integration architecture", status: "todo", priority: "high" },
      { id: "crm4", title: "Build + test quote logging endpoint", status: "todo", priority: "high" },
      { id: "crm5", title: "Build + test live calendar read access (per franchisee)", status: "todo", priority: "high", notes: "Required for accurate booking availability — franchisees have existing bookings." },
      { id: "crm6", title: "Update agent prompts to use live calendar data", status: "todo", priority: "medium" },
      { id: "crm7", title: "Replace quotes/quote-log.md with live CRM records", status: "todo", priority: "medium" },
      { id: "crm8", title: "Lead status tracking (quoted → follow-up → booked → stale)", status: "todo", priority: "medium" },
    ],
  },
  {
    id: "dashboard",
    title: "Franchisee Dashboard",
    description: "Web dashboard for franchisees and head office to monitor operations.",
    tasks: [
      { id: "d1", title: "Dashboard built locally (Next.js)", status: "done" },
      { id: "d2", title: "Vercel deployment live", status: "done", notes: "github.com/JackBmurphy/Marcus_dashboard — auto-deploys on push" },
      { id: "d3", title: "Build plan / todo dashboard (this page)", status: "done" },
      { id: "d4", title: "Define what data/views franchisees actually need", status: "todo", priority: "medium", owner: "Jack" },
      { id: "d5", title: "Connect dashboard to live CRM data", status: "todo", priority: "low", notes: "Blocked on CRM integration project." },
      { id: "d6", title: "Auth / login for franchisees", status: "todo", priority: "low" },
    ],
  },
];

function TaskRow({ task, depth = 0 }: { task: Task; depth?: number }) {
  const [open, setOpen] = useState(false);
  const hasSubtasks = task.subtasks && task.subtasks.length > 0;

  return (
    <>
      <div
        className={`flex items-start gap-3 px-4 py-3 rounded-lg hover:bg-white/[0.03] transition-colors ${
          depth > 0 ? "ml-6 border-l border-white/[0.05] pl-5" : ""
        }`}
      >
        {hasSubtasks && (
          <button onClick={() => setOpen(!open)} className="mt-0.5 text-gray-500 hover:text-gray-300">
            {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        )}
        {!hasSubtasks && <div className="w-[14px] shrink-0" />}
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
      {open && hasSubtasks && task.subtasks!.map(sub => (
        <TaskRow key={sub.id} task={sub} depth={depth + 1} />
      ))}
    </>
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
              <div
                className="h-full rounded-full bg-[#FF6B00] transition-all"
                style={{ width: `${pct}%` }}
              />
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

export default function BuildPlanPage() {
  const [sections] = useState<Section[]>(initialSections);
  const [inbox, setInbox] = useState<InboxItem[]>([]);
  const [inboxInput, setInboxInput] = useState("");
  const [filter, setFilter] = useState<Status | "all">("all");

  const allTasks = sections.flatMap(s => s.tasks);
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
    ? sections
    : sections.map(s => ({
        ...s,
        tasks: s.tasks.filter(t => t.status === filter),
      })).filter(s => s.tasks.length > 0);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Build Plan</h1>
        <p className="text-gray-500 text-sm mt-1">Marcus Operations System — The Wheel Specialist</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Done", value: totalDone, color: "text-emerald-400", status: "done" as Status },
          { label: "In Progress", value: totalInProgress, color: "text-amber-400", status: "in-progress" as Status },
          { label: "Blocked", value: totalBlocked, color: "text-red-400", status: "blocked" as Status },
          { label: "To Do", value: totalTodo, color: "text-gray-400", status: "todo" as Status },
        ].map(stat => (
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
          <div
            className="h-full rounded-full bg-[#FF6B00] transition-all"
            style={{ width: `${(totalDone / totalAll) * 100}%` }}
          />
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
            <button
              onClick={addToInbox}
              className="px-3 py-2 bg-[#FF6B00] hover:bg-[#e55f00] text-white rounded-lg transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          {inbox.length > 0 && (
            <div className="mt-3 space-y-2">
              {inbox.map(item => (
                <div key={item.id} className="flex items-start gap-3 bg-white/[0.02] border border-white/[0.04] rounded-lg px-3 py-2.5">
                  <Tag size={12} className="text-gray-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-300 flex-1">{item.text}</span>
                  <span className="text-[10px] text-gray-600 shrink-0">{item.addedAt}</span>
                  <button
                    onClick={() => setInbox(prev => prev.filter(i => i.id !== item.id))}
                    className="text-gray-600 hover:text-gray-400 shrink-0"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
          {inbox.length === 0 && (
            <p className="text-xs text-gray-700 mt-3 text-center py-2">No inbox items yet. Add anything that needs attention.</p>
          )}
        </div>
      </div>

      {/* Filter bar */}
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
