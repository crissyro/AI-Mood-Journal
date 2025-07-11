
import React, { useState } from 'react';
import type { JournalEntry } from '../types';
import JournalEntryCard from './JournalEntryCard';
import JournalEntryForm from './JournalEntryForm';
import Button from './ui/Button';
import PlusIcon from './icons/PlusIcon';

interface JournalFeedProps {
  entries: JournalEntry[];
  addEntry: (entry: JournalEntry) => void;
}

const JournalFeed: React.FC<JournalFeedProps> = ({ entries, addEntry }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-end mb-6">
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="w-5 h-5 mr-2" />
          Новая запись
        </Button>
      </div>
      
      <JournalEntryForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addEntry={addEntry}
      />

      {entries.length > 0 ? (
        <div className="space-y-6">
          {entries.map(entry => (
            <JournalEntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold text-brand-text-primary">Записей пока нет</h3>
          <p className="text-brand-text-secondary mt-2">Нажмите "Новая запись", чтобы добавить первую.</p>
        </div>
      )}
    </div>
  );
};

export default JournalFeed;