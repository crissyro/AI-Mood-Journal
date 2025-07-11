
import React, { useState } from 'react';
import type { JournalEntry, Mood } from '../types';
import { TRIGGERS, ACTIVITIES } from '../constants';
import { analyzeEntry } from '../services/geminiService';
import Modal from './ui/Modal';
import Button from './ui/Button';
import Spinner from './ui/Spinner';

interface JournalEntryFormProps {
  isOpen: boolean;
  onClose: () => void;
  addEntry: (entry: JournalEntry) => void;
}

const JournalEntryForm: React.FC<JournalEntryFormProps> = ({ isOpen, onClose, addEntry }) => {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<Mood>(3);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckboxChange = (id: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    setList(
      list.includes(id) ? list.filter(item => item !== id) : [...list, id]
    );
  };

  const resetForm = () => {
    setContent('');
    setMood(3);
    setSelectedTriggers([]);
    setSelectedActivities([]);
    setError(null);
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) {
      setError('Пожалуйста, опишите свой день.');
      return;
    }
    setError(null);
    setIsLoading(true);

    const aiAnalysis = await analyzeEntry(content);
    
    const newEntry: JournalEntry = {
      id: new Date().toISOString(),
      date: new Date().toISOString(),
      content,
      mood,
      triggers: selectedTriggers,
      activities: selectedActivities,
      aiAnalysis,
      psychologistNote: null,
    };

    addEntry(newEntry);
    setIsLoading(false);
    resetForm();
    onClose();
  };
  
  const moodOptions: { value: Mood; label: string; color: string }[] = [
      { value: 1, label: 'Ужасно', color: 'bg-red-500'},
      { value: 2, label: 'Плохо', color: 'bg-orange-500'},
      { value: 3, label: 'Нормально', color: 'bg-yellow-500'},
      { value: 4, label: 'Хорошо', color: 'bg-blue-500'},
      { value: 5, label: 'Отлично', color: 'bg-green-500'},
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Новая запись в дневнике">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-brand-text-primary mb-1">
            Как прошел ваш день?
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary"
            placeholder="Опишите свои мысли, чувства и события..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-text-primary mb-2">Оцените ваше настроение</label>
          <div className="flex justify-between items-center">
             {moodOptions.map(opt => (
                <div key={opt.value} className="text-center">
                    <button type="button" onClick={() => setMood(opt.value)}
                    className={`w-10 h-10 rounded-full ${opt.color} transition-transform duration-200 ${mood === opt.value ? 'ring-2 ring-offset-2 ring-brand-primary scale-110' : 'hover:scale-110'}`}></button>
                    <span className={`mt-2 text-xs block ${mood === opt.value ? 'font-bold text-brand-primary' : 'text-brand-text-secondary'}`}>{opt.label}</span>
                </div>
             ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-brand-text-primary mb-2">Что повлияло на настроение? (Триггеры)</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {TRIGGERS.map(trigger => (
              <label key={trigger.id} className="flex items-center space-x-2 p-2 border rounded-md cursor-pointer hover:bg-gray-50 has-[:checked]:bg-indigo-50 has-[:checked]:border-brand-primary">
                <input type="checkbox" checked={selectedTriggers.includes(trigger.id)} onChange={() => handleCheckboxChange(trigger.id, selectedTriggers, setSelectedTriggers)} className="form-checkbox h-4 w-4 text-brand-primary rounded" />
                <span className="text-sm">{trigger.icon} {trigger.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-brand-text-primary mb-2">Чем вы занимались сегодня? (Активности)</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {ACTIVITIES.map(activity => (
              <label key={activity.id} className="flex items-center space-x-2 p-2 border rounded-md cursor-pointer hover:bg-gray-50 has-[:checked]:bg-emerald-50 has-[:checked]:border-brand-secondary">
                <input type="checkbox" checked={selectedActivities.includes(activity.id)} onChange={() => handleCheckboxChange(activity.id, selectedActivities, setSelectedActivities)} className="form-checkbox h-4 w-4 text-brand-secondary rounded"/>
                <span className="text-sm">{activity.icon} {activity.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>
            Отмена
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Spinner className="mr-2"/> : null}
            {isLoading ? 'Анализ...' : 'Сохранить и проанализировать'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default JournalEntryForm;