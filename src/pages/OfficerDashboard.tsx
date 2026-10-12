import React, { useState, useMemo } from 'react';
import { usePlacement } from '../context/PlacementContext';
import { useOutletContext, useNavigate } from 'react-router-dom';
import {
  Users,
  Building2,
  CheckCircle,
  PieChart,
  DollarSign,
  TrendingUp,
  Megaphone,
  FileDown,
  PlusCircle,
  Sliders,
  Search,
  Filter,
  Eye,
  Edit3,
  Calendar,
  Timer,
  Info,
  ChevronRight,
  ShieldCheck,
  Award,
} from 'lucide-react';

export const OfficerDashboard: React.FC = () => {
  const {
    studentsRoster,
    updateStudentClearance,
    eligibilityRules,
    updateEligibilityRules,
    resetEligibilityRules,
    showToast,
  } = usePlacement();

  const { openBroadcast, openScheduleDrive } = useOutletContext<{
    openBroadcast: () => void;
    openScheduleDrive: () => void;
  }>() || { openBroadcast: () => {}, openScheduleDrive: () => {} };

  const navigate = useNavigate();

  // Filters for the Student Dossier Table
  const [tableSearch, setTableSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [cgpaThreshold, setCgpaThreshold] = useState(7.5);
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [selectedStudentForView, setSelectedStudentForView] = useState<any | null>(null);

  // Eligibility Rule Engine Form State
  const [ruleCgpa, setRuleCgpa] = useState(eligibilityRules.minCgpa);
  const [ruleBacklogs, setRuleBacklogs] = useState(eligibilityRules.maxBacklogs);
  const [ruleBranches, setRuleBranches] = useState<string[]>(eligibilityRules.eligibleBranches);

  const toggleBranch = (branch: string) => {
    setRuleBranches(prev =>
      prev.includes(branch) ? prev.filter(b => b !== branch) : [...prev, branch]
    );
  };

  const handleSaveRules = () => {
    updateEligibilityRules({
      minCgpa: Number(ruleCgpa),
      maxBacklogs: Number(ruleBacklogs),
      eligibleBranches: ruleBranches,
      passingYear: '2025',
      oneOfferPerTier: true,
    });
  };

  const handleResetDefaults = () => {
    resetEligibilityRules();
    setRuleCgpa(7.5);
    setRuleBacklogs(0);
    setRuleBranches(['CSE', 'IT', 'ECE']);
  };

  // Filtered Students Roster
  const filteredStudents = useMemo(() => {
    return studentsRoster.filter((student) => {
      const matchSearch =
        tableSearch === '' ||
        student.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(tableSearch.toLowerCase()) ||
        student.skills.some(s => s.toLowerCase().includes(tableSearch.toLowerCase()));

      const matchDept =
        deptFilter === 'All Departments' ||
        student.branch.toLowerCase() === deptFilter.toLowerCase() ||
        (deptFilter === 'Mechanical' && student.branch.toLowerCase().includes('mech'));

      const matchCgpa = student.cgpa >= cgpaThreshold;

      const matchStatus =
        statusFilter === 'All Statuses' ||
        (statusFilter === 'Unplaced' && student.offersCount === 0) ||
        (statusFilter === 'Single Offer' && student.offersCount === 1) ||
        (statusFilter === 'Multiple Offers' && student.offersCount > 1) ||
        (statusFilter === 'Under Review' && student.clearanceStatus.includes('Under Review'));

      return matchSearch && matchDept && matchCgpa && matchStatus;
    });
  }, [studentsRoster, tableSearch, deptFilter, cgpaThreshold, statusFilter]);

  const handleExportAudit = () => {
    showToast('Exporting comprehensive TPO Accreditation & NIRF Placement Audit Report (Excel & PDF)...');
  };

  return (
    <div className="px-6 lg:px-8 py-6 flex flex-col gap-6 max-w-[1440px] mx-auto w-full">
      {/* 1. Top Command Header */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] uppercase tracking-wider text-blue-700 font-bold bg-blue-100 px-2.5 py-0.5 rounded-full">
              TPO Central Command
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Phase 1 Recruitment: 78.4% Batch Placed
            </span>
          </div>
          <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">
            Placement Operations Command Center · Academic Year 2024-25
          </h1>
          <p className="text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Verified Institutional Datastream • Real-time synchronization with Academic Registry • Last sync 4 mins ago
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2.5 shrink-0">
          <button
            type="button"
            onClick={openBroadcast}
            className="h-9 px-3.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Megaphone className="w-4 h-4 text-blue-600" />
            <span>Broadcast Announcement</span>
          </button>

          <button
            type="button"
            onClick={handleExportAudit}
            className="h-9 px-3.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <FileDown className="w-4 h-4 text-emerald-600" />
            <span>Export TPO Audit (XLS/PDF)</span>
          </button>

          <button
            type="button"
            onClick={openScheduleDrive}
            className="h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Schedule Placement Drive</span>
          </button>
        </div>
      </div>

      {/* 2. Five High-Impact KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* KPI 1: Total Registered */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Total Registered</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-slate-900">1,240</span>
            <div className="mt-1 flex items-center justify-between text-slate-500 text-xs">
              <span>Eligible: <strong className="text-slate-800">1,180</strong></span>
              <span>Unplaced: <strong className="text-red-600 font-semibold">268</strong></span>
            </div>
          </div>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: '78.4%' }}></div>
          </div>
        </div>

        {/* KPI 2: Companies Visited */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Companies Visited</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-slate-900">86</span>
            <div className="mt-1 flex items-center gap-1 text-emerald-700 text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+14 vs last year drive</span>
            </div>
          </div>
          <div className="mt-3 text-slate-500 text-xs flex items-center justify-between">
            <span>Tier-1 Day 0/1: <strong>32</strong></span>
            <span>Core/Product: <strong>54</strong></span>
          </div>
        </div>

        {/* KPI 3: Offers Extended */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Offers Extended</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-slate-900">972</span>
            <div className="mt-1 flex items-center gap-1 text-slate-500 text-xs">
              <span>Multiple: <strong className="text-emerald-700 font-semibold">310 candidates</strong></span>
            </div>
          </div>
          <div className="mt-3 text-slate-500 text-xs flex items-center justify-between">
            <span>Acceptance: <strong>92.8%</strong></span>
            <span>Pre-Placements: <strong>142</strong></span>
          </div>
        </div>

        {/* KPI 4: Placement Percentage */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Placement Rate</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <PieChart className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-slate-900">78.4%</span>
              <span className="text-xs text-slate-400">/ 90% goal</span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-slate-500 text-xs">
              <span>Target deadline: <strong className="text-slate-800">Dec 2024</strong></span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full" style={{ width: '87%' }}></div>
            </div>
            <span className="text-[11px] text-slate-500 font-semibold">87% to goal</span>
          </div>
        </div>

        {/* KPI 5: CTC Metrics */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">CTC Metrics</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex flex-col">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-500">Highest</span>
              <span className="text-sm font-bold text-slate-900">₹48.0 LPA</span>
            </div>
            <div className="flex items-baseline justify-between mt-0.5">
              <span className="text-xs text-slate-500">Batch Avg</span>
              <span className="text-sm font-bold text-blue-600">₹12.4 LPA</span>
            </div>
          </div>
          <div className="mt-3 pt-1.5 bg-slate-50 rounded px-2 py-1 flex items-center justify-between text-[11px] text-slate-500">
            <span>Median: ₹10.8 LPA</span>
            <span>Top 10%: ₹28.2 LPA</span>
          </div>
        </div>
      </div>

      {/* 3. Section A & B: Performance Analytics and Live Recruitment Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Section A: Department-wise Placement Performance (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-xs border border-slate-200 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Department-wise Placement Performance</h2>
              <p className="text-xs text-slate-500">Branch cohort progress, conversion rates &amp; average package</p>
            </div>
            <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2.5 py-1 rounded-full">
              Real-time Ledger
            </span>
          </div>

          <div className="flex flex-col gap-3 flex-1 justify-around">
            {/* CSE */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <span className="text-xs font-bold text-slate-900">Computer Science &amp; Engineering</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    94.2% Placed
                  </span>
                  <span className="text-xs font-semibold text-slate-800">Avg ₹16.8 LPA</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                <span>Placed: 235 / 250 students</span>
                <span>15 awaiting offers • 118 multiple offers</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '94.2%' }}></div>
              </div>
            </div>

            {/* IT */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                  <span className="text-xs font-bold text-slate-900">Information Technology (IT)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    91.0% Placed
                  </span>
                  <span className="text-xs font-semibold text-slate-800">Avg ₹14.5 LPA</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                <span>Placed: 110 / 121 students</span>
                <span>11 awaiting offers • 44 multiple offers</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div className="bg-sky-500 h-full rounded-full" style={{ width: '91.0%' }}></div>
              </div>
            </div>

            {/* ECE */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                  <span className="text-xs font-bold text-slate-900">Electronics &amp; Communication (ECE)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    86.5% Placed
                  </span>
                  <span className="text-xs font-semibold text-slate-800">Avg ₹12.1 LPA</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                <span>Placed: 180 / 208 students</span>
                <span>28 awaiting offers • 62 multiple offers</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: '86.5%' }}></div>
              </div>
            </div>

            {/* EEE */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                  <span className="text-xs font-bold text-slate-900">Electrical &amp; Electronics Engineering</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded-full">
                    72.8% Placed
                  </span>
                  <span className="text-xs font-semibold text-slate-800">Avg ₹9.2 LPA</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                <span>Placed: 88 / 121 students</span>
                <span>33 awaiting offers • 19 multiple offers</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div className="bg-purple-600 h-full rounded-full" style={{ width: '72.8%' }}></div>
              </div>
            </div>

            {/* MECH */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span>
                  <span className="text-xs font-bold text-slate-900">Mechanical Engineering</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded-full">
                    68.2% Placed
                  </span>
                  <span className="text-xs font-semibold text-slate-800">Avg ₹8.4 LPA</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                <span>Placed: 102 / 150 students</span>
                <span>48 awaiting offers • 14 multiple offers</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div className="bg-slate-500 h-full rounded-full" style={{ width: '68.2%' }}></div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span> Tech &amp; Computing
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span> Circuit Core
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-500"></span> Heavy Core
              </span>
            </div>
            <button
              type="button"
              onClick={() => navigate('/analytics')}
              className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Detailed Cohort Analytics</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Section B: Live & Active Drives (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-xs border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Live &amp; Active Drives</h2>
                <p className="text-xs text-slate-500">Real-time round telemetry &amp; upcoming schedules</p>
              </div>
              <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-800 font-bold rounded-full">
                3 Active
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {/* Drive 1: Amazon AWS */}
              <div className="p-3.5 bg-slate-50 rounded-xl flex flex-col gap-2 border border-slate-200/80 hover:bg-slate-100/60 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center font-bold text-xs text-blue-600 shadow-2xs border border-slate-200">
                      AWS
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">Amazon AWS</h3>
                      <p className="text-[11px] text-slate-500">Cloud Support Associate • SDE 1</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span> Live Round 2
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Coding Assessment in progress • <strong className="text-slate-900">450 Applicants</strong> • Cutoff CGPA: <strong className="text-slate-900">8.0</strong>
                </p>
                <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1 text-[11px]">
                    <Timer className="w-3.5 h-3.5" /> Test closes at 18:00 IST
                  </span>
                  <button
                    type="button"
                    onClick={() => showToast('Connecting to Amazon HackerEarth invigilation feed...')}
                    className="text-blue-600 font-bold hover:underline text-xs"
                  >
                    Monitor Invigilation
                  </button>
                </div>
              </div>

              {/* Drive 2: Qualcomm */}
              <div className="p-3.5 bg-slate-50 rounded-xl flex flex-col gap-2 border border-slate-200/80 hover:bg-slate-100/60 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center font-bold text-xs text-indigo-600 shadow-2xs border border-slate-200">
                      QC
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">Qualcomm</h3>
                      <p className="text-[11px] text-slate-500">Hardware &amp; Embedded Systems</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                    Shortlist Pending
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Technical screening completed • <strong className="text-slate-900">180 Applicants</strong> • Cutoff CGPA: <strong className="text-slate-900">7.5</strong>
                </p>
                <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
                  <span className="text-slate-600 text-[11px]">Recruiter verifying gate scores</span>
                  <button
                    type="button"
                    onClick={() => showToast('Qualcomm shortlist finalized & pushed to students.')}
                    className="text-blue-600 font-bold hover:underline text-xs"
                  >
                    Review &amp; Push Shortlist
                  </button>
                </div>
              </div>

              {/* Drive 3: Morgan Stanley */}
              <div className="p-3.5 bg-slate-50 rounded-xl flex flex-col gap-2 border border-slate-200/80 hover:bg-slate-100/60 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center font-bold text-xs text-purple-600 shadow-2xs border border-slate-200">
                      MS
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">Morgan Stanley</h3>
                      <p className="text-[11px] text-slate-500">Technology Analyst • Quant Strat</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                    Scheduled Nov 17
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Interview panel slots confirmed • <strong className="text-slate-900">310 Applicants</strong> • Cutoff CGPA: <strong className="text-slate-900">8.2</strong>
                </p>
                <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
                  <span className="text-slate-600 text-[11px]">Lab 402 • 6 Virtual Panels</span>
                  <button
                    type="button"
                    onClick={() => navigate('/interviews')}
                    className="text-blue-600 font-bold hover:underline text-xs"
                  >
                    Manage Slots
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Next Drive: Microsoft (Day 2 • Nov 20)</span>
            <button
              type="button"
              onClick={() => navigate('/jobs')}
              className="text-blue-600 font-bold hover:underline flex items-center gap-1"
            >
              <span>View All 24 Upcoming Drives</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Section C: Student Management & Eligibility Verification Table */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Student Placement Dossier &amp; Eligibility Verification</h2>
            <p className="text-xs text-slate-500">Audit candidates, approve verified transcripts, and oversee recruitment clearance</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => showToast('Batch verification completed for 848 eligible candidate profiles.')}
              className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1 hover:bg-slate-200 transition-colors"
            >
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Bulk Verify</span>
            </button>
            <button
              type="button"
              onClick={openBroadcast}
              className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1 hover:bg-slate-200 transition-colors"
            >
              <Megaphone className="w-4 h-4 text-blue-600" />
              <span>Notify Filtered ({filteredStudents.length})</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-3 bg-slate-50 rounded-xl flex flex-col md:flex-row items-center gap-3 flex-wrap justify-between border border-slate-200/80">
          <div className="relative flex-1 min-w-[220px] w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              placeholder="Search by name, roll no, or skill..."
              className="w-full h-9 pl-9 pr-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap w-full md:w-auto text-xs">
            {/* Department */}
            <div className="flex items-center bg-white border border-slate-200 rounded-lg px-2.5 h-9">
              <span className="text-slate-500 mr-1 text-[11px]">Dept:</span>
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none"
              >
                <option>All Departments</option>
                <option>CSE</option>
                <option>IT</option>
                <option>ECE</option>
                <option>EEE</option>
                <option>Mechanical</option>
              </select>
            </div>

            {/* CGPA Slider */}
            <div className="flex items-center bg-white border border-slate-200 rounded-lg px-2.5 h-9 gap-2">
              <span className="text-slate-500 whitespace-nowrap text-[11px]">CGPA ≥</span>
              <span className="font-bold text-blue-600 text-xs">{cgpaThreshold.toFixed(1)}</span>
              <input
                type="range"
                min="6.0"
                max="9.5"
                step="0.1"
                value={cgpaThreshold}
                onChange={(e) => setCgpaThreshold(Number(e.target.value))}
                className="w-20 accent-blue-600 cursor-pointer"
              />
            </div>

            {/* Status */}
            <div className="flex items-center bg-white border border-slate-200 rounded-lg px-2.5 h-9">
              <span className="text-slate-500 mr-1 text-[11px]">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none"
              >
                <option>All Statuses</option>
                <option>Unplaced</option>
                <option>Single Offer</option>
                <option>Multiple Offers</option>
                <option>Under Review</option>
              </select>
            </div>

            {/* Reset */}
            <button
              type="button"
              onClick={() => {
                setTableSearch('');
                setDeptFilter('All Departments');
                setCgpaThreshold(7.5);
                setStatusFilter('All Statuses');
              }}
              title="Clear Filters"
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table Roster */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                <th className="py-3 px-4">Student &amp; Roll Number</th>
                <th className="py-3 px-3">Branch</th>
                <th className="py-3 px-3">CGPA</th>
                <th className="py-3 px-3">Verified Skills</th>
                <th className="py-3 px-3">Drives / Apps</th>
                <th className="py-3 px-3">Offers</th>
                <th className="py-3 px-3">Clearance Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {student.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block leading-snug">{student.name}</span>
                        <span className="text-[11px] text-slate-400">
                          {student.rollNumber} • Passing {student.passingYear}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-800">{student.branch}</td>
                  <td className="py-3.5 px-3 font-bold text-slate-900 tabular-nums">{student.cgpa.toFixed(2)}</td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-1 flex-wrap">
                      {student.skills.map((sk: string) => (
                        <span key={sk} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-slate-700 tabular-nums">
                    {student.appliedCount} applied • {student.activeCount} active
                  </td>
                  <td className="py-3.5 px-3">
                    {student.offersCount > 0 ? (
                      <span className="font-bold text-emerald-700">{student.offers}</span>
                    ) : (
                      <span className="text-slate-400 font-medium">0 Offers</span>
                    )}
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                        student.clearanceStatus === 'Placed (Single)'
                          ? 'bg-emerald-100 text-emerald-800'
                          : student.clearanceStatus === 'Multi-Offer Placed'
                          ? 'bg-purple-100 text-purple-800'
                          : student.clearanceStatus === 'Eligible (Active)'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      <CheckCircle className="w-3 h-3" />
                      {student.clearanceStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedStudentForView(student)}
                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                        title="View Student Dossier"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const nextStatus =
                            student.clearanceStatus === 'Eligible (Active)'
                              ? 'Placed (Single)'
                              : 'Eligible (Active)';
                          updateStudentClearance(student.id, nextStatus as any);
                        }}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                        title="Toggle Clearance Status"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer count */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-slate-500">
          <span>
            Showing <strong>1 - {filteredStudents.length}</strong> of <strong>1,240</strong> verified student profiles
          </span>
          <div className="flex items-center gap-1.5">
            <button type="button" disabled className="px-3 py-1 rounded-md bg-slate-100 text-slate-400 font-medium">
              Previous
            </button>
            <span className="px-3 py-1 bg-blue-600 text-white rounded-md font-bold">1</span>
            <button type="button" className="px-3 py-1 rounded-md hover:bg-slate-100 text-slate-700 font-medium">
              2
            </button>
            <button type="button" className="px-3 py-1 rounded-md hover:bg-slate-100 text-slate-700 font-medium">
              3
            </button>
            <span>…</span>
            <button type="button" className="px-3 py-1 rounded-md hover:bg-slate-100 text-slate-700 font-medium">
              248
            </button>
            <button type="button" className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* 5. Section D: Drive Criteria Rule Engine Card */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Configure Eligibility Rules for Upcoming Drives</h2>
              <p className="text-xs text-slate-500">
                Automated validation engine evaluates applicants against these threshold constraints
              </p>
            </div>
          </div>
          <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold flex items-center gap-1 self-start">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Enforcement Engine: Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Criteria 1: Cutoff CGPA */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold text-slate-800">Minimum Cutoff CGPA</label>
              <Award className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <input
                type="number"
                min="5.0"
                max="10.0"
                step="0.1"
                value={ruleCgpa}
                onChange={(e) => setRuleCgpa(Number(e.target.value))}
                className="h-10 w-24 px-3 rounded-lg bg-white border border-slate-200 text-xl font-bold text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <span className="text-xs text-slate-500">/ 10.0 scale</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Excludes 182 registered candidates automatically below threshold
            </p>
          </div>

          {/* Criteria 2: Max Backlogs */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold text-slate-800">Active Backlogs Allowed</label>
              <Info className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <select
                value={ruleBacklogs}
                onChange={(e) => setRuleBacklogs(Number(e.target.value))}
                className="h-10 w-full px-3 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value={0}>0 (Strict Zero Standing Arrears)</option>
                <option value={1}>Up to 1 Backlog permitted</option>
                <option value={2}>Up to 2 Backlogs permitted</option>
              </select>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Audited against Semester VI registry ledger</p>
          </div>

          {/* Criteria 3: Eligible Branches */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold text-slate-800">Eligible Branches</label>
              <Building2 className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['CSE', 'IT', 'ECE', 'EEE', 'MECH'].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => toggleBranch(b)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                    ruleBranches.includes(b)
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {b} {ruleBranches.includes(b) ? '✓' : ''}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Circuit branches preselected</p>
          </div>

          {/* Criteria 4: Graduation Batch */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold text-slate-800">Passing Year Cohort</label>
              <Calendar className="w-4 h-4 text-slate-400" />
            </div>
            <div className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm font-bold text-slate-800 text-center">
              Class of 2025 (Graduating)
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
              <span>Policy: <strong>1 Offer per Tier</strong></span>
              <span className="text-blue-600 font-semibold">Rule v3.2</span>
            </div>
          </div>
        </div>

        {/* Action strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>
              Applying these rules dynamically filters <strong>848 candidates</strong> as instantly eligible for next scheduled recruitment slot.
            </span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="h-9 px-4 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
            >
              Reset to University Defaults
            </button>
            <button
              type="button"
              onClick={handleSaveRules}
              className="h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all"
            >
              Save &amp; Publish Rule Preset
            </button>
          </div>
        </div>
      </div>

      {/* Student Dossier Quick Modal Preview */}
      {selectedStudentForView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl flex flex-col gap-4 border border-slate-200 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                  {selectedStudentForView.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{selectedStudentForView.name}</h3>
                  <p className="text-slate-500 text-[11px]">{selectedStudentForView.rollNumber} • {selectedStudentForView.branch}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStudentForView(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">CGPA Score</span>
                  <span className="text-base font-bold text-slate-900">{selectedStudentForView.cgpa} / 10.0</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Clearance Status</span>
                  <span className="text-xs font-bold text-emerald-700">{selectedStudentForView.clearanceStatus}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 mb-1 block">Verified Technical Skills:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedStudentForView.skills.map((s: string) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="font-bold text-slate-800 block">Offer Summary:</span>
                <p className="text-slate-600">{selectedStudentForView.offers}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedStudentForView(null)}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-xs"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
