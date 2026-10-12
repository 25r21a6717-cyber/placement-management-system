import React, { useState } from 'react';
import { usePlacement } from '../context/PlacementContext';
import {
  Calendar as CalendarIcon,
  Video,
  MapPin,
  Clock,
  Copy,
  Check,
  PlusCircle,
  Building2,
  Sparkles,
} from 'lucide-react';

export const InterviewsCalendar: React.FC = () => {
  const { interviews, scheduleInterview, showToast } = usePlacement();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyLink = (id: string, link: string) => {
    navigator.clipboard?.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="px-6 lg:px-8 py-6 space-y-6 max-w-[1440px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold uppercase tracking-wider">
              Interview Coordination
            </span>
            <span className="text-xs text-slate-500 font-medium">{interviews.length} Scheduled</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Interview Schedules &amp; Hall Slots
          </h1>
          <p className="text-xs text-slate-500">
            Confirmed assessment panels, virtual Webex/Meet links, and in-person campus laboratory halls.
          </p>
        </div>
      </div>

      {/* Interviews List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {interviews.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-white shadow-xs border border-slate-200 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
                  {item.dateTime} • {item.timeSlot}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  {item.mode}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">{item.companyName}</h3>
                <p className="text-xs font-semibold text-slate-700">{item.roleTitle}</p>
                <span className="text-[11px] text-blue-600 font-bold mt-0.5 block">{item.roundName}</span>
              </div>

              {item.meetLink && (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 min-w-0">
                    <Video className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span className="text-xs text-slate-800 font-mono truncate">{item.meetLink}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyLink(item.id, item.meetLink!)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}

              {item.venue && (
                <div className="flex items-center gap-2 text-xs text-slate-700 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">{item.venue}</span>
                </div>
              )}

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-800 text-[11px] block">Special Instructions:</span>
                <p className="text-[11px] leading-relaxed">{item.prepNotes}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Slot Locked
              </span>
              {item.meetLink ? (
                <a
                  href={item.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Join Meeting</span>
                </a>
              ) : (
                <span className="text-xs text-slate-500 font-medium">Report 15m early</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
