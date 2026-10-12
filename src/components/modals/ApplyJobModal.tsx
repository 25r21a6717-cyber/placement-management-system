import React, { useState } from 'react';
import { JobDrive } from '../../types';
import { usePlacement } from '../../context/PlacementContext';
import { CheckCircle2, AlertCircle, FileText, ArrowRight, X, Building2 } from 'lucide-react';

interface ApplyJobModalProps {
  job: JobDrive | null;
  onClose: () => void;
}

export const ApplyJobModal: React.FC<ApplyJobModalProps> = ({ job, onClose }) => {
  const { currentUser, applyToJob, isStudentEligible } = usePlacement();
  const [confirmedDeclaration, setConfirmedDeclaration] = useState(false);

  if (!job) return null;

  const eligibility = isStudentEligible(job, currentUser);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eligibility.eligible || !confirmedDeclaration) return;
    const success = applyToJob(job.id);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl flex flex-col border border-slate-200 overflow-hidden my-6">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Apply for Placement Drive</h3>
              <p className="text-xs text-slate-400">{job.companyName} • {job.roleTitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleApply} className="p-6 flex flex-col gap-4 text-xs">
          {/* Compensation summary card */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold block">Annual Package (CTC)</span>
              <span className="text-xl font-bold text-blue-600">₹{job.packageLPA.toFixed(2)} LPA</span>
              <span className="text-slate-500 text-[11px] block">{job.packageDetails}</span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-xs">
              {job.tier}
            </span>
          </div>

          {/* Eligibility status alert */}
          {eligibility.eligible ? (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-xs block">You are completely eligible for this drive!</span>
                <span className="text-[11px] text-emerald-700">
                  Matches your branch ({currentUser.branch}), verified CGPA ({currentUser.cgpa} &ge; {job.minCgpa}), and 0 active arrears.
                </span>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-xs block">Eligibility Criteria Mismatch</span>
                <ul className="list-disc list-inside text-[11px] text-red-700 mt-1">
                  {eligibility.reasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Dossier info */}
          <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-800">Verified Credentials Attached:</span>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-red-500" />
                <span className="font-medium text-slate-700 truncate">{currentUser.resumeFileName || 'Ananya_Sharma_Resume_v3.2.pdf'}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">TPO Signed</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1">
              <span>Candidate: <strong>{currentUser.name}</strong></span>
              <span>Roll Number: <strong>{currentUser.rollNumber}</strong></span>
              <span>Degree: <strong>B.Tech ({currentUser.branch})</strong></span>
              <span>Verified CGPA: <strong>{currentUser.cgpa}</strong></span>
            </div>
          </div>

          {/* Declaration check */}
          <label className="flex items-start gap-2.5 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={confirmedDeclaration}
              onChange={(e) => setConfirmedDeclaration(e.target.checked)}
              className="mt-0.5 accent-blue-600 h-4 w-4 rounded"
            />
            <span className="text-[11px] text-slate-600 leading-snug">
              I certify that all academic data is verified. I understand university placement policy allows 1 offer per tier, and attendance at all subsequent assessment stages is mandatory once shortlisted.
            </span>
          </label>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!eligibility.eligible || !confirmedDeclaration}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Submit Formal Application</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
