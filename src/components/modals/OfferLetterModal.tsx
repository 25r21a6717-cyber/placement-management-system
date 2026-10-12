import React from 'react';
import { Award, Download, CheckCircle, X, Building, ShieldCheck, Printer } from 'lucide-react';
import { usePlacement } from '../../context/PlacementContext';

interface OfferLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName?: string;
  roleTitle?: string;
  packageLPA?: number;
}

export const OfferLetterModal: React.FC<OfferLetterModalProps> = ({
  isOpen,
  onClose,
  companyName = 'Microsoft Corporation',
  roleTitle = 'Cloud Solutions Architect (Azure)',
  packageLPA = 24.5,
}) => {
  const { currentUser, showToast } = usePlacement();

  if (!isOpen) return null;

  const handleDownload = () => {
    showToast(`Downloading verified Offer Letter for ${companyName} (${roleTitle})...`);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl flex flex-col border border-slate-200 overflow-hidden my-6">
        {/* Header bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Official Letter of Employment Offer</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-semibold">
                  TPO Validated
                </span>
              </div>
              <p className="text-xs text-slate-300">Campus Placement Season AY 2024-25 • Reference: MSFT/CAMPUS/2024/9912</p>
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

        {/* Certificate / Letter Body */}
        <div className="p-8 bg-slate-50 flex flex-col gap-6">
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-5 text-slate-800 text-sm">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">{companyName}</h2>
                <p className="text-xs text-slate-500">Global Development Centers • University Talent Acquisition</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Date of Release</span>
                <span className="text-xs font-semibold text-slate-700">08 November 2024</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-semibold text-slate-800">
                To: <span className="text-blue-600">{currentUser.name}</span> (Roll No: {currentUser.rollNumber || 'CS21B042'})
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dear {currentUser.name},<br />
                On behalf of <strong>{companyName}</strong>, we are pleased to offer you the position of{' '}
                <strong>{roleTitle}</strong> following your outstanding performance across all campus evaluation rounds at the University Training &amp; Placement Cell.
              </p>
            </div>

            {/* Compensation Block */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider block">Total Compensation (Annual CTC)</span>
                <span className="text-2xl font-bold text-blue-700">₹{packageLPA.toFixed(1)} LPA</span>
                <span className="text-xs text-slate-600 block mt-0.5">Fixed Base: ₹16.0L • Joining Bonus: ₹3.0L • Equity RSUs: ₹5.5L</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs">
                <CheckCircle className="w-7 h-7 text-emerald-600" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs pt-1 border-t border-slate-100">
              <div>
                <span className="text-slate-400 block">Reporting Department</span>
                <span className="font-semibold text-slate-800">Cloud &amp; AI Enterprise Infrastructure</span>
              </div>
              <div>
                <span className="text-slate-400 block">Work Location</span>
                <span className="font-semibold text-slate-800">Hyderabad / Bengaluru Campus</span>
              </div>
              <div>
                <span className="text-slate-400 block">Tentative Joining Date</span>
                <span className="font-semibold text-slate-800">July 01, 2025</span>
              </div>
              <div>
                <span className="text-slate-400 block">Offer Status</span>
                <span className="font-semibold text-emerald-600">Formally Accepted &amp; Locked</span>
              </div>
            </div>

            {/* Institutional Sign-off */}
            <div className="flex items-center justify-between pt-6 border-t border-dashed border-slate-200">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800">Priya Narayanan</span>
                <span className="text-[11px] text-slate-500">Director - University Recruitment, Microsoft</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified by TPO Directorate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action bar */}
        <div className="px-6 py-4 bg-white border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Cryptographic Checksum: <span className="font-mono text-slate-700">SHA256: 9f8a...2e4b</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDownload}
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print Letter</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF (TPO Sealed)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
