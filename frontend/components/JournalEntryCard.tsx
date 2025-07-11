
import React, { useState } from 'react';
import type { JournalEntry } from '../types';
import { Role } from '../types';
import { TRIGGERS, ACTIVITIES, MOOD_COLORS, EMOTION_COLORS } from '../constants';
import Card from './ui/Card';
import Button from './ui/Button';

interface JournalEntryCardProps {
  entry: JournalEntry;
  role?: Role;
  onUpdateNote?: (entryId: string, note: string) => void;
}

const PsychologistNoteForm: React.FC<{
    note: string | null;
    onSubmit: (newNote: string) => void;
}> = ({ note, onSubmit }) => {
    const [currentNote, setCurrentNote] = useState(note || '');
    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(currentNote);
        setIsEditing(false);
    };

    if (!isEditing) {
        return (
            <div className="mt-4">
                <h4 className="font-semibold text-sm text-brand-text-primary">Заметка психолога:</h4>
                <p className="text-sm text-brand-text-secondary italic mt-1">
                    {note || "Заметок пока нет."}
                </p>
                <Button onClick={() => setIsEditing(true)} variant="secondary" className="mt-2 text-xs px-2 py-1">
                    {note ? 'Редактировать' : 'Добавить заметку'}
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <h4 className="font-semibold text-sm text-brand-text-primary mb-2">Редактировать заметку:</h4>
            <textarea
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
                rows={3}
            />
            <div className="flex gap-2 mt-2">
                <Button type="submit">Сохранить</Button>
                <Button variant="secondary" onClick={() => { setIsEditing(false); setCurrentNote(note || ''); }}>
                    Отмена
                </Button>
            </div>
        </form>
    );
};


const JournalEntryCard: React.FC<JournalEntryCardProps> = ({ entry, role, onUpdateNote }) => {
  const getTriggerLabel = (id: string) => TRIGGERS.find(t => t.id === id)?.label || id;
  const getActivityLabel = (id: string) => ACTIVITIES.find(a => a.id === id)?.label || id;
  
  const handleNoteSubmit = (note: string) => {
      if(onUpdateNote) {
          onUpdateNote(entry.id, note);
      }
  };

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-semibold text-brand-primary">
            {new Date(entry.date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-brand-text-secondary">Настроение:</span>
            <div className={`w-5 h-5 rounded-full ${MOOD_COLORS[entry.mood]}`} title={`Настроение: ${entry.mood}/5`}></div>
          </div>
        </div>
        {entry.aiAnalysis && (
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${EMOTION_COLORS[entry.aiAnalysis.emotion]}`}>
            {entry.aiAnalysis.emotion}
          </span>
        )}
      </div>

      {entry.aiAnalysis && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm font-semibold text-brand-text-primary">🤖 AI Анализ:</p>
          <p className="text-sm text-brand-text-secondary italic mt-1">"{entry.aiAnalysis.summary}"</p>
        </div>
      )}
      
      <p className="mt-4 text-brand-text-primary whitespace-pre-wrap">{entry.content}</p>

      <div className="mt-4 space-y-3">
        {entry.triggers.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm text-brand-text-primary">Триггеры:</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {entry.triggers.map(id => (
                <span key={id} className="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-md">{getTriggerLabel(id)}</span>
              ))}
            </div>
          </div>
        )}
        {entry.activities.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm text-brand-text-primary">Активности:</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {entry.activities.map(id => (
                <span key={id} className="px-2 py-1 text-xs bg-emerald-100 text-emerald-800 rounded-md">{getActivityLabel(id)}</span>
              ))}
            </div>
          </div>
        )}
      </div>

       {role === Role.PSYCHOLOGIST && onUpdateNote ? (
         <PsychologistNoteForm note={entry.psychologistNote} onSubmit={handleNoteSubmit} />
      ) : entry.psychologistNote && (
        <div className="mt-4 border-t pt-4">
            <h4 className="font-semibold text-sm text-brand-text-primary">Заметка психолога:</h4>
            <p className="text-sm text-brand-text-secondary italic mt-1 bg-yellow-50 p-3 rounded-md">
                {entry.psychologistNote}
            </p>
        </div>
      )}
    </Card>
  );
};

export default JournalEntryCard;