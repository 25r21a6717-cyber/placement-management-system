import React, { useState } from 'react';
import { usePlacement } from '../context/PlacementContext';
import {
  PieChart,
  Award,
  TrendingUp,
  DollarSign,
  Building2,
  Calendar,
  Download,
  FileSpreadsheet,
  Send,
  CheckCircle2,
  Sliders,
  ChevronDown,
  ShieldCheck,
  Eye,
  FileText,
  FileCheck,
} from 'lucide-react';

export const PlacementAnalytics: React.FC = () => {
  const { departmentStats, showToast } = usePlacement();

  const [branchFilter, setBranchFilter] = useState('All Engineering Branches (Consolidated)');
  const [diversityFilter, setDiversityFilter] = useState('Include All Demographics');
  const [ctcBracket, setCtcBracket] = useState('Full Spectrum (₹3.5 LPA - ₹48 LPA)');
  const [recruiterTier, setRecruiterTier] = useState('Tier 1, Tier 2, and Volume Corporates');

  const handleDownloadPDF = () => {
    showToast('Generating official NIRF / NBA compliant Placement Analytics PDF report...');
  };

  const handleDownloadCSV = () => {
    showToast('Exporting student-level placement registry CSV spreadsheet...');
  };

  const handleScheduleDean = () => {
    showToast('Executive placement brief dispatched to Dean of Academic Affairs & Vice Chancellor.');
  };

  return (
    <div className="px-6 lg:px-8 py-6 flex flex-col gap-6 max-w-[1440px] mx-auto w-full">
      {/* 1. Header Bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] uppercase tracking-wider font-bold">
              Institutional Governance
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Audit Active
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Placement Analytics &amp; Institutional Report Hub
          </h1>
          <p className="text-xs text-slate-500">
            Aggregated academic year placement metrics, salary distribution bands, and recruiter performance analytics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 h-9 px-3 bg-slate-100 rounded-lg text-slate-700 text-xs font-semibold">
            <Calendar className="text-blue-600 w-4 h-4" />
            <span>AY 2024-2025 (Current) vs AY 2023-2024</span>
          </div>

          <button
            type="button"
            onClick={handleDownloadPDF}
            className="flex items-center gap-1.5 h-9 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-all shadow-2xs"
          >
            <Download className="w-4 h-4 text-blue-600" />
            <span>PDF Report</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadCSV}
            className="flex items-center gap-1.5 h-9 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-all shadow-2xs"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Clean CSV</span>
          </button>

          <button
            type="button"
            onClick={handleScheduleDean}
            className="flex items-center gap-1.5 h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Schedule to Dean</span>
          </button>
        </div>
      </div>

      {/* 2. Five KPI Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Placement Rate */}
        <div className="flex flex-col justify-between bg-white p-4 rounded-xl shadow-xs border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-bold tracking-wider uppercase">Placement Rate</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <PieChart className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-slate-900">78.4%</div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '78.4%' }}></div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+6.2% YoY growth</span>
          </div>
        </div>

        {/* Highest CTC */}
        <div className="flex flex-col justify-between bg-white p-4 rounded-xl shadow-xs border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-bold tracking-wider uppercase">Highest Package</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-slate-900">
              ₹48.00 <span className="text-xs font-normal text-slate-500">LPA</span>
            </div>
            <span className="text-[11px] text-slate-500">Int'l &amp; Domestic Tier-1</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-600">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>2 Students Offered</span>
          </div>
        </div>

        {/* Average CTC */}
        <div className="flex flex-col justify-between bg-white p-4 rounded-xl shadow-xs border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-bold tracking-wider uppercase">Batch Average</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-blue-600">
              ₹12.45 <span className="text-xs font-normal text-slate-500">LPA</span>
            </div>
            <span className="text-[11px] text-blue-700 font-medium">CSE / IT: ₹16.80 LPA</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+₹1.15 LPA vs 2023</span>
          </div>
        </div>

        {/* Median Salary */}
        <div className="flex flex-col justify-between bg-white p-4 rounded-xl shadow-xs border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-bold tracking-wider uppercase">Median Salary</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-slate-900">
              ₹10.50 <span className="text-xs font-normal text-slate-500">LPA</span>
            </div>
            <span className="text-[11px] text-slate-500">Std deviation ±2.4</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-600">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Median/Avg parity high</span>
          </div>
        </div>

        {/* Recruiters on Campus */}
        <div className="flex flex-col justify-between bg-white p-4 rounded-xl shadow-xs border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-bold tracking-wider uppercase">Recruiters</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-slate-900">
              86 <span className="text-xs font-normal text-slate-500">Total</span>
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold">22 First-Time Recruiters</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-600">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            <span>1,142 Offers Released</span>
          </div>
        </div>
      </div>

      {/* 3. Row 2: Salary Package Distribution & Monthly Recruitment Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Salary Package Distribution (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-xs border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">Salary Package Distribution</h2>
                <p className="text-xs text-slate-500">Classification across package bands (N = 972 students placed)</p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {/* Band 1: > 20 LPA */}
              <div className="flex flex-col gap-1 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                    <span className="text-xs font-bold text-slate-900">&gt; ₹20 LPA (Super Dream)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">142</span>
                    <span className="text-[10px] text-slate-600 font-semibold px-1.5 py-0.5 rounded bg-white border border-slate-200">
                      14.6%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '14.6%' }}></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 pt-0.5">
                  <span>Top: Tech Giants &amp; FinTech</span>
                  <span className="font-semibold text-slate-700">Avg: ₹26.8 LPA</span>
                </div>
              </div>

              {/* Band 2: 12 - 20 LPA */}
              <div className="flex flex-col gap-1 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>
                    <span className="text-xs font-bold text-slate-900">₹12 - ₹20 LPA (Dream)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">318</span>
                    <span className="text-[10px] text-slate-600 font-semibold px-1.5 py-0.5 rounded bg-white border border-slate-200">
                      32.7%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: '32.7%' }}></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 pt-0.5">
                  <span>Enterprise SaaS &amp; Consultancies</span>
                  <span className="font-semibold text-slate-700">Avg: ₹15.2 LPA</span>
                </div>
              </div>

              {/* Band 3: 7 - 12 LPA */}
              <div className="flex flex-col gap-1 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-600"></div>
                    <span className="text-xs font-bold text-slate-900">₹7 - ₹12 LPA (Core Tech/Product)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">380</span>
                    <span className="text-[10px] text-slate-600 font-semibold px-1.5 py-0.5 rounded bg-white border border-slate-200">
                      39.1%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '39.1%' }}></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 pt-0.5">
                  <span>High Volume Engineering &amp; Core Firms</span>
                  <span className="font-semibold text-slate-700">Avg: ₹9.1 LPA</span>
                </div>
              </div>

              {/* Band 4: < 7 LPA */}
              <div className="flex flex-col gap-1 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-500"></div>
                    <span className="text-xs font-bold text-slate-900">&lt; ₹7 LPA (Standard)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">132</span>
                    <span className="text-[10px] text-slate-600 font-semibold px-1.5 py-0.5 rounded bg-white border border-slate-200">
                      13.6%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1">
                  <div className="bg-slate-500 h-full rounded-full" style={{ width: '13.6%' }}></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 pt-0.5">
                  <span>Mass Recruiter IT Foundations</span>
                  <span className="font-semibold text-slate-700">Avg: ₹5.8 LPA</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>86.4% placed above ₹7.00 LPA</span>
            </div>
            <span className="font-bold text-blue-600 text-[11px]">NIRF Compliant Data</span>
          </div>
        </div>

        {/* Right: Monthly Recruitment Trend Timeline (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-xs border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">Monthly Recruitment Trend Timeline</h2>
                <p className="text-xs text-slate-500">Phased drive progression and hiring acceleration (July - Nov 2024)</p>
              </div>
              <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>AY 2024 Phase 1</span>
              </div>
            </div>

            {/* Visual SVG Timeline Curve */}
            <div className="mt-4 relative bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              <svg className="w-full h-44 overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 160">
                <defs>
                  <linearGradient id="trendGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="40" x2="600" y2="40" stroke="#E2E8F0" strokeDasharray="3 3" />
                <line x1="0" y1="80" x2="600" y2="80" stroke="#E2E8F0" strokeDasharray="3 3" />
                <line x1="0" y1="120" x2="600" y2="120" stroke="#E2E8F0" strokeDasharray="3 3" />
                
                <path
                  d="M 30,130 Q 120,85 170,55 T 310,20 T 450,75 T 570,110 L 570,150 L 30,150 Z"
                  fill="url(#trendGrad)"
                />
                <path
                  d="M 30,130 Q 120,85 170,55 T 310,20 T 450,75 T 570,110"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <circle cx="30" cy="130" r="5" fill="#2563EB" />
                <circle cx="170" cy="55" r="5" fill="#2563EB" />
                <circle cx="310" cy="20" r="6" fill="#1D4ED8" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="450" cy="75" r="5" fill="#2563EB" />
                <circle cx="570" cy="110" r="5" fill="#2563EB" />
              </svg>

              <div className="grid grid-cols-5 gap-2 pt-3 text-center text-xs">
                <div className="flex flex-col items-center">
                  <span className="font-bold text-slate-800">July</span>
                  <span className="text-[11px] text-slate-400">Day 0 &amp; PPOs</span>
                  <span className="text-xs text-blue-600 font-bold mt-0.5">94 Offers</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-bold text-slate-800">August</span>
                  <span className="text-[11px] text-slate-400">Super Dream</span>
                  <span className="text-xs text-blue-600 font-bold mt-0.5">216 Offers</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-bold text-slate-800">September</span>
                  <span className="text-[11px] text-slate-400">Day 1 &amp; FinTech</span>
                  <span className="text-xs text-blue-600 font-bold mt-0.5">388 Offers</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-bold text-slate-800">October</span>
                  <span className="text-[11px] text-slate-400">Core Engr.</span>
                  <span className="text-xs text-blue-600 font-bold mt-0.5">162 Offers</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-bold text-slate-800">November</span>
                  <span className="text-[11px] text-slate-400">Startups/Mid</span>
                  <span className="text-xs text-blue-600 font-bold mt-0.5">112 Offers</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4">
            <div className="p-3 rounded-xl bg-slate-50 text-center border border-slate-100">
              <span className="text-[11px] text-slate-400 block font-medium">Peak Window</span>
              <span className="text-xs font-bold text-slate-900">Sep 12 - Sep 28</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 text-center border border-slate-100">
              <span className="text-[11px] text-slate-400 block font-medium">PPO Conversion</span>
              <span className="text-xs font-bold text-emerald-700">89.2% (94 of 105)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 text-center border border-slate-100">
              <span className="text-[11px] text-slate-400 block font-medium">Phase 2 Target</span>
              <span className="text-xs font-bold text-slate-900">Jan 10, 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Row 3: Department-wise Placement Performance (Full Table) */}
      <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Department-wise Placement Performance</h2>
            <p className="text-xs text-slate-500">Comparative breakdown of student eligibility, placed strength, and branch benchmarks.</p>
          </div>
          <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-lg font-semibold">
            Sorted by: Placement %
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                <th className="py-3 px-4">Academic Department</th>
                <th className="py-3 px-3 text-center">Batch Size</th>
                <th className="py-3 px-3 text-center">Eligible Students</th>
                <th className="py-3 px-3 text-center">Placed Count</th>
                <th className="py-3 px-3 w-56">Placement Ratio (%)</th>
                <th className="py-3 px-4 text-right">Avg CTC</th>
                <th className="py-3 px-4 text-right">Highest CTC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {departmentStats.map((dept) => (
                <tr key={dept.shortName} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-semibold flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dept.color }}></span>
                    <span>{dept.department}</span>
                  </td>
                  <td className="py-3.5 px-3 text-center font-mono">{dept.batchSize}</td>
                  <td className="py-3.5 px-3 text-center font-mono">{dept.eligibleCount}</td>
                  <td className="py-3.5 px-3 text-center font-bold text-blue-600 font-mono">{dept.placedCount}</td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${dept.placementPercentage}%`,
                            backgroundColor: dept.color,
                          }}
                        ></div>
                      </div>
                      <span className="font-bold text-slate-800 text-[11px] w-12 text-right">
                        {dept.placementPercentage}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                    ₹{dept.averageLPA.toFixed(2)} LPA
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-700">
                    ₹{dept.highestLPA.toFixed(2)} LPA
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Row 4: Top Recruiting Partners Leaderboard & Custom Report Generator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Top Recruiting Partners Leaderboard (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-xs border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">Top Recruiting Partners Leaderboard</h2>
                <p className="text-xs text-slate-500">Recruiter footprint by tier classification and volume engagement</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                Tier-1 &amp; Mass Engaged
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-2.5">
              {/* TCS */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/60 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-blue-600 shadow-2xs">
                    TCS
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Tata Consultancy Services</span>
                    <span className="text-[11px] text-slate-500">Digital (₹7.5 LPA) &amp; Prime (₹9.0 LPA)</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-blue-600">120 Offers</div>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                    High Volume
                  </span>
                </div>
              </div>

              {/* Cognizant */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/60 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-indigo-600 shadow-2xs">
                    COG
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Cognizant &amp; Capgemini</span>
                    <span className="text-[11px] text-slate-500">GenC Next / Differential Profiles</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-blue-600">95 Offers</div>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                    Product Engineering
                  </span>
                </div>
              </div>

              {/* Cisco */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/60 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-emerald-600 shadow-2xs">
                    CSCO
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Cisco Systems &amp; Oracle</span>
                    <span className="text-[11px] text-slate-500">Software Development Engineer I (₹18-24 LPA)</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-700">34 Offers</div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Core Product
                  </span>
                </div>
              </div>

              {/* Microsoft */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/60 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-blue-700 shadow-2xs">
                    MSFT
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Microsoft &amp; Amazon AWS</span>
                    <span className="text-[11px] text-slate-500">SDE Cloud &amp; Applied ML (₹42-48 LPA)</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-blue-700">18 Offers</div>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                    Tier-1 Marquee
                  </span>
                </div>
              </div>

              {/* Goldman Sachs */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/60 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-purple-600 shadow-2xs">
                    GS
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Goldman Sachs &amp; Morgan Stanley</span>
                    <span className="text-[11px] text-slate-500">Quant / Tech Analyst Division (₹28-32 LPA)</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-900">12 Offers</div>
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">
                    FinTech &amp; Quant
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Displaying top 5 partner clusters by offer volume</span>
            <span className="text-blue-600 font-bold hover:underline cursor-pointer">
              View All 86 Recruiters →
            </span>
          </div>
        </div>

        {/* Right: Custom Report Generator (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-xs border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">Custom Report Generator</h2>
                <p className="text-xs text-slate-500">Parametric filter builder for administrative compliance and audits</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <Sliders className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 mb-1 block">Academic Branch Filter</label>
                <select
                  value={branchFilter}
                  onChange={(e) => setBranchFilter(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option>All Engineering Branches (Consolidated)</option>
                  <option>Circuit Branches (CSE, IT, ECE, EEE)</option>
                  <option>Core Engineering (Mech, Civil, Chem)</option>
                  <option>Only Computer Science &amp; Engineering</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 mb-1 block">Gender &amp; Demographic Diversity</label>
                <select
                  value={diversityFilter}
                  onChange={(e) => setDiversityFilter(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option>Include All Demographics</option>
                  <option>Women in Tech Initiative Cohort</option>
                  <option>First-Generation Learners</option>
                  <option>Day Scholar vs Hosteller</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 mb-1 block">Package Band (CTC Bracket)</label>
                <select
                  value={ctcBracket}
                  onChange={(e) => setCtcBracket(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option>Full Spectrum (₹3.5 LPA - ₹48 LPA)</option>
                  <option>&gt; ₹20 LPA (Super Dream Only)</option>
                  <option>₹12 LPA - ₹20 LPA (Dream Category)</option>
                  <option>₹7 LPA - ₹12 LPA (Core Benchmark)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 mb-1 block">Recruiter Tier Classification</label>
                <select
                  value={recruiterTier}
                  onChange={(e) => setRecruiterTier(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option>Tier 1, Tier 2, and Volume Corporates</option>
                  <option>Tier 1 Marquee &amp; MNCs</option>
                  <option>Venture-Backed Product Startups</option>
                  <option>Public Sector &amp; Core R&amp;D</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => showToast(`Previewing: ${branchFilter} • ${ctcBracket}`)}
                className="flex-1 flex items-center justify-center gap-1.5 h-9 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-all"
              >
                <Eye className="w-4 h-4 text-slate-600" />
                <span>Instant Preview</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadPDF}
                className="flex-1 flex items-center justify-center gap-1.5 h-9 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-all shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Download Report</span>
              </button>
            </div>
            <span className="text-center text-[11px] text-slate-400">
              Includes AICTE, NBA, and NIRF institutional verification watermark
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
