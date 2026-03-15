import Link from "next/link";
import { Bot, ChevronRight, Clock, Zap, AlertTriangle, PauseCircle } from "lucide-react";

const agents = [
  {
    id: "customer-enquiries",
    name: "Customer Enquiries Agent",
    status: "Active",
    description:
      "Handles inbound customer enquiries via website, email, and social channels. Provides instant quotes, answers FAQs, and books appointments with your workshop.",
    lastAction: "Sent quote to Sarah Johnson (BMW 3 Series Diamond Cut) — 2 min ago",
    actionsToday: 14,
    totalActions: 347,
  },
  {
    id: "trade-development",
    name: "Trade Development Agent",
    status: "Active",
    description:
      "Proactively identifies and contacts bodyshops, dealerships, and fleet operators in your area. Sources leads from Apollo.io and manages follow-up sequences.",
    lastAction: "Reached out to Premier Bodyworks (Steve Mason) — 47 min ago",
    actionsToday: 8,
    totalActions: 219,
  },
  {
    id: "workshop-coordination",
    name: "Workshop Coordination Agent",
    status: "Setup Required",
    description:
      "Manages workshop scheduling, parts ordering, and job status updates. Connects with your booking system to keep customers informed automatically.",
    lastAction: "Not yet configured",
    actionsToday: 0,
    totalActions: 0,
  },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "Active") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-400/10 text-green-400 border border-green-400/20">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
        Active
      </span>
    );
  }
  if (status === "Setup Required") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
        <AlertTriangle size={11} />
        Setup Required
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-500/20">
      <PauseCircle size={11} />
      Paused
    </span>
  );
}

export default function AgentsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Agents</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Manage and configure your Marcus AI agents.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/20">
          <Bot size={14} className="text-[#FF6B00]" />
          <span className="text-sm text-[#FF6B00] font-medium">2 of 3 Active</span>
        </div>
      </div>

      {/* Agents List */}
      <div className="space-y-4">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-[#1A1D27] border border-white/[0.06] rounded-xl p-6 hover:border-white/[0.12] transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    agent.status === "Active"
                      ? "bg-[#FF6B00]/15"
                      : agent.status === "Setup Required"
                      ? "bg-yellow-400/10"
                      : "bg-gray-500/10"
                  }`}
                >
                  <Bot
                    size={20}
                    className={
                      agent.status === "Active"
                        ? "text-[#FF6B00]"
                        : agent.status === "Setup Required"
                        ? "text-yellow-400"
                        : "text-gray-500"
                    }
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h3 className="text-white font-semibold">{agent.name}</h3>
                    <StatusBadge status={agent.status} />
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {agent.description}
                  </p>

                  {/* Stats row */}
                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Clock size={13} className="text-gray-600" />
                      <span className="text-xs text-gray-400">{agent.lastAction}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="text-xs text-gray-500">Today</span>
                        <span className="ml-1.5 text-xs font-semibold text-white">
                          {agent.actionsToday} actions
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Total</span>
                        <span className="ml-1.5 text-xs font-semibold text-white">
                          {agent.totalActions} actions
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Configure button */}
              <Link
                href={`/agents/${agent.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.10] border border-white/[0.08] text-sm text-white font-medium transition-all flex-shrink-0"
              >
                {agent.status === "Setup Required" ? (
                  <>
                    <Zap size={14} className="text-yellow-400" />
                    Configure
                  </>
                ) : (
                  <>
                    Configure
                    <ChevronRight size={14} className="text-gray-400" />
                  </>
                )}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Info card */}
      <div className="bg-[#1A1D27] border border-white/[0.06] rounded-xl p-5">
        <p className="text-sm text-gray-400">
          <span className="text-white font-medium">About Marcus —</span> Marcus is your AI-powered franchise agent system built by The Wheel Specialist. Each agent operates autonomously within your configured parameters, escalating to you only when needed. All customer-facing communications are branded as your franchise location.
        </p>
      </div>
    </div>
  );
}
