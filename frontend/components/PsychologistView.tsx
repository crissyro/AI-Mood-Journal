
import React from 'react';
import type { JournalEntry } from '../types';
import { Role } from '../types';
import JournalEntryCard from './JournalEntryCard';
import Button from './ui/Button';
import DownloadIcon from './icons/DownloadIcon';

interface PsychologistViewProps {
  entries: JournalEntry[];
  updateEntry: (entry: JournalEntry) => void;
  onExport: () => void;
}

const PsychologistView: React.FC<PsychologistViewProps> = ({ entries, updateEntry, onExport }) => {

  const handleUpdateNote = (entryId: string, note: string) => {
    const entryToUpdate = entries.find(e => e.id === entryId);
    if (entryToUpdate) {
      updateEntry({ ...entryToUpdate, psychologistNote: note });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Дневники клиентов
        </h2>
        <Button variant="secondary" onClick={onExport}>
            <DownloadIcon className="w-5 h-5 mr-2" />
            Экспорт отчета (JSON)
        </Button>
      </div>

      {entries.length > 0 ? (
        <div className="space-y-6">
          {entries.map(entry => (
            <JournalEntryCard
              key={entry.id}
              entry={entry}
              role={Role.PSYCHOLOGIST}
              onUpdateNote={handleUpdateNote}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-brand-text-primary">Записей клиентов пока нет</h3>
          <p className="text-brand-text-secondary mt-2">Когда пользователи поделятся данными, они появятся здесь.</p>
        </div>
      )}
    </div>
  );
};

export default PsychologistView;