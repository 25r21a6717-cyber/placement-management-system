import React, { useState } from 'react';
import { usePlacement } from '../context/PlacementContext';
import {
  CheckSquare,
  Building2,
  Clock,
  Video,
  MapPin,
  Download,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Award,
  Sparkles,
} from 'lucide-react';
import { OfferLetterModal } from '../components/modals/OfferLetterModal';

export const MyApplications: React.FC = () => {
  const { applications, acceptOffer } = usePlacement();
  const [filter, setFilter] = useState<'all' | 'active' | 'offers'>('all');
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [selectedAppForOffer, setSelectedAppForOffer] = useState<any | null>(null);

  const filteredApps = applications.filter((app) => {
    if (filter === 'active') return app.status !== 'Rejected' && app.status !== 'Offer Accepted';
    if (filter === 'offers') return app.status === 'Offer Extended' || app.status === 'Offer Accepted';
    return true;
  });

  return (
    <div className="px-6 lg:px-8 py-6 space-y-6 max-w-[1440px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold uppercase tracking-wider">
              Career Pipeline
            </span>
            <span className="text-xs text-slate-500 font-medium">{applications.length} Submissions Logged</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            My Applications &amp; Selection Status
          </h1>
          <p className="text-xs text-slate-500">
            Real-time status tracking across online assessments, technical interviews, and formal offer letters.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({applications.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('active')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filter === 'active' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            In-Progress
          </button>
          <button
            type="button"
            onClick={() => setFilter('offers')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filter === 'offers' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Offers
          </button>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApps.map((app) => {
          const isOffer = app.status === 'Offer Extended' || app.status === 'Offer Accepted';

          return (
            <div
              key={app.id}
              className={`p-6 rounded-2xl bg-white shadow-xs border transition-all ${
                isOffer ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center font-bold text-blue-600 shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-slate-900">{app.companyName}</h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          app.status === 'Offer Accepted'
                            ? 'bg-emerald-100 text-emerald-800'
                            : app.status === 'Offer Extended'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700">{app.roleTitle}</p>
                    <span className="text-[11px] text-slate-400">
                      Applied on {app.appliedDate} • Candidate ID: {app.studentRoll}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {isOffer && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAppForOffer(app);
                        setOfferModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                    >
                      <Award className="w-4 h-4" />
                      <span>{app.status === 'Offer Accepted' ? 'View Offer Letter' : 'Review & Accept Offer'}</span>
                    </button>
                  )}
                  {app.interviewLink && (
                    <a
                      href={app.interviewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                    >
                      <Video className="w-4 h-4" />
                      <span>Join Interview Hall</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Progress Bar & Next Step */}
              <div className="pt-4 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">
                    Selection Pipeline: <strong>{app.nextAction || app.status}</strong>
                  </span>
                  <span className="font-bold text-blue-600">{app.stageProgress}% Completed</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isOffer ? 'bg-emerald-600' : 'bg-blue-600'
                    }`}
                    style={{ width: `${app.stageProgress}%` }}
                  ></div>
                </div>

                {app.prepNotes && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800 block text-[11px]">Next Steps &amp; Prep Notes:</span>
                      <p className="text-[11px] leading-relaxed">{app.prepNotes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <OfferLetterModal
        isOpen={offerModalOpen}
        onClose={() => setOfferModalOpen(false)}
        companyName={selectedAppForOffer?.companyName || 'Microsoft Corporation'}
        roleTitle={selectedAppForOffer?.roleTitle || 'Cloud Solutions Architect (Azure)'}
        packageLPA={selectedAppForOffer?.offerLPA || 24.5}
      />
    </div>
  );
};
