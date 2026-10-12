import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { BroadcastModal } from '../modals/BroadcastModal';
import { HelpModal } from '../modals/HelpModal';
import { ScheduleDriveModal } from '../modals/ScheduleDriveModal';
import { usePlacement } from '../../context/PlacementContext';
import { CheckCircle2 } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const { toastMessage } = usePlacement();
  const [broadcastOpen, setBroadcastOpen] = useState(false);
  const [scheduleDriveOpen, setScheduleDriveOpen] = useState(false);
  const [helpModalState, setHelpModalState] = useState<'closed' | 'help' | 'support'>('closed');

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex">
      {/* Fixed Left Sidebar */}
      <Sidebar
        onOpenHelp={() => setHelpModalState('help')}
        onOpenSupport={() => setHelpModalState('support')}
      />

      {/* Main Column */}
      <div className="pl-72 flex-1 flex flex-col min-w-0">
        {/* Fixed Top Header */}
        <Header onOpenBroadcast={() => setBroadcastOpen(true)} />

        {/* Content Outlet */}
        <main className="pt-16 pb-12 w-full min-h-[calc(100vh-4rem)] flex flex-col">
          <Outlet context={{
            openBroadcast: () => setBroadcastOpen(true),
            openScheduleDrive: () => setScheduleDriveOpen(true),
            openHelp: () => setHelpModalState('help'),
            openSupport: () => setHelpModalState('support'),
          }} />
        </main>
      </div>

      {/* Global Modals */}
      <BroadcastModal
        isOpen={broadcastOpen}
        onClose={() => setBroadcastOpen(false)}
      />

      <ScheduleDriveModal
        isOpen={scheduleDriveOpen}
        onClose={() => setScheduleDriveOpen(false)}
      />

      <HelpModal
        isOpen={helpModalState !== 'closed'}
        mode={helpModalState === 'support' ? 'support' : 'help'}
        onClose={() => setHelpModalState('closed')}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-2xl border border-slate-700 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
