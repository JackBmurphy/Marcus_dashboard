'use client';

import { useState } from "react";
import { CheckCircle, Bell, BellOff } from "lucide-react";

const pricingMatrix = [
  { size: '15"', standardRefurb: 60, diamondCut: 85, powderCoat: 75, customColour: 90 },
  { size: '16"', standardRefurb: 65, diamondCut: 90, powderCoat: 80, customColour: 95 },
  { size: '17"', standardRefurb: 70, diamondCut: 95, powderCoat: 85, customColour: 100 },
  { size: '18"', standardRefurb: 75, diamondCut: 105, powderCoat: 90, customColour: 110 },
  { size: '19"', standardRefurb: 85, diamondCut: 115, powderCoat: 100, customColour: 120 },
  { size: '20"', standardRefurb: 95, diamondCut: 130, powderCoat: 115, customColour: 135 },
  { size: '21"+"', standardRefurb: 110, diamondCut: 150, powderCoat: 130, customColour: 155 },
];

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
        enabled ? "bg-[#FF6B00]" : "bg-gray-700"
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
          enabled ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "Birmingham Central",
    location: "Birmingham, West Midlands",
    phone: "0121 456 7890",
    email: "birmingham.central@thewheelspecialist.co.uk",
  });

  const [notifications, setNotifications] = useState({
    newEnquiries: true,
    quoteAccepted: true,
    agentEscalation: true,
    tradeLeadUpdates: true,
    weeklyReport: false,
    agentErrors: true,
  });

  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function toggleNotification(key: keyof typeof notifications) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1 text-sm">
          Manage your franchise profile, notifications, and pricing.
        </p>
      </div>

      {/* Franchisee Profile */}
      <div className="bg-[#1A1D27] border border-white/[0.06] rounded-xl p-6">
        <h2 className="text-white font-semibold mb-5">Franchisee Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wide">
              Franchise Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
              className="w-full bg-[#22263A] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF6B00]/50"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wide">
              Location
            </label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile((p) => ({ ...p, location: e.target.value }))}
              className="w-full bg-[#22263A] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF6B00]/50"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wide">
              Phone Number
            </label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
              className="w-full bg-[#22263A] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF6B00]/50"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wide">
              Email Address
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
              className="w-full bg-[#22263A] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF6B00]/50"
            />
          </div>
        </div>
        <div className="mt-5">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              saved
                ? "bg-green-500/15 border border-green-500/30 text-green-400"
                : "bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white"
            }`}
          >
            {saved ? (
              <>
                <CheckCircle size={14} />
                Profile Saved
              </>
            ) : (
              "Save Profile"
            )}
          </button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-[#1A1D27] border border-white/[0.06] rounded-xl p-6">
        <h2 className="text-white font-semibold mb-5">Notification Preferences</h2>
        <div className="space-y-4">
          {[
            {
              key: "newEnquiries" as const,
              label: "New Customer Enquiries",
              desc: "Alert when Marcus receives a new inbound enquiry",
            },
            {
              key: "quoteAccepted" as const,
              label: "Quote Accepted",
              desc: "Notify when a customer accepts a quote",
            },
            {
              key: "agentEscalation" as const,
              label: "Agent Escalation",
              desc: "Alert when Marcus escalates a case to you",
            },
            {
              key: "tradeLeadUpdates" as const,
              label: "Trade Lead Updates",
              desc: "Notify when a trade prospect changes status",
            },
            {
              key: "weeklyReport" as const,
              label: "Weekly Summary Report",
              desc: "Receive a weekly digest every Monday morning",
            },
            {
              key: "agentErrors" as const,
              label: "Agent Errors & Warnings",
              desc: "Alert when an agent encounters an issue",
            },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {notifications[item.key] ? (
                    <Bell size={15} className="text-[#FF6B00]" />
                  ) : (
                    <BellOff size={15} className="text-gray-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-white font-medium">{item.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
              <Toggle
                enabled={notifications[item.key]}
                onToggle={() => toggleNotification(item.key)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Matrix */}
      <div className="bg-[#1A1D27] border border-white/[0.06] rounded-xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-semibold">Pricing Matrix</h2>
          <p className="text-xs text-gray-500">Per wheel — inc. VAT</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide pb-3 pr-4">
                  Size
                </th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wide pb-3 px-4">
                  Standard Refurb
                </th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wide pb-3 px-4">
                  Diamond Cut
                </th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wide pb-3 px-4">
                  Powder Coat
                </th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wide pb-3 pl-4">
                  Custom Colour
                </th>
              </tr>
            </thead>
            <tbody>
              {pricingMatrix.map((row, i) => (
                <tr
                  key={row.size}
                  className={`border-b border-white/[0.04] last:border-0 ${
                    i % 2 === 0 ? "" : "bg-white/[0.01]"
                  }`}
                >
                  <td className="py-3 pr-4 font-semibold text-white">{row.size}</td>
                  <td className="py-3 px-4 text-right text-gray-300">£{row.standardRefurb}</td>
                  <td className="py-3 px-4 text-right text-[#FF6B00] font-medium">£{row.diamondCut}</td>
                  <td className="py-3 px-4 text-right text-gray-300">£{row.powderCoat}</td>
                  <td className="py-3 pl-4 text-right text-gray-300">£{row.customColour}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-3 bg-[#0F1117] rounded-lg">
          <p className="text-xs text-gray-500">
            These prices are shared with Marcus and used when generating customer quotes. Contact your TWS account manager to update your approved pricing tier.
          </p>
        </div>
      </div>
    </div>
  );
}
