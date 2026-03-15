'use client';

import { useState } from "react";
import { ChevronDown, ChevronUp, MessageSquare, Calendar, Car } from "lucide-react";

type Status = "New" | "Quoted" | "Follow-up" | "Booked" | "Closed";

interface Enquiry {
  id: number;
  name: string;
  vehicle: string;
  service: string;
  status: Status;
  date: string;
  conversationSummary: string;
  quoteGiven: string;
  nextAction: string;
}

const enquiries: Enquiry[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    vehicle: "BMW 3 Series",
    service: "Diamond Cut Refurbishment",
    status: "New",
    date: "2026-03-14",
    conversationSummary:
      "Customer enquired via website. Has 18\" alloys with light kerb damage on 2 wheels. Looking for a full diamond cut refurb on all 4 wheels.",
    quoteGiven: "Not yet sent",
    nextAction: "Marcus to send quote within 1 hour",
  },
  {
    id: 2,
    name: "Mike Thompson",
    vehicle: "Audi A4",
    service: "Powder Coat (Gloss Black)",
    status: "Quoted",
    date: "2026-03-13",
    conversationSummary:
      "Customer wants all 4 x 17\" wheels powder coated in gloss black. Quote of £340 sent via email. Currently awaiting response.",
    quoteGiven: "£340 (4 x 17\" Powder Coat)",
    nextAction: "Follow-up due in 6 hours if no response",
  },
  {
    id: 3,
    name: "Emma Davies",
    vehicle: "Mercedes C-Class",
    service: "Custom Colour",
    status: "Follow-up",
    date: "2026-03-12",
    conversationSummary:
      "Customer interested in a custom satin white finish to match bodywork. Quote sent for 4 x 18\" custom colour. 2nd follow-up sent today.",
    quoteGiven: "£440 (4 x 18\" Custom Colour)",
    nextAction: "Escalate to franchisee if no response by EOD",
  },
  {
    id: 4,
    name: "James Wilson",
    vehicle: "VW Golf",
    service: "Standard Refurbishment x4",
    status: "Booked",
    date: "2026-03-12",
    conversationSummary:
      "Customer accepted quote for 4 x 17\" standard refurbishment. Booking confirmed for Thursday 19 March at 9:00 AM.",
    quoteGiven: "£280 (4 x 17\" Standard Refurb)",
    nextAction: "Send appointment reminder 24 hours before",
  },
  {
    id: 5,
    name: "Priya Patel",
    vehicle: "Range Rover Sport",
    service: "Diamond Cut x4",
    status: "Quoted",
    date: "2026-03-11",
    conversationSummary:
      "Customer has 21\" alloys on a Range Rover Sport. Wants full diamond cut refresh. Extensive kerbing noted. Quote issued.",
    quoteGiven: "£600 (4 x 21\"+ Diamond Cut)",
    nextAction: "Follow-up due tomorrow morning",
  },
  {
    id: 6,
    name: "Chris Brown",
    vehicle: "Ford Focus",
    service: "Kerb Damage Repair x2",
    status: "New",
    date: "2026-03-11",
    conversationSummary:
      "Customer has kerb damage on 2 x 16\" wheels. Sent photos via WhatsApp. Quoted for standard refurbishment on affected wheels.",
    quoteGiven: "Not yet sent",
    nextAction: "Marcus reviewing photos — quote pending",
  },
  {
    id: 7,
    name: "Lisa Chen",
    vehicle: "Tesla Model 3",
    service: "Powder Coat (Gunmetal)",
    status: "Closed",
    date: "2026-03-10",
    conversationSummary:
      "Customer completed job on 4 x 18\" Tesla wheels in gunmetal powder coat. 5-star review left on Google.",
    quoteGiven: "£360 (4 x 18\" Powder Coat)",
    nextAction: "Job complete — archive record",
  },
  {
    id: 8,
    name: "David Miller",
    vehicle: "Porsche Cayenne",
    service: "Custom Colour (Satin Gold)",
    status: "Follow-up",
    date: "2026-03-10",
    conversationSummary:
      "Customer wants 22\" Porsche wheels in satin gold. High-value enquiry. Quote sent 4 days ago — 1 follow-up sent, no response yet.",
    quoteGiven: "£640 (4 x 21\"+ Custom Colour)",
    nextAction: "Final follow-up attempt today — then close",
  },
  {
    id: 9,
    name: "Sophie Taylor",
    vehicle: "Honda Civic",
    service: "Standard Refurbishment",
    status: "New",
    date: "2026-03-09",
    conversationSummary:
      "New enquiry received via website contact form. 4 x 17\" Honda alloys needing refurbishment. Marcus sending initial response.",
    quoteGiven: "Not yet sent",
    nextAction: "Marcus to respond with quote within 30 minutes",
  },
  {
    id: 10,
    name: "Tom Harris",
    vehicle: "Jaguar F-Pace",
    service: "Diamond Cut Refurbishment x4",
    status: "Quoted",
    date: "2026-03-09",
    conversationSummary:
      "Customer has 20\" diamond cut Jaguar alloys. Wants all 4 fully refurbished. Quote issued for 4 x 20\" diamond cut.",
    quoteGiven: "£520 (4 x 20\" Diamond Cut)",
    nextAction: "Follow-up due tomorrow",
  },
];

const statusConfig: Record<Status, { bg: string; text: string; border: string }> = {
  New: { bg: "bg-blue-400/10", text: "text-blue-400", border: "border-blue-400/20" },
  Quoted: { bg: "bg-[#FF6B00]/10", text: "text-[#FF6B00]", border: "border-[#FF6B00]/20" },
  "Follow-up": { bg: "bg-yellow-400/10", text: "text-yellow-400", border: "border-yellow-400/20" },
  Booked: { bg: "bg-green-400/10", text: "text-green-400", border: "border-green-400/20" },
  Closed: { bg: "bg-gray-500/10", text: "text-gray-400", border: "border-gray-500/20" },
};

const filterTabs: (Status | "All")[] = ["All", "New", "Quoted", "Follow-up", "Booked", "Closed"];

export default function EnquiriesPage() {
  const [activeFilter, setActiveFilter] = useState<Status | "All">("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered =
    activeFilter === "All"
      ? enquiries
      : enquiries.filter((e) => e.status === activeFilter);

  const countByStatus = (s: Status | "All") =>
    s === "All" ? enquiries.length : enquiries.filter((e) => e.status === s).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Enquiries</h1>
        <p className="text-gray-400 mt-1 text-sm">
          Customer enquiries managed by Marcus — {enquiries.length} total records.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filterTabs.map((tab) => (
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
        {/* Table header */}
        <div className="grid grid-cols-[2fr_2fr_2fr_1fr_1fr_auto] gap-4 px-6 py-3 border-b border-white/[0.06] text-xs font-medium text-gray-500 uppercase tracking-wide">
          <span>Customer</span>
          <span>Vehicle</span>
          <span>Service</span>
          <span>Status</span>
          <span>Date</span>
          <span></span>
        </div>

        {/* Rows */}
        <div>
          {filtered.map((enquiry) => {
            const isExpanded = expandedId === enquiry.id;
            const sc = statusConfig[enquiry.status];

            return (
              <div key={enquiry.id} className="border-b border-white/[0.04] last:border-0">
                {/* Row */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : enquiry.id)}
                  className="w-full grid grid-cols-[2fr_2fr_2fr_1fr_1fr_auto] gap-4 px-6 py-4 text-left hover:bg-white/[0.02] transition-colors items-center"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#22263A] flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-gray-300 font-medium">
                        {enquiry.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <span className="text-sm text-white font-medium truncate">{enquiry.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Car size={12} className="text-gray-500 flex-shrink-0" />
                    <span className="text-sm text-gray-300 truncate">{enquiry.vehicle}</span>
                  </div>
                  <span className="text-sm text-gray-400 truncate">{enquiry.service}</span>
                  <span>
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${sc.bg} ${sc.text} ${sc.border}`}
                    >
                      {enquiry.status}
                    </span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={11} className="text-gray-600" />
                    <span className="text-xs text-gray-400">
                      {new Date(enquiry.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                  <span className="text-gray-500">
                    {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </span>
                </button>

                {/* Expanded panel */}
                {isExpanded && (
                  <div className="px-6 pb-5 grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#0F1117]/40 border-t border-white/[0.04]">
                    <div className="pt-4">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                        Conversation Summary
                      </p>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {enquiry.conversationSummary}
                      </p>
                    </div>
                    <div className="pt-4">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                        Quote Given
                      </p>
                      <p className="text-sm text-white font-medium">{enquiry.quoteGiven}</p>
                    </div>
                    <div className="pt-4">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                        Next Action
                      </p>
                      <div className="flex items-start gap-2">
                        <MessageSquare size={13} className="text-[#FF6B00] mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-300">{enquiry.nextAction}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
