import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const ACTIVITY_LOG = [
  { time: "3:42 PM", action: "Watched", detail: "Epic Minecraft Speedrun 🚀", duration: "15 min", icon: "Play", color: "#6366f1" },
  { time: "3:27 PM", action: "Followed", detail: "StarKid_Pro", duration: "", icon: "UserPlus", color: "#10b981" },
  { time: "3:18 PM", action: "Liked", detail: "I Built a Rainbow City!", duration: "", icon: "Heart", color: "#ef4444" },
  { time: "3:05 PM", action: "Watched", detail: "100 Players Obby Battle", duration: "9 min", icon: "Play", color: "#6366f1" },
  { time: "2:50 PM", action: "Opened app", detail: "Tik Kids", duration: "", icon: "Smartphone", color: "#8b5cf6" },
  { time: "2:10 PM", action: "Watched", detail: "Best Fortnite Skins Ever", duration: "12 min", icon: "Play", color: "#6366f1" },
  { time: "1:55 PM", action: "Sent message", detail: "to CosmicGamer", duration: "", icon: "MessageCircle", color: "#f59e0b" },
];

const WEEKLY_DATA = [
  { day: "Mon", mins: 45 },
  { day: "Tue", mins: 72 },
  { day: "Wed", mins: 30 },
  { day: "Thu", mins: 88 },
  { day: "Fri", mins: 60 },
  { day: "Sat", mins: 120 },
  { day: "Sun", mins: 53 },
];

const CONTENT_FILTERS = [
  { label: "Live Streams", icon: "Radio", on: true, color: "#6366f1" },
  { label: "Chat & Messages", icon: "MessageCircle", on: true, color: "#10b981" },
  { label: "Following Others", icon: "UserPlus", on: true, color: "#f59e0b" },
  { label: "Uploading Videos", icon: "Upload", on: true, color: "#8b5cf6" },
  { label: "Mature Themes", icon: "AlertTriangle", on: false, color: "#ef4444" },
];

type ParentTab = "dashboard" | "activity" | "controls" | "approvals";

const PENDING_UPLOADS = [
  { id: 1, title: "My first Minecraft house build!", emoji: "🏠", tag: "Minecraft", submittedAt: "5 min ago" },
  { id: 2, title: "Epic racing tournament highlights", emoji: "🏁", tag: "Racing", submittedAt: "1 hr ago" },
];

export default function Parent() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<ParentTab>("dashboard");
  const [appPaused, setAppPaused] = useState(false);
  const [dailyLimit, setDailyLimit] = useState(120);
  const [filters, setFilters] = useState(CONTENT_FILTERS.map(f => ({ ...f })));
  const [approvals, setApprovals] = useState(PENDING_UPLOADS.map(u => ({ ...u, status: "pending" as "pending" | "approved" | "rejected" })));
  const [bedtime, setBedtime] = useState("20:30");

  const toggleFilter = (i: number) => {
    setFilters(prev => prev.map((f, idx) => idx === i ? { ...f, on: !f.on } : f));
  };

  const decide = (id: number, status: "approved" | "rejected") => {
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const maxMins = Math.max(...WEEKLY_DATA.map(d => d.mins));
  const totalToday = 87;
  const usedToday = dailyLimit - totalToday;
  const pct = Math.round((usedToday / dailyLimit) * 100);
  const pendingCount = approvals.filter(a => a.status === "pending").length;

  return (
    <div className="min-h-screen font-nunito" style={{ background: "#f0f4ff" }}>

      {/* Header */}
      <header className="sticky top-0 z-50 px-4 py-4 flex items-center justify-between"
        style={{ background: "rgba(240,244,255,0.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(99,102,241,0.12)" }}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-95"
            style={{ background: "rgba(99,102,241,0.1)" }}>
            <Icon name="ArrowLeft" size={18} style={{ color: "#6366f1" }} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg">👨‍👩‍👧</span>
              <span className="font-fredoka text-xl" style={{ color: "#1e1b4b" }}>Parent Dashboard</span>
            </div>
            <p className="text-xs" style={{ color: "#6b7280" }}>Emma's account · age 9</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-live-pulse" style={{ background: "#10b981" }} />
          <span className="text-xs font-bold" style={{ color: "#10b981" }}>Live</span>
        </div>
      </header>

      {/* App paused banner */}
      {appPaused && (
        <div className="mx-4 mt-3 px-4 py-3 rounded-2xl flex items-center justify-between animate-fade-in"
          style={{ background: "linear-gradient(135deg, #fef2f2, #fff1f2)", border: "1.5px solid #fca5a5" }}>
          <div className="flex items-center gap-2">
            <Icon name="PauseCircle" size={18} style={{ color: "#ef4444" }} />
            <span className="text-sm font-bold" style={{ color: "#991b1b" }}>App paused for Emma</span>
          </div>
          <button onClick={() => setAppPaused(false)}
            className="text-xs font-bold px-3 py-1 rounded-lg"
            style={{ background: "#ef4444", color: "#fff" }}>
            Resume
          </button>
        </div>
      )}

      {/* Tab bar */}
      <div className="flex mx-4 mt-4 p-1 rounded-2xl gap-1" style={{ background: "rgba(99,102,241,0.08)" }}>
        {([
          { id: "dashboard", label: "Overview" },
          { id: "activity", label: "Activity" },
          { id: "controls", label: "Controls" },
          { id: "approvals", label: `Approve${pendingCount > 0 ? ` (${pendingCount})` : ""}` },
        ] as { id: ParentTab; label: string }[]).map(t => (
          <button key={t.id}
            onClick={() => setTab(t.id)}
            className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
            style={tab === t.id
              ? { background: "#6366f1", color: "#fff", boxShadow: "0 2px 8px rgba(99,102,241,0.3)" }
              : { color: "#6b7280" }}>
            {t.label}
          </button>
        ))}
      </div>

      <main className="px-4 mt-4 pb-8">

        {/* ── DASHBOARD ── */}
        {tab === "dashboard" && (
          <div className="animate-fade-in space-y-4">

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl" style={{ background: "#fff", border: "1px solid rgba(99,102,241,0.12)" }}>
                <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "#6b7280" }}>Screen time today</p>
                <p className="font-fredoka text-3xl mt-1" style={{ color: "#1e1b4b" }}>{usedToday} min</p>
                <div className="mt-2 h-2 rounded-full overflow-hidden" style={{ background: "#e0e7ff" }}>
                  <div className="h-full rounded-full transition-all"
                    style={{ width: `${Math.min(pct, 100)}%`, background: pct > 80 ? "#ef4444" : "#6366f1" }} />
                </div>
                <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>of {dailyLimit} min limit</p>
              </div>
              <div className="p-4 rounded-2xl" style={{ background: "#fff", border: "1px solid rgba(99,102,241,0.12)" }}>
                <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "#6b7280" }}>Videos watched</p>
                <p className="font-fredoka text-3xl mt-1" style={{ color: "#1e1b4b" }}>3</p>
                <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>today · all kid-safe ✓</p>
                <div className="flex gap-1 mt-2">
                  {["⛏️", "🏃", "🎮"].map((e, i) => <span key={i} className="text-lg">{e}</span>)}
                </div>
              </div>
            </div>

            {/* Weekly chart */}
            <div className="p-4 rounded-2xl" style={{ background: "#fff", border: "1px solid rgba(99,102,241,0.12)" }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold" style={{ color: "#1e1b4b" }}>This week</p>
                <p className="text-xs" style={{ color: "#9ca3af" }}>avg 67 min/day</p>
              </div>
              <div className="flex items-end gap-2 h-20">
                {WEEKLY_DATA.map((d, i) => {
                  const h = Math.round((d.mins / maxMins) * 100);
                  const isToday = i === 4;
                  return (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full rounded-t-lg transition-all"
                        style={{ height: `${h}%`, background: isToday ? "#6366f1" : "#c7d2fe", minHeight: 4 }} />
                      <span className="text-xs font-bold" style={{ color: isToday ? "#6366f1" : "#9ca3af" }}>{d.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick controls */}
            <div className="p-4 rounded-2xl" style={{ background: "#fff", border: "1px solid rgba(99,102,241,0.12)" }}>
              <p className="text-sm font-bold mb-3" style={{ color: "#1e1b4b" }}>Quick Controls</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setAppPaused(!appPaused)}
                  className="flex items-center gap-2 p-3 rounded-xl transition-all active:scale-95"
                  style={appPaused
                    ? { background: "#fef2f2", border: "1.5px solid #fca5a5" }
                    : { background: "#f0f4ff", border: "1.5px solid #c7d2fe" }}>
                  <Icon name={appPaused ? "Play" : "PauseCircle"} size={18} style={{ color: appPaused ? "#10b981" : "#6366f1" }} />
                  <span className="text-xs font-bold" style={{ color: appPaused ? "#10b981" : "#6366f1" }}>
                    {appPaused ? "Resume App" : "Pause App"}
                  </span>
                </button>
                <button onClick={() => setTab("activity")}
                  className="flex items-center gap-2 p-3 rounded-xl"
                  style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}>
                  <Icon name="Activity" size={18} style={{ color: "#10b981" }} />
                  <span className="text-xs font-bold" style={{ color: "#10b981" }}>View Activity</span>
                </button>
                <button onClick={() => setTab("controls")}
                  className="flex items-center gap-2 p-3 rounded-xl"
                  style={{ background: "#fff7ed", border: "1.5px solid #fed7aa" }}>
                  <Icon name="Clock" size={18} style={{ color: "#f59e0b" }} />
                  <span className="text-xs font-bold" style={{ color: "#f59e0b" }}>Screen Time</span>
                </button>
                <button onClick={() => setTab("approvals")}
                  className="flex items-center gap-2 p-3 rounded-xl relative"
                  style={{ background: "#faf5ff", border: "1.5px solid #ddd6fe" }}>
                  <Icon name="CheckCircle" size={18} style={{ color: "#8b5cf6" }} />
                  <span className="text-xs font-bold" style={{ color: "#8b5cf6" }}>Approvals</span>
                  {pendingCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold"
                      style={{ background: "#ef4444", color: "#fff" }}>{pendingCount}</span>
                  )}
                </button>
              </div>
            </div>

            {/* Recent activity preview */}
            <div className="p-4 rounded-2xl" style={{ background: "#fff", border: "1px solid rgba(99,102,241,0.12)" }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold" style={{ color: "#1e1b4b" }}>Recent Activity</p>
                <button onClick={() => setTab("activity")} className="text-xs font-bold" style={{ color: "#6366f1" }}>See all</button>
              </div>
              <div className="space-y-3">
                {ACTIVITY_LOG.slice(0, 3).map((a, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${a.color}18` }}>
                      <Icon name={a.icon as "Play"} size={14} style={{ color: a.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold" style={{ color: "#374151" }}>{a.action} <span style={{ color: "#6b7280", fontWeight: 400 }}>{a.detail}</span></p>
                      {a.duration && <p className="text-xs" style={{ color: "#9ca3af" }}>{a.duration}</p>}
                    </div>
                    <p className="text-xs flex-shrink-0" style={{ color: "#9ca3af" }}>{a.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ACTIVITY ── */}
        {tab === "activity" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold" style={{ color: "#374151" }}>Today, {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" })}</p>
              <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#e0e7ff", color: "#4338ca" }}>
                {ACTIVITY_LOG.length} events
              </span>
            </div>
            <div className="space-y-2">
              {ACTIVITY_LOG.map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl"
                  style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${a.color}18` }}>
                    <Icon name={a.icon as "Play"} size={18} style={{ color: a.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold" style={{ color: "#111827" }}>
                      {a.action}
                    </p>
                    <p className="text-xs truncate" style={{ color: "#6b7280" }}>{a.detail}{a.duration ? ` · ${a.duration}` : ""}</p>
                  </div>
                  <p className="text-xs flex-shrink-0 font-semibold" style={{ color: "#9ca3af" }}>{a.time}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CONTROLS ── */}
        {tab === "controls" && (
          <div className="animate-fade-in space-y-4">

            {/* App pause */}
            <div className="p-4 rounded-2xl" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)" }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#fef2f2" }}>
                    <Icon name="PauseCircle" size={20} style={{ color: "#ef4444" }} />
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: "#111827" }}>Pause App</p>
                    <p className="text-xs" style={{ color: "#9ca3af" }}>Block Emma immediately</p>
                  </div>
                </div>
                <button onClick={() => setAppPaused(!appPaused)}
                  className="w-12 h-6 rounded-full flex items-center px-1 transition-all"
                  style={{ background: appPaused ? "#ef4444" : "#d1d5db" }}>
                  <div className="w-4 h-4 rounded-full bg-white transition-all"
                    style={{ marginLeft: appPaused ? "auto" : 0 }} />
                </button>
              </div>
            </div>

            {/* Daily limit */}
            <div className="p-4 rounded-2xl" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#fff7ed" }}>
                  <Icon name="Clock" size={20} style={{ color: "#f59e0b" }} />
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: "#111827" }}>Daily Screen Time</p>
                  <p className="text-xs" style={{ color: "#9ca3af" }}>Max per day</p>
                </div>
                <span className="ml-auto font-fredoka text-xl" style={{ color: "#f59e0b" }}>{dailyLimit} min</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {[30, 60, 90, 120, 180].map(m => (
                  <button key={m}
                    onClick={() => setDailyLimit(m)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95"
                    style={dailyLimit === m
                      ? { background: "#f59e0b", color: "#fff" }
                      : { background: "#f9fafb", color: "#6b7280", border: "1px solid #e5e7eb" }}>
                    {m} min
                  </button>
                ))}
              </div>
            </div>

            {/* Bedtime */}
            <div className="p-4 rounded-2xl" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)" }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#f0fdf4" }}>
                    <Icon name="Moon" size={20} style={{ color: "#10b981" }} />
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: "#111827" }}>Bedtime Lock</p>
                    <p className="text-xs" style={{ color: "#9ca3af" }}>App locks at this time</p>
                  </div>
                </div>
                <input
                  type="time"
                  value={bedtime}
                  onChange={e => setBedtime(e.target.value)}
                  className="text-sm font-bold rounded-xl px-3 py-2 outline-none"
                  style={{ background: "#f0fdf4", color: "#10b981", border: "1.5px solid #bbf7d0" }}
                />
              </div>
            </div>

            {/* Content filters */}
            <div className="p-4 rounded-2xl" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)" }}>
              <p className="font-bold text-sm mb-3" style={{ color: "#111827" }}>Content Filters</p>
              <div className="space-y-3">
                {filters.map((f, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: `${f.color}18` }}>
                        <Icon name={f.icon as "Radio"} size={15} style={{ color: f.color }} />
                      </div>
                      <span className="text-sm font-semibold" style={{ color: "#374151" }}>{f.label}</span>
                    </div>
                    <button onClick={() => toggleFilter(i)}
                      className="w-11 h-6 rounded-full flex items-center px-1 transition-all"
                      style={{ background: f.on ? f.color : "#d1d5db" }}>
                      <div className="w-4 h-4 rounded-full bg-white transition-all"
                        style={{ marginLeft: f.on ? "auto" : 0 }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── APPROVALS ── */}
        {tab === "approvals" && (
          <div className="animate-fade-in space-y-4">
            <p className="text-sm" style={{ color: "#6b7280" }}>Emma wants to publish these videos. Review & approve.</p>

            {approvals.map(a => (
              <div key={a.id} className="p-4 rounded-2xl"
                style={{ background: "#fff", border: `1.5px solid ${a.status === "approved" ? "#bbf7d0" : a.status === "rejected" ? "#fca5a5" : "rgba(0,0,0,0.08)"}` }}>
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ background: "#f0f4ff" }}>
                    {a.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm" style={{ color: "#111827" }}>{a.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                        style={{ background: "#e0e7ff", color: "#4338ca" }}>{a.tag}</span>
                      <span className="text-xs" style={{ color: "#9ca3af" }}>{a.submittedAt}</span>
                    </div>
                  </div>
                </div>

                {a.status === "pending" ? (
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => decide(a.id, "rejected")}
                      className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95"
                      style={{ background: "#fef2f2", color: "#ef4444", border: "1.5px solid #fca5a5" }}>
                      ✕ Decline
                    </button>
                    <button onClick={() => decide(a.id, "approved")}
                      className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95"
                      style={{ background: "#10b981", color: "#fff" }}>
                      ✓ Approve
                    </button>
                  </div>
                ) : (
                  <div className="mt-3 flex items-center gap-2 justify-center py-2 rounded-xl"
                    style={{ background: a.status === "approved" ? "#f0fdf4" : "#fef2f2" }}>
                    <Icon name={a.status === "approved" ? "CheckCircle" : "XCircle"} size={16}
                      style={{ color: a.status === "approved" ? "#10b981" : "#ef4444" }} />
                    <span className="text-sm font-bold"
                      style={{ color: a.status === "approved" ? "#10b981" : "#ef4444" }}>
                      {a.status === "approved" ? "Approved — video is live!" : "Declined"}
                    </span>
                  </div>
                )}
              </div>
            ))}

            {approvals.every(a => a.status !== "pending") && (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🎉</div>
                <p className="font-bold" style={{ color: "#374151" }}>All caught up!</p>
                <p className="text-sm mt-1" style={{ color: "#9ca3af" }}>No more videos waiting for review</p>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
