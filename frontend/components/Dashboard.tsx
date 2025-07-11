
import React, { useState } from 'react';
import type { JournalEntry } from '../types';
import { Role } from '../types';
import JournalFeed from './JournalFeed';
import AnalyticsView from './AnalyticsView';
import PsychologistView from './PsychologistView';
import BookOpenIcon from './icons/BookOpenIcon';
import ChartBarIcon from './icons/ChartBarIcon';
import DownloadIcon from './icons/DownloadIcon';
import Button from './ui/Button';

interface DashboardProps {
  role: Role;
  entries: JournalEntry[];
  addEntry: (entry: JournalEntry) => void;
  updateEntry: (entry: JournalEntry) => void;
  onExport: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ role, entries, addEntry, updateEntry, onExport }) => {
  const [view, setView] = useState<'feed' | 'analytics'>('feed');

  if (role === Role.PSYCHOLOGIST) {
    return <PsychologistView entries={entries} updateEntry={updateEntry} onExport={onExport}/>;
  }

  return (
    <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-center md:justify-between mb-6">
            <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    {view === 'feed' ? 'Мой Дневник' : 'Аналитика Настроения'}
                </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4 space-x-2">
                <Button variant={view === 'feed' ? 'primary' : 'secondary'} onClick={() => setView('feed')}>
                    <BookOpenIcon className="w-5 h-5 mr-2" />
                    Дневник
                </Button>
                <Button variant={view === 'analytics' ? 'primary' : 'secondary'} onClick={() => setView('analytics')}>
                    <ChartBarIcon className="w-5 h-5 mr-2" />
                    Аналитика
                </Button>
                 <Button variant="secondary" onClick={onExport}>
                    <DownloadIcon className="w-5 h-5 mr-2" />
                    Экспорт JSON
                </Button>
            </div>
        </div>
        
        {view === 'feed' ? (
            <JournalFeed entries={entries} addEntry={addEntry} />
        ) : (
            <AnalyticsView entries={entries} />
        )}
    </div>
  );
};

export default Dashboard;