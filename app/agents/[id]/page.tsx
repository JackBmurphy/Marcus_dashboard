'use client';

import { useState } from "react";
import { useParams } from "next/navigation";
import { Bot, Clock, ArrowLeft, Send, CheckCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

const agentData: Record<string, {
  name: string;
  status: string;
  description: string;
  config: { responseStyle: string; escalationRule: string; followUpHours: string };
  activityLog: { id: number; action: string; time: string }[];
}> = {
  "customer-enquiries": {
    name: "Customer Enquiries Agent",
    status: "Active",
    description:
      "Handles inbound customer enquiries via website, email, and social channels. Provides instant quotes, answers FAQs, and books appointments.",
    config: {
      responseStyle: "Professional & Friendly",
      escalationRule: "After 3 unanswered follow-ups",
      followUpHours: "24",
    },
    activityLog: [
      { id: 1, action: "Sent quote to Sarah Johnson (BMW 3 Series Diamond Cut — £95)", time: "2 min ago" },
      { id: 2, action: "Responded to Chris Brown enquiry (Ford Focus Kerb Damage x2)", time: "1 hour ago" },
      { id: 3, action: "Sent follow-up to David Miller (Porsche Cayenne Custom Colour)", time: "2 hours ago" },
      { id: 4, action: "New enquiry received from Sophie Taylor (Honda Civic)", time: "4 hours ago" },
      { id: 5, action: "Quote accepted by James Wilson — booking confirmed", time: "5 hours ago" },
      { id: 6, action: "Sent initial quote to Tom Harris (Jaguar F-Pace Diamond Cut x4 — £420)", time: "6 hours ago" },
      { id: 7, action: "Follow-up sent to Priya Patel (Range Rover Sport Diamond Cut x4)", time: "Yesterday, 4:30 PM" },
      { id: 8, action: "Enquiry from Emma Davies (Mercedes C-Class Custom Colour) routed to follow-up", time: "Yesterday, 2:15 PM" },
      { id: 9, action: "Closing message sent to Lisa Chen — job marked complete", time: "Yesterday, 11:00 AM" },
      { id: 10, action: "New enquiry from Mike Thompson (Audi A4 Powder Coat Gloss Black)", time: "2 days ago" },
    ],
  },
  "trade-development": {
    name: "Trade Development Agent",
    status: "Active",
    description:
      "Proactively identifies and contacts bodyshops, dealerships, and fleet operators. Sources leads from Apollo.io and manages follow-up sequences.",
    config: {
      responseStyle: "Business Development",
      escalationRule: "When prospect requests meeting",
      followUpHours: "48",
    },
    activityLog: [
      { id: 1, action: "Outreach sent to Premier Bodyworks (Steve Mason) via email", time: "47 min ago" },
      { id: 2, action: "Follow-up sent to Birmingham Auto Centre (James Reid) — 2nd touch", time: "3 hours ago" },
      { id: 3, action: "New lead sourced from Apollo: Swift Fleet Management (Paul O'Brien)", time: "5 hours ago" },
      { id: 4, action: "Proposal sent to Midlands Fleet Solutions (Karen White)", time: "Yesterday, 3:00 PM" },
      { id: 5, action: "AutoSmart Dealerships (Rachel Green) moved to Qualified", time: "Yesterday, 1:00 PM" },
      { id: 6, action: "Initial outreach to Central Vehicle Solutions (David Park)", time: "2 days ago" },
      { id: 7, action: "Prestige Motor Group (Anna Clarke) responded — follow-up scheduled", time: "2 days ago" },
      { id: 8, action: "Elite Auto Repairs marked as Converted — partnership confirmed", time: "3 days ago" },
      { id: 9, action: "5 new bodyshop leads sourced from Apollo in Birmingham radius", time: "3 days ago" },
      { id: 10, action: "Weekly trade report generated and sent to franchisee portal", time: "4 days ago" },
    ],
  },
  "workshop-coordination": {
    name: "Workshop Coordination Agent",
    status: "Setup Required",
    description:
      "Manages workshop scheduling, parts ordering, and job status updates. Connect your booking system to activate.",
    config: {
      responseStyle: "Operational",
      escalationRule: "When parts are unavailable",
      followUpHours: "4",
    },
    activityLog: [
      { id: 1, action: "Agent not yet configured — complete setup to enable", time: "Now" },
    ],
  },
};

const mockResponses = [
  "Understood. I'll prioritise that for the next interaction.",
  "Got it — I'll update my approach accordingly. Any other adjustments?",
  "Acknowledged. I'm already tracking that and will factor it into future responses.",
  "Thanks for the guidance. I'll apply that across all pending enquiries.",
  "Noted. Should I apply this rule retroactively to open enquiries as well?",
];

export default function AgentDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const agent = agentData[id] || agentData["customer-enquiries"];

  const [isActive, setIsActive] = useState(agent.status === "Active");
  const [responseStyle, setResponseStyle] = useState(agent.config.responseStyle);
  const [escalationRule, setEscalationRule] = useState(agent.config.escalationRule);
  const [followUpHours, setFollowUpHours] = useState(agent.config.followUpHours);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<{ role: "user" | "agent"; text: string }[]>([]);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleSendMessage() {
    if (!message.trim()) return;
    const userMsg = message;
    setMessage("");
    setChatLog((prev) => [...prev, { role: "user", text: userMsg }]);
    setTimeout(() => {
      const reply = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      setChatLog((prev) => [...prev, { role: "agent", text: reply }]);
    }, 800);
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Back link */}
      <Link
        href="/agents"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Agents
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isActive ? "bg-[#FF6B00]/15" : "bg-gray-500/10"
            }`}
          >
            <Bot size={22} className={isActive ? "text-[#FF6B00]" : "text-gray-500"} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{agent.name}</h1>
            <p className="text-gray-400 text-sm mt-0.5">{agent.description}</p>
          </div>
        </div>
        <button
          onClick={() => setIsActive((v) => !v)}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all flex-shrink-0 ${
            isActive
              ? "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
              : "bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20"
          }`}
        >
          {isActive ? "Pause Agent" : "Activate Agent"}
        </button>
      </div>

      {/* Status Banner */}
      {!isActive && (
        <div className="flex items-center gap-3 p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-xl">
          <AlertTriangle size={16} className="text-yellow-400 flex-shrink-0" />
          <p className="text-sm text-yellow-300">
            This agent is currently <strong>paused</strong>. No automated actions will be taken until you reactivate it.
          </p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <div className="bg-[#1A1D27] border border-white/[0.06] rounded-xl p-6 space-y-5">
          <h2 className="text-white font-semibold">Configuration</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wide">
                Response Style
              </label>
              <select
                value={responseStyle}
                onChange={(e) => setResponseStyle(e.target.value)}
                className="w-full bg-[#22263A] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white appearance-none focus:outline-none focus:border-[#FF6B00]/50"
              >
                <option>Professional & Friendly</option>
                <option>Formal & Concise</option>
                <option>Conversational & Warm</option>
                <option>Business Development</option>
                <option>Operational</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wide">
                Escalation Rule
              </label>
              <select
                value={escalationRule}
                onChange={(e) => setEscalationRule(e.target.value)}
                className="w-full bg-[#22263A] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white appearance-none focus:outline-none focus:border-[#FF6B00]/50"
              >
                <option>After 3 unanswered follow-ups</option>
                <option>After 2 unanswered follow-ups</option>
                <option>When prospect requests meeting</option>
                <option>When parts are unavailable</option>
                <option>Always escalate</option>
                <option>Never escalate</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wide">
                Follow-up Timing (hours)
              </label>
              <input
                type="number"
                value={followUpHours}
                onChange={(e) => setFollowUpHours(e.target.value)}
                min={1}
                max={168}
                className="w-full bg-[#22263A] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF6B00]/50"
              />
              <p className="text-xs text-gray-500 mt-1">
                Marcus will send a follow-up after {followUpHours || "—"} hours of no response.
              </p>
            </div>

            <button
              onClick={handleSave}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                saved
                  ? "bg-green-500/15 border border-green-500/30 text-green-400"
                  : "bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white"
              }`}
            >
              {saved ? (
                <>
                  <CheckCircle size={14} />
                  Saved
                </>
              ) : (
                "Save Configuration"
              )}
            </button>
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-[#1A1D27] border border-white/[0.06] rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">Activity Log</h2>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {agent.activityLog.map((entry) => (
              <div key={entry.id} className="flex items-start gap-3">
                <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-[#FF6B00]/60 flex-shrink-0 mt-2"></div>
                <div>
                  <p className="text-sm text-gray-200 leading-snug">{entry.action}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock size={10} className="text-gray-600" />
                    <span className="text-xs text-gray-500">{entry.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Message Agent Panel */}
      <div className="bg-[#1A1D27] border border-white/[0.06] rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">Message Agent</h2>
        <p className="text-sm text-gray-400 mb-4">
          Send instructions or questions directly to Marcus. Changes to behaviour take effect immediately.
        </p>

        {/* Chat log */}
        {chatLog.length > 0 && (
          <div className="space-y-3 mb-4 p-4 bg-[#0F1117] rounded-xl max-h-60 overflow-y-auto">
            {chatLog.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#FF6B00] text-white"
                      : "bg-[#22263A] text-gray-200"
                  }`}
                >
                  {msg.role === "agent" && (
                    <span className="text-xs text-[#FF6B00] font-medium block mb-0.5">Marcus</span>
                  )}
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="e.g. Prioritise Diamond Cut enquiries this week..."
            className="flex-1 bg-[#22263A] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00]/50"
          />
          <button
            onClick={handleSendMessage}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#FF6B00] hover:bg-[#FF6B00]/90 rounded-lg text-sm font-medium text-white transition-colors"
          >
            <Send size={14} />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
