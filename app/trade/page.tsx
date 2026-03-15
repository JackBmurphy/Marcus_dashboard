'use client';

import { useState } from "react";
import { Briefcase, Building2, User, Calendar, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";

type TradeStatus = "New" | "Contacted" | "Responded" | "Qualified" | "Converted";
type TradeType = "Bodyshop" | "Dealership" | "Fleet";

interface TradeLead {
  id: number;
  company: string;
  contact: string;
  type: TradeType;
  status: TradeStatus;
  lastContact: string;
  apollo: boolean;
  notes: string;
  potential: string;
}

const tradeLeads: TradeLead[] = [
  {
    id: 1,
    company: "Birmingham Auto Centre",
    contact: "James Reid",
    type: "Bodyshop",
    status: "Contacted",
    lastContact: "2026-03-14",
    apollo: true,
    notes:
      "Large bodyshop operating 8 bays. Marcus sent initial outreach email with trade rate card. Follow-up scheduled for tomorrow.",
    potential: "Est. 20–30 wheels/month",
  },
  {
    id: 2,
    company: "Midlands Fleet Solutions",
    contact: "Karen White",
    type: "Fleet",
    status: "Responded",
    lastContact: "2026-03-13",
    apollo: false,
    notes:
      "Fleet operator managing 200+ vehicles across the Midlands. Karen responded positively — interested in a volume discount arrangement.",
    potential: "Est. 40–60 wheels/month",
  },
  {
    id: 3,
    company: "Premier Bodyworks",
    contact: "Steve Mason",
    type: "Bodyshop",
    status: "New",
    lastContact: "2026-03-12",
    apollo: true,
    notes:
      "Premium bodyshop specialising in prestige vehicles. Sourced via Apollo. Marcus sent first contact today.",
    potential: "Est. 15–25 wheels/month",
  },
  {
    id: 4,
    company: "AutoSmart Dealerships",
    contact: "Rachel Green",
    type: "Dealership",
    status: "Qualified",
    lastContact: "2026-03-12",
    apollo: false,
    notes:
      "Multi-franchise dealer group with 3 sites. Rachel is the Fleet & Aftersales Manager. Currently reviewing proposal — price and turnaround time are key factors.",
    potential: "Est. 30–50 wheels/month",
  },
  {
    id: 5,
    company: "Swift Fleet Management",
    contact: "Paul O'Brien",
    type: "Fleet",
    status: "Contacted",
    lastContact: "2026-03-11",
    apollo: true,
    notes:
      "Fleet management company handling lease returns. Paul manages refurbishment contracts for end-of-lease vehicles. Apollo sourced — first contact made.",
    potential: "Est. 50–80 wheels/month",
  },
  {
    id: 6,
    company: "Elite Auto Repairs",
    contact: "Maria Santos",
    type: "Bodyshop",
    status: "Converted",
    lastContact: "2026-03-10",
    apollo: false,
    notes:
      "Partnership confirmed. Maria signed a trade agreement for a minimum of 20 wheels/month at agreed rates. First batch booked for next week.",
    potential: "20 wheels/month (contracted)",
  },
  {
    id: 7,
    company: "Central Vehicle Solutions",
    contact: "David Park",
    type: "Fleet",
    status: "New",
    lastContact: "2026-03-09",
    apollo: false,
    notes:
      "Inbound lead — David found TWS via Google and enquired about trade rates. Marcus has added to pipeline for outreach.",
    potential: "TBC",
  },
  {
    id: 8,
    company: "Prestige Motor Group",
    contact: "Anna Clarke",
    type: "Dealership",
    status: "Responded",
    lastContact: "2026-03-09",
    apollo: true,
    notes:
      "Luxury dealership group (BMW/Audi franchised). Anna responded to Apollo outreach and is interested in a trial run. Proposal being prepared.",
    potential: "Est. 25–40 wheels/month",
  },
];

const statusConfig: Record<TradeStatus, { bg: string; text: string; border: string }> = {
  New: { bg: "bg-blue-400/10", text: "text-blue-400", border: "border-blue-400/20" },
  Contacted: { bg: "bg-[#FF6B00]/10", text: "text-[#FF6B00]", border: "border-[#FF6B00]/20" },
  Responded: { bg: "bg-purple-400/10", text: "text-purple-400", border: "border-purple-400/20" },
  Qualified: { bg: "bg-yellow-400/10", text: "text-yellow-400", border: "border-yellow-400/20" },
  Converted: { bg: "bg-green-400/10", text: "text-green-400", border: "border-green-400/20" },
};

const typeConfig: Record<TradeType, { bg: string; text: string }> = {
  Bodyshop: { bg: "bg-blue-500/10", text: "text-blue-300" },
  Dealership: { bg: "bg-purple-500/10", text: "text-purple-300" },
  Fleet: { bg: "bg-cyan-500/10", text: "text-cyan-300" },
};

const filterStatuses: (TradeStatus | "All")[] = ["All", "New", "Contacted", "Responded", "Qualified", "Converted"];

export default function TradePage() {
  const [activeFilter, setActiveFilter] = useState<TradeStatus | "All">("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered =
    activeFilter === "All"
      ? tradeLeads
      : tradeLeads.filter((l) => l.status === activeFilter);

  const countByStatus = (s: TradeStatus | "All") =>
    s === "All" ? tradeLeads.length : tradeLeads.filter((l) => l.status === s).length;

  const convertedCount = tradeLeads.filter((l) => l.status === "Converted").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Trade Leads</h1>
          <p className="text-gray-400 mt-1 text-sm">
            B2B pipeline managed by Marcus Trade Development Agent — {tradeLeads.length} prospects.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-green-400/10 border border-green-400/20 rounded-lg">
            <p className="text-xs text-gray-400">Converted</p>
            <p className="text-lg font-bold text-green-400">{convertedCount}</p>
          </div>
          <div className="px-4 py-2 bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-lg">
            <p className="text-xs text-gray-400">Pipeline</p>
            <p className="text-lg font-bold text-[#FF6B00]">{tradeLeads.length - convertedCount}</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filterStatuses.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
              activeFilter === tab
                ? "bg-[#FF6B00]/15 text-[#FF6B00] border-[#FF6B00]/30"
                : "bg-white/[0.03] text-gray-400 border-white/[0.06] hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            {tab}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeFilter === tab ? "bg-[#FF6B00]/20 text-[#FF6B00]" : "bg-white/[0.08] text-gray-500"
              }`}
            >
              {countByStatus(tab)}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#1A1D27] border border-white/[0.06] rounded-xl overflow-hidden">
        {/* Header row */}
        <div className="grid grid-cols-[2.5fr_1.5fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3 border-b border-white/[0.06] text-xs font-medium text-gray-500 uppercase tracking-wide">
          <span>Company / Contact</span>
          <span>Type</span>
          <span>Status</span>
          <span>Source</span>
          <span>Last Contact</span>
          <span></span>
        </div>

        {/* Rows */}
        <div>
          {filtered.map((lead) => {
            const isExpanded = expandedId === lead.id;
            const sc = statusConfig[lead.status];
            const tc = typeConfig[lead.type];

            return (
              <div key={lead.id} className="border-b border-white/[0.04] last:border-0">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : lead.id)}
                  className="w-full grid grid-cols-[2.5fr_1.5fr_1fr_1fr_1fr_auto] gap-4 px-6 py-4 text-left hover:bg-white/[0.02] transition-colors items-center"
                >
                  {/* Company + contact */}
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <Building2 size={13} className="text-gray-500 flex-shrink-0" />
                      <span className="text-sm text-white font-medium truncate">{lead.company}</span>
                    </div>
                    <div className="flex items-center gap-1.5 ml-4">
                      <User size={11} className="text-gray-600" />
                      <span className="text-xs text-gray-400">{lead.contact}</span>
                    </div>
                  </div>

                  {/* Type */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium w-fit ${tc.bg} ${tc.text}`}
                  >
                    <Briefcase size={10} />
                    {lead.type}
                  </span>

                  {/* Status */}
                  <span>
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${sc.bg} ${sc.text} ${sc.border}`}
                    >
                      {lead.status}
                    </span>
                  </span>

                  {/* Source */}
                  <span>
                    {lead.apollo ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/25">
                        <TrendingUp size={9} />
                        Apollo
                      </span>
                    ) : (
                      <span className="text-xs text-gray-500">Organic</span>
                    )}
                  </span>

                  {/* Date */}
                  <div className="flex items-center gap-1.5">
                    <Calendar size={11} className="text-gray-600" />
                    <span className="text-xs text-gray-400">
                      {new Date(lead.lastContact).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </span>
                  </div>

                  <span className="text-gray-500">
                    {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </span>
                </button>

                {/* Expanded */}
                {isExpanded && (
                  <div className="px-6 pb-5 grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#0F1117]/40 border-t border-white/[0.04]">
                    <div className="pt-4">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                        Notes
                      </p>
                      <p className="text-sm text-gray-300 leading-relaxed">{lead.notes}</p>
                    </div>
                    <div className="pt-4">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                        Revenue Potential
                      </p>
                      <p className="text-sm text-white font-medium">{lead.potential}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Apollo info */}
      <div className="flex items-center gap-3 p-4 bg-[#1A1D27] border border-white/[0.06] rounded-xl">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/25 flex-shrink-0">
          <TrendingUp size={10} />
          Apollo
        </span>
        <p className="text-sm text-gray-400">
          Records marked with the Apollo badge were sourced and enriched by Marcus Trade Development Agent via Apollo.io.
        </p>
      </div>
    </div>
  );
}
