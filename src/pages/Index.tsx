import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.ezst.app/projects/f6e6635d-5e07-48e0-9f32-b4f2b8ab4340/files/b8304a80-4fd2-4eaf-88b2-51fff29c402e.jpg";

const LIVE_STREAMS = [
  { id: 1, name: "StarKid_Pro", game: "Minecraft Adventures", viewers: "12.4K", avatar: "🦊", color: "#ff3cac", tag: "LIVE" },
  { id: 2, name: "CosmicGamer", game: "Roblox Obby World", viewers: "8.9K", avatar: "🐱", color: "#00f5ff", tag: "LIVE" },
  { id: 3, name: "NinjaPixel", game: "Fortnite Creative", viewers: "21K", avatar: "🐸", color: "#39ff14", tag: "LIVE" },
  { id: 4, name: "ZapQueen", game: "Fall Guys Party", viewers: "5.2K", avatar: "🦋", color: "#ffe600", tag: "LIVE" },
];

const VIDEOS = [
  { id: 1, title: "Epic Minecraft Speedrun 🚀", creator: "StarKid_Pro", views: "2.1M", duration: "15:32", emoji: "⛏️", gradient: "from-pink-500 to-purple-600" },
  { id: 2, title: "100 Players Obby Battle!", creator: "CosmicGamer", views: "980K", duration: "22:14", emoji: "🏃", gradient: "from-cyan-400 to-blue-600" },
  { id: 3, title: "I Built a Rainbow City!", creator: "NinjaPixel", views: "1.5M", duration: "18:47", emoji: "🌈", gradient: "from-green-400 to-emerald-600" },
  { id: 4, title: "Best Fortnite Skins Ever", creator: "ZapQueen", views: "750K", duration: "12:08", emoji: "🎮", gradient: "from-yellow-400 to-orange-500" },
  { id: 5, title: "Taming ALL Animals!", creator: "PuffyBear", views: "3.2M", duration: "28:55", emoji: "🐾", gradient: "from-rose-400 to-pink-600" },
  { id: 6, title: "Sky Islands Challenge", creator: "LunaPlay", views: "445K", duration: "10:21", emoji: "☁️", gradient: "from-violet-400 to-purple-600" },
];

const DISCOVER_CATEGORIES = [
  { emoji: "⚔️", label: "Action", color: "#ff3cac" },
  { emoji: "🏗️", label: "Building", color: "#00f5ff" },
  { emoji: "🏁", label: "Racing", color: "#ffe600" },
  { emoji: "🧩", label: "Puzzle", color: "#39ff14" },
  { emoji: "👻", label: "Spooky", color: "#bf00ff" },
  { emoji: "🐾", label: "Animals", color: "#ff6b35" },
  { emoji: "🌊", label: "Ocean", color: "#00bfff" },
  { emoji: "🚀", label: "Space", color: "#ff3cac" },
];

const CREATORS = [
  { name: "StarKid_Pro", followers: "2.4M", emoji: "🦊", badge: "⭐", verified: true, color: "#ff3cac" },
  { name: "CosmicGamer", followers: "1.8M", emoji: "🐱", badge: "🚀", verified: true, color: "#00f5ff" },
  { name: "NinjaPixel", followers: "3.1M", emoji: "🐸", badge: "💎", verified: true, color: "#39ff14" },
  { name: "ZapQueen", followers: "990K", emoji: "🦋", badge: "✨", verified: false, color: "#ffe600" },
];

const MESSAGES = [
  { id: 1, name: "StarKid_Pro", msg: "Hey! Watch my new Minecraft video 🎮", time: "2m", emoji: "🦊", unread: 3, color: "#ff3cac" },
  { id: 2, name: "CosmicGamer", msg: "That was so cool! Let's play together!", time: "15m", emoji: "🐱", unread: 1, color: "#00f5ff" },
  { id: 3, name: "NinjaPixel", msg: "Going live in 10 minutes! 🔴", time: "32m", emoji: "🐸", unread: 0, color: "#39ff14" },
  { id: 4, name: "PuffyBear", msg: "Thanks for the follow! 💜", time: "1h", emoji: "🐼", unread: 0, color: "#bf00ff" },
];

const SETTINGS_ITEMS = [
  { icon: "Shield", label: "Parental Controls", desc: "Set screen time & content limits", color: "#ff3cac" },
  { icon: "Bell", label: "Notifications", desc: "Stream alerts & new videos", color: "#00f5ff" },
  { icon: "Lock", label: "Privacy & Safety", desc: "Who can message & follow you", color: "#39ff14" },
  { icon: "Volume2", label: "Sound & Effects", desc: "Game sounds & notifications", color: "#ffe600" },
  { icon: "Palette", label: "Appearance", desc: "Colors, themes & avatars", color: "#bf00ff" },
  { icon: "HelpCircle", label: "Help & Support", desc: "FAQs & contact", color: "#ff6b35" },
];

type Tab = "home" | "discover" | "videos" | "messages" | "profile" | "settings";

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [following, setFollowing] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) => {
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  };

  const toggleFollow = (id: number) => {
    setFollowing(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  };

  return (
    <div className="min-h-screen text-white font-nunito overflow-hidden relative" style={{ background: "hsl(260,30%,8%)" }}>
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full opacity-20 float-anim"
          style={{ background: "radial-gradient(circle, #bf00ff, transparent)" }} />
        <div className="absolute top-[30%] right-[-5%] w-72 h-72 rounded-full opacity-15 float-anim-delay"
          style={{ background: "radial-gradient(circle, #00f5ff, transparent)" }} />
        <div className="absolute bottom-[-5%] left-[30%] w-80 h-80 rounded-full opacity-10 float-anim"
          style={{ background: "radial-gradient(circle, #ff3cac, transparent)" }} />
      </div>

      {/* TOP NAV */}
      <header className="sticky top-0 z-50 px-4 py-3 flex items-center justify-between"
        style={{ background: "rgba(15,8,30,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎮</span>
          <span className="font-fredoka text-2xl" style={{ background: "linear-gradient(135deg, #ff3cac, #bf00ff, #00f5ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Tik Kids
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.08)" }}>
            <Icon name="Search" size={20} className="text-white" />
          </button>
          <button className="relative p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.08)" }}>
            <Icon name="Bell" size={20} className="text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold"
              style={{ background: "#ff3cac", fontSize: "10px", color: "#fff" }}>5</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="pb-24 min-h-[calc(100vh-60px)]">

        {/* ── HOME ── */}
        {activeTab === "home" && (
          <div className="animate-fade-in">
            {/* Hero Banner */}
            <div className="relative mx-4 mt-4 rounded-3xl overflow-hidden">
              <img src={HERO_IMAGE} alt="Gaming Kids" className="w-full h-56 object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(15,8,30,0.92) 0%, rgba(15,8,30,0.3) 100%)" }} />
              <div className="absolute inset-0 flex flex-col justify-center px-6">
                <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full text-xs font-bold w-fit"
                  style={{ background: "#ff3cac", color: "#fff" }}>
                  <span className="animate-live-pulse w-2 h-2 rounded-full bg-white inline-block" />
                  LIVE NOW
                </div>
                <h2 className="font-fredoka text-3xl text-white leading-tight">Game Time<br />is Hero Time! 🚀</h2>
                <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>Join 48K kids watching live</p>
                <button className="mt-3 px-5 py-2 rounded-2xl font-bold text-sm w-fit transition-transform active:scale-95"
                  style={{ background: "linear-gradient(135deg, #ff3cac, #bf00ff)", color: "#fff" }}>
                  Watch Now →
                </button>
              </div>
            </div>

            {/* Live Streams */}
            <div className="mt-6 px-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-fredoka text-xl text-white flex items-center gap-2">
                  <span className="animate-live-pulse w-3 h-3 rounded-full inline-block" style={{ background: "#ff3cac" }} />
                  Live Now
                </h3>
                <button className="text-xs font-bold" style={{ color: "#00f5ff" }}>See All</button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
                {LIVE_STREAMS.map(stream => (
                  <div key={stream.id}
                    className="flex-shrink-0 w-44 rounded-2xl overflow-hidden cursor-pointer card-hover"
                    style={{ background: "rgba(255,255,255,0.06)", border: `1.5px solid ${stream.color}40` }}>
                    <div className="h-24 flex items-center justify-center text-5xl relative"
                      style={{ background: `linear-gradient(135deg, ${stream.color}40, ${stream.color}10)` }}>
                      {stream.avatar}
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1"
                        style={{ background: "#ff3cac", color: "#fff" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-live-pulse inline-block" />
                        LIVE
                      </span>
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{ background: "rgba(0,0,0,0.6)", color: "#fff" }}>
                        👁 {stream.viewers}
                      </span>
                    </div>
                    <div className="p-2">
                      <p className="font-bold text-sm text-white truncate">{stream.name}</p>
                      <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.5)" }}>{stream.game}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Videos */}
            <div className="mt-6 px-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-fredoka text-xl text-white">🔥 Trending</h3>
                <button className="text-xs font-bold" style={{ color: "#00f5ff" }}>See All</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {VIDEOS.slice(0, 4).map(v => (
                  <div key={v.id} className="rounded-2xl overflow-hidden card-hover cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className={`h-24 flex items-center justify-center text-4xl bg-gradient-to-br ${v.gradient}`}>
                      {v.emoji}
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-bold text-white leading-tight truncate">{v.title}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{v.views}</span>
                        <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{v.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Creators */}
            <div className="mt-6 px-4 mb-4">
              <h3 className="font-fredoka text-xl text-white mb-3">⭐ Top Creators</h3>
              <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
                {CREATORS.map((c, i) => (
                  <div key={i} className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl relative"
                      style={{ background: `linear-gradient(135deg, ${c.color}60, ${c.color}20)`, border: `2.5px solid ${c.color}` }}>
                      {c.emoji}
                      {c.verified && (
                        <span className="absolute -bottom-1 -right-1 text-sm">{c.badge}</span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-white text-center">{c.name}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{c.followers}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── DISCOVER ── */}
        {activeTab === "discover" && (
          <div className="px-4 mt-6 animate-fade-in">
            <h2 className="font-fredoka text-3xl text-white mb-1">Discover 🔭</h2>
            <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>Explore games & creators you'll love</p>

            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-6"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <Icon name="Search" size={18} style={{ color: "rgba(255,255,255,0.4)" }} />
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>Search games, creators...</span>
            </div>

            <h3 className="font-fredoka text-xl text-white mb-3">Categories</h3>
            <div className="grid grid-cols-4 gap-3 mb-8">
              {DISCOVER_CATEGORIES.map((cat, i) => (
                <button key={i}
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl card-hover transition-all active:scale-95"
                  style={{ background: `${cat.color}18`, border: `1.5px solid ${cat.color}40` }}>
                  <span className="text-3xl">{cat.emoji}</span>
                  <span className="text-xs font-bold text-white">{cat.label}</span>
                </button>
              ))}
            </div>

            <h3 className="font-fredoka text-xl text-white mb-3">🌟 Rising Stars</h3>
            <div className="space-y-3">
              {CREATORS.map((c, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{ background: `${c.color}30`, border: `2px solid ${c.color}` }}>
                    {c.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-sm">{c.name}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{c.followers} followers</p>
                  </div>
                  <button
                    onClick={() => toggleFollow(i)}
                    className="px-4 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95"
                    style={following.has(i)
                      ? { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.2)" }
                      : { background: `linear-gradient(135deg, ${c.color}, ${c.color}99)`, color: "#fff" }
                    }>
                    {following.has(i) ? "Following ✓" : "+ Follow"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── VIDEOS ── */}
        {activeTab === "videos" && (
          <div className="px-4 mt-6 animate-fade-in">
            <h2 className="font-fredoka text-3xl text-white mb-1">Videos 🎬</h2>
            <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>Kid-safe videos just for you!</p>

            <div className="flex gap-2 overflow-x-auto pb-3 mb-5" style={{ scrollbarWidth: "none" }}>
              {["All", "🔥 Trending", "⛏️ Minecraft", "🏃 Roblox", "🎮 Fortnite", "🌈 Creative"].map((filter, i) => (
                <button key={i}
                  className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-bold transition-all active:scale-95"
                  style={i === 0
                    ? { background: "linear-gradient(135deg, #ff3cac, #bf00ff)", color: "#fff" }
                    : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.15)" }
                  }>
                  {filter}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {VIDEOS.map(v => (
                <div key={v.id} className="rounded-2xl overflow-hidden card-hover cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className={`h-40 flex items-center justify-center text-6xl bg-gradient-to-br ${v.gradient} relative`}>
                    {v.emoji}
                    <span className="absolute bottom-3 right-3 px-2 py-1 rounded-lg text-xs font-bold"
                      style={{ background: "rgba(0,0,0,0.7)", color: "#fff" }}>{v.duration}</span>
                  </div>
                  <div className="p-3 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: "rgba(255,255,255,0.1)" }}>
                      {CREATORS.find(c => c.name === v.creator)?.emoji ?? "🎮"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white text-sm leading-tight">{v.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{v.creator} • {v.views} views</p>
                    </div>
                    <button
                      onClick={() => toggleLike(v.id)}
                      className="flex flex-col items-center gap-0.5 transition-transform active:scale-125 flex-shrink-0">
                      <Icon name="Heart" size={20}
                        style={{ color: liked.has(v.id) ? "#ff3cac" : "rgba(255,255,255,0.4)", fill: liked.has(v.id) ? "#ff3cac" : "transparent" }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── MESSAGES ── */}
        {activeTab === "messages" && (
          <div className="px-4 mt-6 animate-fade-in">
            <h2 className="font-fredoka text-3xl text-white mb-1">Messages 💬</h2>
            <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>Chat with your fave creators!</p>

            <div className="space-y-3">
              {MESSAGES.map(msg => (
                <div key={msg.id} className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer card-hover"
                  style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${msg.unread > 0 ? msg.color + "40" : "rgba(255,255,255,0.08)"}` }}>
                  <div className="relative w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: `${msg.color}25`, border: `2px solid ${msg.color}` }}>
                    {msg.emoji}
                    {msg.unread > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold"
                        style={{ background: "#ff3cac", color: "#fff", fontSize: "10px" }}>{msg.unread}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-white text-sm">{msg.name}</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{msg.time} ago</p>
                    </div>
                    <p className={`text-xs mt-0.5 truncate ${msg.unread > 0 ? "text-white font-semibold" : ""}`}
                      style={{ color: msg.unread > 0 ? "#fff" : "rgba(255,255,255,0.45)" }}>{msg.msg}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 rounded-3xl text-center"
              style={{ background: "linear-gradient(135deg, rgba(191,0,255,0.2), rgba(0,245,255,0.1))", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="text-4xl mb-2">🤝</div>
              <h3 className="font-fredoka text-xl text-white">Find Friends!</h3>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>Connect with kids who love the same games</p>
              <button className="mt-3 px-6 py-2.5 rounded-2xl font-bold text-sm"
                style={{ background: "linear-gradient(135deg, #ff3cac, #bf00ff)", color: "#fff" }}>
                🔍 Find Friends
              </button>
            </div>
          </div>
        )}

        {/* ── PROFILE ── */}
        {activeTab === "profile" && (
          <div className="animate-fade-in">
            <div className="h-36 w-full rainbow-bg" />
            <div className="px-4 pb-4" style={{ marginTop: -48 }}>
              <div className="w-24 h-24 rounded-full flex items-center justify-center text-5xl"
                style={{ background: "linear-gradient(135deg, #ff3cac, #bf00ff)", border: "4px solid hsl(260,30%,8%)" }}>
                🦄
              </div>
              <div className="mt-2">
                <h2 className="font-fredoka text-2xl text-white">UnicornGamer99</h2>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Level 42 Gaming Pro ⚡</p>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { label: "Following", value: "284" },
                  { label: "Followers", value: "12.4K" },
                  { label: "Videos", value: "47" },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-3 rounded-2xl"
                    style={{ background: "rgba(255,255,255,0.06)" }}>
                    <p className="font-fredoka text-xl text-white">{stat.value}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <h3 className="font-fredoka text-lg text-white mb-3">My Badges 🏆</h3>
                <div className="flex gap-2 flex-wrap">
                  {["🏅 Top Gamer", "🌟 Star Creator", "🔥 On Fire", "💎 Diamond Fan", "🎮 Pro Player"].map((badge, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <h3 className="font-fredoka text-lg text-white mb-3">My Videos</h3>
                <div className="grid grid-cols-3 gap-2">
                  {["🌈", "⛏️", "🚀", "🏆", "🐉", "✨"].map((emoji, i) => (
                    <div key={i} className={`aspect-square rounded-xl flex items-center justify-center text-3xl bg-gradient-to-br ${VIDEOS[i % VIDEOS.length].gradient} cursor-pointer card-hover`}>
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── SETTINGS ── */}
        {activeTab === "settings" && (
          <div className="px-4 mt-6 animate-fade-in">
            <h2 className="font-fredoka text-3xl text-white mb-1">Settings ⚙️</h2>
            <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>Customize your Tik Kids experience</p>

            <div className="p-4 rounded-2xl mb-5 flex items-center gap-4"
              style={{ background: "linear-gradient(135deg, rgba(255,60,172,0.25), rgba(191,0,255,0.15))", border: "1.5px solid rgba(255,60,172,0.4)" }}>
              <div className="text-4xl">🛡️</div>
              <div className="flex-1">
                <p className="font-bold text-white text-sm">Kid-Safe Mode: ON</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>All content is verified safe for kids!</p>
              </div>
              <div className="w-12 h-6 rounded-full flex items-center px-1 flex-shrink-0"
                style={{ background: "#ff3cac" }}>
                <div className="w-4 h-4 rounded-full bg-white ml-auto" />
              </div>
            </div>

            <div className="space-y-3">
              {SETTINGS_ITEMS.map((item, i) => (
                <button key={i} className="w-full flex items-center gap-3 p-4 rounded-2xl text-left card-hover"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}25` }}>
                    <Icon name={item.icon as "Shield"} size={20} style={{ color: item.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-sm">{item.label}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{item.desc}</p>
                  </div>
                  <Icon name="ChevronRight" size={16} style={{ color: "rgba(255,255,255,0.25)" }} />
                </button>
              ))}
            </div>

            <p className="text-center text-xs mt-8 mb-2" style={{ color: "rgba(255,255,255,0.25)" }}>
              Tik Kids v1.0 🦄 Made with ❤️ for young gamers
            </p>
          </div>
        )}
      </main>

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-3"
        style={{ background: "rgba(15,8,30,0.92)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        {([
          { id: "home", icon: "Home", label: "Home", emoji: "🏠" },
          { id: "discover", icon: "Compass", label: "Discover", emoji: "🔭" },
          { id: "videos", icon: "Play", label: "Videos", emoji: "🎬" },
          { id: "messages", icon: "MessageCircle", label: "Chat", emoji: "💬" },
          { id: "profile", icon: "User", label: "Me", emoji: "🦄" },
          { id: "settings", icon: "Settings", label: "Settings", emoji: "⚙️" },
        ] as { id: Tab; icon: string; label: string; emoji: string }[]).map(item => {
          const isActive = activeTab === item.id;
          return (
            <button key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-2xl transition-all relative"
              style={isActive ? { background: "rgba(255,60,172,0.15)" } : {}}>
              {isActive && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: "#ff3cac" }} />
              )}
              <span className="text-lg">{item.emoji}</span>
              <span className="text-xs font-bold"
                style={{ color: isActive ? "#ff3cac" : "rgba(255,255,255,0.4)" }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}