import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  accent?: boolean;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  accent = false,
}: StatCardProps) {
  return (
    <div className="bg-[#1A1D27] border border-white/[0.06] rounded-xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium">{title}</span>
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center ${
            accent ? "bg-[#FF6B00]/15" : "bg-white/[0.05]"
          }`}
        >
          <Icon
            size={18}
            className={accent ? "text-[#FF6B00]" : "text-gray-400"}
          />
        </div>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-white">{value}</span>
        {trend && (
          <span
            className={`text-xs font-medium mb-1 ${
              trendUp ? "text-green-400" : "text-red-400"
            }`}
          >
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
