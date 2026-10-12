import React from 'react';
import { BookOpen, X, Phone, Mail, MapPin, ExternalLink, HelpCircle } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'help' | 'support';
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose, mode = 'help' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl flex flex-col border border-slate-200 overflow-hidden my-6">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              {mode === 'help' ? <BookOpen className="w-5 h-5" /> : <HelpCircle className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {mode === 'help' ? 'Placement Manual & Guidelines' : 'Training & Placement Desk Helpline'}
              </h3>
              <p className="text-xs text-slate-400">AY 2024-25 Institutional Support</p>
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

        <div className="p-6 flex flex-col gap-4 text-xs text-slate-700">
          {mode === 'help' ? (
            <>
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-100 flex flex-col gap-1.5">
                <span className="font-bold text-blue-900 text-xs">Rule 3.2: 1-Offer-Per-Tier Institutional Policy</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Students securing an offer in the Standard or Core/Product tier remain eligible for Dream (&gt;12 LPA) and Super Dream (&gt;20 LPA) opportunities until a Super Dream offer is formally accepted.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-bold text-slate-900">Placement Preparation Quick Links:</span>
                <div className="grid grid-cols-1 gap-2">
                  <a
                    href="#aptitude"
                    onClick={(e) => { e.preventDefault(); alert('Redirecting to departmental coding benchmark platform.'); onClose(); }}
                    className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center justify-between font-medium text-slate-800"
                  >
                    <span>Departmental Mock Test Portal</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                  <a
                    href="#interview"
                    onClick={(e) => { e.preventDefault(); alert('Interview Etiquette document downloaded.'); onClose(); }}
                    className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center justify-between font-medium text-slate-800"
                  >
                    <span>Dress Code &amp; Interview Protocol (PDF)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                  <a
                    href="#nirf"
                    onClick={(e) => { e.preventDefault(); alert('NIRF & NAAC Audit Guidelines displayed.'); onClose(); }}
                    className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center justify-between font-medium text-slate-800"
                  >
                    <span>NIRF / NBA Accreditation Audit Criteria</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Placement Officer Desk</span>
                    <span className="text-slate-500 text-[11px]">Room 102, Ground Floor, Admin Block</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Direct Emergency Helpline</span>
                    <span className="text-slate-500 text-[11px]">+91 (040) 2314-8841 • Campus Ext: 4122</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <Mail className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Institutional Placement Email</span>
                    <span className="text-slate-500 text-[11px]">placements@campus.edu • tpo.director@campus.edu</span>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
