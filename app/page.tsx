import Link from "next/link";
import { Bot, MessageSquare, FileText, TrendingUp, ArrowRight, Clock, CheckCircle, User } from "lucide-react";
import { StatCard } from "@/components/stat-card";

const recentActivity = [
  {
    id: 1,
    type: "enquiry",
    message: "New enquiry from Sarah Johnson — BMW 3 Series Diamond Cut",
    time: "2 minutes ago",
    icon: MessageSquare,
    color: "text-blue-400",
  },
  {
    id: 2,
    type: "agent",
    message: "Marcus sent follow-up quote to David Miller (Porsche Cayenne)",
    time: "18 minutes ago",
    icon: Bot,
    color: "text-[#FF6B00]",
  },
  {
    id: 3,
    type: "booking",
    message: "James Wilson confirmed booking — VW Golf x4 Standard Refurb",
    time: "1 hour ago",
    icon: CheckCircle,
    color: "text-green-400",
  },
  {
    id: 4,
    type: "lead",
    message: "Trade lead qualified — AutoSmart Dealerships (Rachel Green)",
    time: "2 hours ago",
    icon: TrendingUp,
    color: "text-purple-400",
  },
  {
    id: 5,
    type: "agent",
    message: "Marcus responded to Chris Brown enquiry — Ford Focus kerb damage",
    time: "3 hours ago",
    icon: Bot,
    color: "text-[#FF6B00]",
  },
  {
    id: 6,
    type: "enquiry",
    message: "New enquiry from Sophie Taylor — Honda Civic Standard Refurb",
    time: "4 hours ago",
    icon: MessageSquare,
    color: "text-blue-400",
  },
  {
    id: 7,
    type: "agent",
    message: "Marcus sent trade outreach to Birmingham Auto Centre",
    time: "5 hours ago",
    icon: Bot,
    color: "text-[#FF6B00]",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Welcome, Birmingham Central</h1>
        <p className="text-gray-400 mt-1 text-sm">
          Saturday, 14 March 2026 — Here&apos;s your agent overview for today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Agents"
          value={3}
          icon={Bot}
          accent={true}
          trend="+0"
          trendUp={true}
        />
        <StatCard
          title="Open Enquiries"
          value={12}
          icon={MessageSquare}
          trend="+3 today"
          trendUp={true}
        />
        <StatCard
          title="Quotes Sent Today"
          value={7}
          icon={FileText}
          trend="+2 vs yesterday"
          trendUp={true}
        />
        <StatCard
          title="Leads in Pipeline"
          value={24}
          icon={TrendingUp}
          trend="+5 this week"
          trendUp={true}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="lg:col-span-2 bg-[#1A1D27] border border-white/[0.06] rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold">Recent Activity</h2>
            <span className="text-xs text-gray-500">Live feed</span>
          </div>
          <div className="space-y-4">
            {recentActivity.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="mt-0.5 w-7 h-7 rounded-md bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                    <Icon size={14} className={item.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-200 leading-snug">{item.message}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock size={11} className="text-gray-600" />
                      <span className="text-xs text-gray-500">{item.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="bg-[#1A1D27] border border-white/[0.06] rounded-xl p-6">
            <h2 className="text-white font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/enquiries"
                className="flex items-center justify-between p-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.05] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare size={16} className="text-[#FF6B00]" />
                  <span className="text-sm text-white font-medium">View Enquiries</span>
                </div>
                <ArrowRight size={14} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
              </Link>
              <Link
                href="/trade"
                className="flex items-center justify-between p-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.05] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <TrendingUp size={16} className="text-[#FF6B00]" />
                  <span className="text-sm text-white font-medium">View Trade Leads</span>
                </div>
                <ArrowRight size={14} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
              </Link>
              <Link
                href="/agents"
                className="flex items-center justify-between p-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.05] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Bot size={16} className="text-[#FF6B00]" />
                  <span className="text-sm text-white font-medium">Agent Settings</span>
                </div>
                <ArrowRight size={14} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Agent Status */}
          <div className="bg-[#1A1D27] border border-white/[0.06] rounded-xl p-6">
            <h2 className="text-white font-semibold mb-4">Agent Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-sm text-gray-300">Customer Enquiries</span>
                </div>
                <span className="text-xs text-green-400 font-medium">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-sm text-gray-300">Trade Development</span>
                </div>
                <span className="text-xs text-green-400 font-medium">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <span className="text-sm text-gray-300">Workshop Coord.</span>
                </div>
                <span className="text-xs text-yellow-400 font-medium">Setup Req.</span>
              </div>
            </div>
          </div>

          {/* Marcus Info */}
          <div className="bg-gradient-to-br from-[#FF6B00]/10 to-[#FF6B00]/5 border border-[#FF6B00]/20 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#FF6B00] flex items-center justify-center">
                <User size={14} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Marcus</p>
                <p className="text-xs text-gray-400">Your AI Agent</p>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Marcus has handled <span className="text-[#FF6B00] font-semibold">47 interactions</span> this week, with a response rate of <span className="text-[#FF6B00] font-semibold">98%</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
