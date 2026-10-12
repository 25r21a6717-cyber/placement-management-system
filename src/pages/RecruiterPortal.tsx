import React, { useState } from 'react';
import { usePlacement } from '../context/PlacementContext';
import {
  Building2,
  Users,
  CheckCircle,
  Clock,
  PlusCircle,
  Search,
  Filter,
  Check,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Send,
  Video,
} from 'lucide-react';
import { ScheduleDriveModal } from '../components/modals/ScheduleDriveModal';

export const RecruiterPortal: React.FC = () => {
  const { jobs, applications, updateApplicationStatus, showToast } = usePlacement();
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [activeJobId, setActiveJobId] = useState<string>(jobs[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');

  const activeJob = jobs.find((j) => j.id === activeJobId) || jobs[0];
  const activeApplications = applications.filter((a) => a.companyName.toLowerCase().includes(activeJob.companyName.toLowerCase()) || activeJobId === 'all');

  const filteredCandidates = activeApplications.filter(
    (a) =>
      a.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.studentRoll.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-6 lg:px-8 py-6 space-y-6 max-w-[1440px] mx-auto w-full">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold uppercase tracking-wider">
              Recruiter Enterprise Workspace
            </span>
            <span className="text-xs text-slate-500 font-medium">Campus Talent Acquisition Portal</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Recruiter Candidate Pipeline &amp; Drive Management
          </h1>
          <p className="text-xs text-slate-500">
            Audit shortlisted university students, conduct technical evaluations, and release formal offer letters.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setScheduleModalOpen(true)}
          className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Campus Drive</span>
        </button>
      </div>

      {/* Recruiter Active Drives Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {jobs.slice(0, 3).map((job) => (
          <div
            key={job.id}
            onClick={() => setActiveJobId(job.id)}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              activeJobId === job.id
                ? 'bg-blue-50/50 border-blue-500 shadow-2xs'
                : 'bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">{job.companyName}</span>
              <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold">
                {job.tier}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-semibold mt-1 truncate">{job.roleTitle}</p>
            <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
              <span>{job.totalApplicants} Applicants</span>
              <span className="font-bold text-blue-600">₹{job.packageLPA} LPA</span>
            </div>
          </div>
        ))}
      </div>

      {/* Candidate Pipeline Table */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Applicant Pool for {activeJob?.companyName} ({filteredCandidates.length})
            </h2>
            <p className="text-xs text-slate-500">Review scores, change hiring stage, and dispatch offer letters</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search candidate name or roll..."
              className="w-full h-9 pl-9 pr-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                <th className="py-3 px-4">Candidate Details</th>
                <th className="py-3 px-3">Branch &amp; CGPA</th>
                <th className="py-3 px-3">Aptitude Score</th>
                <th className="py-3 px-3">Current Pipeline Stage</th>
                <th className="py-3 px-4 text-right">Recruiter Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredCandidates.map((cand) => (
                <tr key={cand.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 block">{cand.studentName}</span>
                    <span className="text-[11px] text-slate-400">{cand.studentRoll}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-semibold text-slate-800 block">{cand.studentBranch}</span>
                    <span className="text-[11px] text-blue-600 font-bold">{cand.studentCgpa} CGPA</span>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-800">
                    {cand.scoreAptitude ? `${cand.scoreAptitude}% (Cleared)` : '92% (Cleared)'}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        cand.status.includes('Offer')
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {cand.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => updateApplicationStatus(cand.id, 'Technical Interview 2', 'Advancing to Bar Raiser')}
                        className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold"
                      >
                        Advance Round
                      </button>
                      <button
                        type="button"
                        onClick={() => updateApplicationStatus(cand.id, 'Offer Extended', 'Offer Extended • Base ₹16L + Bonus')}
                        className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                      >
                        Extend Offer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ScheduleDriveModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
      />
    </div>
  );
};
