import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

const balanceData = [
  { month: "Aug", actual: 8000, planned: 9000 },
  { month: "Sep", actual: 9500, planned: 10000 },
  { month: "Oct", actual: 8800, planned: 10500 },
  { month: "Nov", actual: 13250, planned: 11000 },
  { month: "Dec", actual: 12000, planned: 13000 },
  { month: "Jan", actual: 14560, planned: 14000 },
];

const investData = [
  { month: "Aug", value: 1200 },
  { month: "Sep", value: 1800 },
  { month: "Oct", value: 2600 },
  { month: "Nov", value: 3100 },
  { month: "Dec", value: 4700 },
  { month: "Jan", value: 2900 },
];

const navItems = [
  { icon: "⊞", label: "Overview", active: true },
  { icon: "◎", label: "Accounts" },
  { icon: "⇄", label: "Transfers" },
  { icon: "▭", label: "Cards" },
  { icon: "↗", label: "Investments" },
  { icon: "◈", label: "Loans" },
  { icon: "◉", label: "Budgets" },
  { icon: "⊟", label: "Reports" },
  { icon: "⚙", label: "Settings" },
];

const transactions = [
  { icon: "💼", label: "Salary from ACME Inc.", date: "24 Jan, 10:30 AM", amount: "+$2,450.00", color: "#22c55e" },
  { icon: "🎵", label: "Spotify Subscription", date: "23 Jan, 08:15 PM", amount: "-$9.99", color: "#ef4444" },
  { icon: "📦", label: "Amazon Purchase", date: "22 Jan, 04:20 PM", amount: "-$124.50", color: "#ef4444" },
  { icon: "⚡", label: "Electricity Bill", date: "21 Jan, 11:05 AM", amount: "-$68.40", color: "#ef4444" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#1a1f3e",
        border: "1px solid #ffffff18",
        borderRadius: 12,
        padding: "10px 14px",
        fontSize: 13,
        color: "#fff",
        boxShadow: "0 8px 32px #0008"
      }}>
        <div style={{ color: "#aaa", marginBottom: 4 }}>{label}</div>
        <div style={{ fontWeight: 700, fontSize: 15 }}>${payload[0].value.toLocaleString()}</div>
      </div>
    );
  }
  return null;
};

export default function FinovaDashboard() {
  const [activeRange, setActiveRange] = useState("6 Month");
  const ranges = ["1 Year", "6 Month", "3 Month", "1 Month"];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0d1f 0%, #12102a 50%, #1a0f2e 100%)",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Ambient background blobs */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0
      }}>
        <div style={{
          position: "absolute", width: 600, height: 600,
          background: "radial-gradient(circle, #7c3aed22 0%, transparent 70%)",
          top: -100, left: -100,
        }} />
        <div style={{
          position: "absolute", width: 500, height: 500,
          background: "radial-gradient(circle, #db277720 0%, transparent 70%)",
          bottom: -100, right: 200,
        }} />
      </div>

      <div style={{ display: "flex", flex: 1, position: "relative", zIndex: 1 }}>
        {/* ── SIDEBAR ── */}
        <aside style={{
          width: 220,
          background: "linear-gradient(180deg, #0f1229 0%, #0c1020 100%)",
          borderRight: "1px solid #ffffff0a",
          display: "flex",
          flexDirection: "column",
          padding: "24px 16px",
          gap: 8,
          minHeight: "100vh",
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28, paddingLeft: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "linear-gradient(135deg, #7c3aed, #db2777)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, fontWeight: 900, color: "#fff"
            }}>F</div>
            <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px" }}>Finova</span>
          </div>

          {/* Nav */}
          <nav style={{ flex: 1 }}>
            {navItems.map(({ icon, label, active }) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "11px 14px",
                borderRadius: 12,
                marginBottom: 4,
                cursor: "pointer",
                background: active ? "linear-gradient(90deg, #7c3aed, #a855f7)" : "transparent",
                color: active ? "#fff" : "#8892b0",
                fontWeight: active ? 600 : 400,
                fontSize: 14,
                transition: "all 0.2s",
              }}>
                <span style={{ fontSize: 15 }}>{icon}</span>
                {label}
              </div>
            ))}
          </nav>

          {/* Net Worth */}
          <div style={{
            background: "#ffffff08",
            border: "1px solid #ffffff10",
            borderRadius: 16,
            padding: "16px",
            marginBottom: 12,
          }}>
            <div style={{ fontSize: 11, color: "#8892b0", marginBottom: 6 }}>Net Worth</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>$198,560.40</div>
            <div style={{ fontSize: 12, color: "#22c55e", marginTop: 2 }}>▲ 12.4% this month</div>
            <div style={{ marginTop: 10, height: 36 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={balanceData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="nwGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="actual" stroke="#a855f7" strokeWidth={1.5} fill="url(#nwGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Credit Card */}
          <div style={{
            background: "linear-gradient(135deg, #1e1b4b, #312e81)",
            border: "1px solid #ffffff15",
            borderRadius: 16,
            padding: 16,
            marginBottom: 12,
          }}>
            <div style={{ fontSize: 11, color: "#c4b5fd", marginBottom: 8 }}>Finova Credit Card</div>
            <div style={{ fontSize: 11, color: "#8892b0", marginBottom: 12 }}>Earn rewards, every time</div>
            <div style={{
              background: "#0f0c2e",
              borderRadius: 10,
              padding: "10px 12px",
              fontSize: 12,
              color: "#c4b5fd",
              marginBottom: 10,
              display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
              <span>•••• 5678</span>
              <span style={{ fontWeight: 700, color: "#fff", fontSize: 13 }}>VISA</span>
            </div>
            <button style={{
              width: "100%",
              padding: "8px",
              borderRadius: 10,
              border: "none",
              background: "linear-gradient(90deg, #7c3aed, #a855f7)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
            }}>View Card</button>
          </div>

          {/* User */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 8px",
            borderRadius: 12,
            background: "#ffffff06",
            cursor: "pointer",
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "linear-gradient(135deg, #f59e0b, #ef4444)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18
            }}>👤</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Alex Morgan</div>
              <div style={{ fontSize: 11, color: "#8892b0" }}>View Profile</div>
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
          {/* Top bar */}
          <header style={{
            display: "flex", alignItems: "center", gap: 16,
            padding: "18px 24px",
            borderBottom: "1px solid #ffffff08",
            background: "#0a0d1f99",
            backdropFilter: "blur(12px)",
          }}>
            <div style={{
              flex: 1,
              display: "flex", alignItems: "center", gap: 10,
              background: "#ffffff0a",
              border: "1px solid #ffffff12",
              borderRadius: 12,
              padding: "10px 16px",
              maxWidth: 420,
            }}>
              <span style={{ color: "#8892b0" }}>🔍</span>
              <span style={{ color: "#8892b0", fontSize: 14 }}>Search anything...</span>
              <span style={{ marginLeft: "auto", fontSize: 11, color: "#4a5568", background: "#ffffff0a", padding: "2px 8px", borderRadius: 6 }}>⌘K</span>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ color: "#8892b0", fontSize: 18, cursor: "pointer" }}>↺</span>
              <div style={{ position: "relative", cursor: "pointer" }}>
                <span style={{ fontSize: 18, color: "#8892b0" }}>🔔</span>
                <span style={{
                  position: "absolute", top: -4, right: -4,
                  width: 16, height: 16, borderRadius: "50%",
                  background: "#ef4444",
                  fontSize: 9, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>2</span>
              </div>
              <span style={{ fontSize: 18, color: "#8892b0", cursor: "pointer" }}>🌙</span>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18
                }}>👤</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Alex Morgan</div>
                  <div style={{ fontSize: 11, color: "#8892b0" }}>Premium Member</div>
                </div>
              </div>
            </div>
          </header>

          {/* Content Grid */}
          <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
            {/* LEFT COLUMN */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Total Balance Chart */}
              <div style={{
                background: "linear-gradient(135deg, #0f1229 0%, #0d1025 100%)",
                border: "1px solid #ffffff0d",
                borderRadius: 20,
                padding: 24,
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 13, color: "#8892b0", marginBottom: 6 }}>Total Balance</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                      <span style={{ fontSize: 32, fontWeight: 700 }}>$14,560.75</span>
                      <span style={{ fontSize: 14, color: "#22c55e", fontWeight: 600 }}>▲ 3.48%</span>
                      <span style={{ fontSize: 12, color: "#8892b0" }}>vs last month</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {ranges.map(r => (
                      <button key={r} onClick={() => setActiveRange(r)} style={{
                        padding: "6px 12px",
                        borderRadius: 8,
                        border: "none",
                        background: activeRange === r ? "#7c3aed" : "#ffffff0a",
                        color: activeRange === r ? "#fff" : "#8892b0",
                        fontSize: 12,
                        fontWeight: activeRange === r ? 600 : 400,
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}>{r}</button>
                    ))}
                  </div>
                </div>

                <div style={{ height: 200, marginTop: 16 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={balanceData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                      <defs>
                        <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#a855f7" stopOpacity={0.5} />
                          <stop offset="100%" stopColor="#a855f7" stopOpacity={0.02} />
                        </linearGradient>
                        <linearGradient id="plannedGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#22c55e" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff06" vertical={false} />
                      <XAxis dataKey="month" tick={{ fill: "#8892b0", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#8892b0", fontSize: 11 }} axisLine={false} tickLine={false}
                        tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="actual" stroke="#a855f7" strokeWidth={2.5}
                        fill="url(#actualGrad)" dot={false} activeDot={{ r: 5, fill: "#a855f7" }} />
                      <Area type="monotone" dataKey="planned" stroke="#22c55e" strokeWidth={1.5}
                        strokeDasharray="5 4" fill="url(#plannedGrad)" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 12 }}>
                  <span style={{ fontSize: 13, color: "#8892b0" }}>
                    Average monthly inflow <strong style={{ color: "#fff" }}>$4,320.00</strong>
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 2, background: "#a855f7", display: "inline-block" }} />
                    <span style={{ fontSize: 12, color: "#8892b0" }}>Actual balance</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 2, background: "#22c55e", display: "inline-block" }} />
                    <span style={{ fontSize: 12, color: "#8892b0" }}>Planned balance</span>
                  </div>
                </div>
              </div>

              {/* Bottom row: Promo + Investments */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 20 }}>
                {/* Promo Card */}
                <div style={{
                  background: "linear-gradient(135deg, #1e1040 0%, #2d1b5e 60%, #4c1d95 100%)",
                  border: "1px solid #7c3aed40",
                  borderRadius: 20,
                  padding: 24,
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 200,
                }}>
                  <div style={{
                    position: "absolute", right: -20, top: -20,
                    width: 180, height: 180,
                    background: "radial-gradient(circle, #a855f730 0%, transparent 70%)"
                  }} />
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.3, marginBottom: 10 }}>
                      Your Financial<br />
                      <span style={{ color: "#f472b6" }}>Future Starts Here</span>
                    </div>
                    <div style={{ fontSize: 13, color: "#c4b5fd", lineHeight: 1.5 }}>
                      Smart tools, better insights,<br />stronger tomorrow.
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
                    {["🧑", "👩", "👨", "+"].map((e, i) => (
                      <div key={i} style={{
                        width: 28, height: 28, borderRadius: "50%",
                        background: i === 3 ? "#7c3aed" : "linear-gradient(135deg, #f59e0b, #ef4444)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: i === 3 ? 14 : 16,
                        border: "2px solid #1e1040",
                        marginLeft: i > 0 ? -8 : 0,
                        color: "#fff", fontWeight: 700, fontSize: 12
                      }}>{e}</div>
                    ))}
                  </div>
                  <button style={{
                    marginTop: 16,
                    padding: "12px",
                    borderRadius: 12,
                    border: "none",
                    background: "#fff",
                    color: "#1e1040",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                    width: "100%",
                  }}>Get Started</button>
                </div>

                {/* Investments Bar Chart */}
                <div style={{
                  background: "linear-gradient(135deg, #0f1229, #0d1025)",
                  border: "1px solid #ffffff0d",
                  borderRadius: 20,
                  padding: 24,
                }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>Investments</div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <span style={{ fontSize: 12, color: "#8892b0" }}>Sort 11</span>
                      <span style={{ fontSize: 12, color: "#8892b0" }}>This Month ▾</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 16 }}>
                    <span style={{ fontSize: 22, fontWeight: 700 }}>$7,890.30</span>
                    <span style={{ fontSize: 13, color: "#22c55e" }}>▲ 5.62%</span>
                  </div>
                  <div style={{ height: 140 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={investData} margin={{ top: 10, right: 0, bottom: 0, left: 0 }} barSize={24}>
                        <defs>
                          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
                            <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.9} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" tick={{ fill: "#8892b0", fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#ffffff08" }} />
                        <Bar dataKey="value" fill="url(#barGrad)" radius={[6, 6, 0, 0]}
                          label={{ position: "top", fill: "#8892b0", fontSize: 10, formatter: v => `$${(v / 1000).toFixed(1)}k` }} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* My Cards */}
              <div style={{
                background: "linear-gradient(135deg, #c2410c, #db2777, #f59e0b)",
                borderRadius: 20,
                padding: 20,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>My Cards</span>
                  <button style={{
                    background: "#ffffff22", border: "none", color: "#fff",
                    padding: "5px 12px", borderRadius: 8, fontSize: 12, cursor: "pointer", fontWeight: 600
                  }}>+ Add Card</button>
                </div>

                {/* Card list */}
                {[
                  { name: "Mastercard", amt: "$2,360.00" },
                  { name: "RuPay", amt: "$1,260.00" },
                ].map(c => (
                  <div key={c.name} style={{
                    display: "flex", justifyContent: "space-between",
                    background: "#ffffff18", borderRadius: 10,
                    padding: "10px 14px", marginBottom: 8, fontSize: 13, fontWeight: 500
                  }}>
                    <span>{c.name}</span><span>{c.amt}</span>
                  </div>
                ))}

                {/* VISA card detail */}
                <div style={{
                  background: "#0a0d1fcc",
                  borderRadius: 16,
                  padding: 18,
                  marginTop: 8,
                  backdropFilter: "blur(12px)",
                }}>
                  <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 2, marginBottom: 12 }}>VISA</div>
                  <div style={{ fontSize: 14, color: "#8892b0", marginBottom: 4 }}>•••• •••• •••• 9012</div>
                  <div style={{ fontSize: 12, color: "#8892b0", marginBottom: 8 }}>Available Balance</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: 22, fontWeight: 700 }}>$2,150.50</span>
                    <span style={{ fontSize: 13, color: "#22c55e" }}>▲ 4.12%</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
                  <button style={{
                    padding: "11px", borderRadius: 12,
                    background: "#ffffff18", border: "none",
                    color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer"
                  }}>↙ Request</button>
                  <button style={{
                    padding: "11px", borderRadius: 12,
                    background: "linear-gradient(90deg, #db2777, #f59e0b)",
                    border: "none", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer"
                  }}>↗ Send Money</button>
                </div>
              </div>

              {/* Recent Transactions */}
              <div style={{
                background: "linear-gradient(135deg, #0f1229, #0d1025)",
                border: "1px solid #ffffff0d",
                borderRadius: 20,
                padding: 20,
                flex: 1,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span style={{ fontSize: 15, fontWeight: 600 }}>Recent Transactions</span>
                  <span style={{ fontSize: 13, color: "#7c3aed", cursor: "pointer" }}>View All</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {transactions.map(t => (
                    <div key={t.label} style={{
                      display: "flex", alignItems: "center", gap: 12
                    }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 12,
                        background: "#ffffff0a",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 18, flexShrink: 0
                      }}>{t.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{t.label}</div>
                        <div style={{ fontSize: 11, color: "#8892b0", marginTop: 2 }}>{t.date}</div>
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: t.color }}>{t.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer style={{
            padding: "14px 24px",
            borderTop: "1px solid #ffffff08",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            fontSize: 12, color: "#4a5568"
          }}>
            <span>© 2024 Finova. All rights reserved.</span>
            <div style={{ display: "flex", gap: 20 }}>
              {["Help", "Terms", "Privacy", "Security"].map(l => (
                <span key={l} style={{ cursor: "pointer" }}>{l}</span>
              ))}
            </div>
            <span>🌐 English ▾</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
