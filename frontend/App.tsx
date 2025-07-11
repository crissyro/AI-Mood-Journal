
import React, { useState, useCallback } from 'react';
import type { JournalEntry } from './types';
import { Role } from './types';
import { INITIAL_ENTRIES } from './constants';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import UserCircleIcon from './components/icons/UserCircleIcon';
import Button from './components/ui/Button';

const App: React.FC = () => {
  const [role, setRole] = useState<Role | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>(INITIAL_ENTRIES);

  const handleSetRole = (selectedRole: Role) => {
    setRole(selectedRole);
  };

  const handleLogout = () => {
    setRole(null);
  };

  const addEntry = useCallback((entry: JournalEntry) => {
    setEntries(prevEntries => [entry, ...prevEntries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []);

  const updateEntry = useCallback((updatedEntry: JournalEntry) => {
    setEntries(prevEntries => 
      prevEntries.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry)
    );
  }, []);

  const handleExport = () => {
    const dataStr = JSON.stringify({
      userRole: role,
      journalEntries: entries,
    }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'mood_journal_export.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };


  if (!role) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <div className="max-w-md w-full text-center">
            <h1 className="text-4xl font-bold text-brand-primary mb-2">AI Mood Journal</h1>
            <p className="text-lg text-brand-text-secondary mb-8">Ваш личный помощник для отслеживания ментального здоровья.</p>
            <div className="bg-white p-8 rounded-xl shadow-md space-y-6">
                <h2 className="text-2xl font-semibold text-brand-text-primary">Выберите вашу роль</h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={() => handleSetRole(Role.USER)} className="w-full">
                        <UserCircleIcon className="w-6 h-6 mr-2" />
                        Я — Пользователь
                    </Button>
                    <Button onClick={() => handleSetRole(Role.PSYCHOLOGIST)} variant="secondary" className="w-full">
                        <UserCircleIcon className="w-6 h-6 mr-2" />
                        Я — Психолог
                    </Button>
                </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-background">
      <Header role={role} onLogout={handleLogout} />
      <main className="p-4 sm:p-6 lg:p-8">
        <Dashboard 
          role={role}
          entries={entries}
          addEntry={addEntry}
          updateEntry={updateEntry}
          onExport={handleExport}
        />
      </main>
    </div>
  );
};

export default App;