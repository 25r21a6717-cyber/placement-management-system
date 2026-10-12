import React, { useState } from 'react';
import { Megaphone, X, Send } from 'lucide-react';
import { usePlacement } from '../../context/PlacementContext';

interface BroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BroadcastModal: React.FC<BroadcastModalProps> = ({ isOpen, onClose }) => {
  const { addNotice } = usePlacement();
  const [recipient, setRecipient] = useState('All Unplaced Students (268 candidates)');
  const [subject, setSubject] = useState('[ACTION REQUIRED] Mandatory Aptitude Test Slot Booking & Code of Conduct');
  const [message, setMessage] = useState('Dear Students, Day 1 slot booking is live. Ensure your verified CGPA certificates are uploaded before 17:00 IST today. Formals mandatory for offline interview halls.');
  const [urgency, setUrgency] = useState<'high' | 'medium' | 'low'>('high');

  if (!isOpen) return null;

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    addNotice({
      title: subject,
      type: urgency === 'high' ? 'Urgent Deadline' : 'Policy Alert',
      date: 'Today',
      description: message,
      urgency,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl flex flex-col gap-5 border border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Send Broadcast Announcement</h3>
              <p className="text-xs text-slate-500">Instant push alert via portal &amp; official university email</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleDispatch} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 mb-1.5 block">Recipient Target</label>
            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option>All Unplaced Students (268 candidates)</option>
              <option>CSE &amp; IT Shortlisted Candidates for Amazon AWS (450)</option>
              <option>Entire Graduating Class of 2025 (1,240)</option>
              <option>Department Coordinators &amp; Faculty Advisors</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1.5 block">Urgency Level</label>
            <div className="flex gap-2">
              {(['high', 'medium', 'low'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setUrgency(lvl)}
                  className={`flex-1 py-1.5 px-3 rounded-lg capitalize font-medium border text-xs transition-colors ${
                    urgency === lvl
                      ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {lvl} Urgency
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1.5 block">Subject Line</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full h-10 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1.5 block">Message Payload</label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-sm flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Dispatch Announcement</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
