import { useState } from 'react'
import Header from './layouts/Header.tsx'
import './constants/home.css'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'

const performanceData = [
  { day: 'Mon', transactions: 1200, commissions: 800 },
  { day: 'Tue', transactions: 1350, commissions: 900 },
  { day: 'Wed', transactions: 1280, commissions: 870 },
  { day: 'Thu', transactions: 1500, commissions: 1050 },
  { day: 'Fri', transactions: 1420, commissions: 980 },
  { day: 'Sun', transactions: 1700, commissions: 1200 },
]

const recentTransactions = [
  { date: '23 Apr, 2026', description: 'Airtime Purchase', amount: 600 },
  { date: '23 Apr, 2026', description: 'Data Bundle Purchase', amount: 3600 },
  { date: '24 Apr, 2026', description: 'TV Subscription', amount: 7120 },
  { date: '23 Apr, 2026', description: 'Airtime Purchase', amount: 5620 },
  { date: '22 Apr, 2026', description: 'Electricity Payment', amount: 1320 },
  { date: '22 Apr, 2026', description: 'Electricity Payment', amount: 1320 },
]

function formatAmount(amount: number) {
  return `₦ ${amount.toLocaleString()}.00`
}

type Tab = 'home' | 'transactions' | 'account' | 'support'

function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>('home')

  return (
    <div className="container">
      <Header />
      <div className="home-content">

        {/* Balance + Stats Row */}
        <div className="top-cards">
          <div className="balance-card">
            <div className="balance-icon-label">
              <span className="balance-wallet-icon">💳</span>
              <span className="balance-label">Balance</span>
            </div>
            <div className="balance-amount">₦45,200.00</div>
            <button className="fund-btn">Fund Account</button>
          </div>

          <div className="stats-card">
            <div className="stats-top">
              <span className="stats-icon">🔄</span>
              <span className="stats-count">1,350</span>
            </div>
            <div className="stats-desc">Transactions completed</div>
            <div className="stats-growth">
              <span className="growth-arrow">↑</span>
              <span className="growth-value">12%</span>
            </div>
            <div className="stats-chart-mini">
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={performanceData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="miniGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1a5fdb" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#1a5fdb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="transactions" stroke="#1a5fdb" strokeWidth={2} fill="url(#miniGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <span className="chart-title">Performance Chart</span>
            <div className="chart-legend">
              <span className="legend-dot dark"></span><span>Transactions</span>
              <span className="legend-dot light"></span><span>Commissions</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={performanceData} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="commGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#90c4ff" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#90c4ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8eef6" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#8a9bb5' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#8a9bb5' }} axisLine={false} tickLine={false}
                tickFormatter={(v) => `₦${(v / 1000).toFixed(1)}K`} />
              <Tooltip
                contentStyle={{ background: '#fff', border: '1px solid #e0e8f5', borderRadius: 8, fontSize: 12 }}
                formatter={(v: number | undefined) => [`₦${(v ?? 0).toLocaleString()}`, ''] as [string, string]}
              />
              <Area type="monotone" dataKey="commissions" stroke="#90c4ff" strokeWidth={2}
                fill="url(#commGrad)" dot={false} />
              <Line type="monotone" dataKey="transactions" stroke="#1a5fdb" strokeWidth={2.5}
                dot={{ r: 4, fill: '#fff', stroke: '#1a5fdb', strokeWidth: 2 }}
                activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Transactions */}
        <div className="transactions-card">
          <div className="transactions-header">
            <span className="transactions-title">Recent Transactions</span>
            <button className="view-all-btn">View All</button>
          </div>
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx, i) => (
                <tr key={i}>
                  <td>{tx.date}</td>
                  <td>{tx.description}</td>
                  <td>
                    <span className="tx-amount">{formatAmount(tx.amount)}</span>
                    <span className="tx-more">•••</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="view-all-row">
            <span>View All</span>
            <span className="chevron">›</span>
          </div>
        </div>

      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        {(['home', 'transactions', 'account', 'support'] as Tab[]).map((tab) => (
          <button
            key={tab}
            className={`nav-item ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            <span className="nav-icon">
              {tab === 'home' && '🏠'}
              {tab === 'transactions' && '🗂️'}
              {tab === 'account' && '👤'}
              {tab === 'support' && '🎧'}
            </span>
            <span className="nav-label">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default HomePage
