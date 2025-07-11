
import React from 'react';
import type { Role } from '../types';
import Button from './ui/Button';

interface HeaderProps {
  role: Role;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ role, onLogout }) => {
  const roleText = role === 'user' ? 'Пользователь' : 'Психолог';
  return (
    <header className="bg-brand-surface shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-bold text-brand-primary">AI Mood Journal</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-brand-text-secondary">
              Роль: <span className="font-bold text-brand-text-primary">{roleText}</span>
            </span>
            <Button onClick={onLogout} variant="secondary" className="px-3 py-1.5 text-xs">
              Сменить роль
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;