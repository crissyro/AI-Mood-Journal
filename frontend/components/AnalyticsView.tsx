
import React, { useMemo } from 'react';
import type { JournalEntry } from '../types';
import { TRIGGERS } from '../constants';
import Card from './ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface AnalyticsViewProps {
  entries: JournalEntry[];
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ entries }) => {

  const moodData = useMemo(() => {
    return entries
      .map(e => ({
        date: new Date(e.date).toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' }),
        mood: e.mood,
      }))
      .sort((a, b) => new Date(entries.find(e => new Date(e.date).toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' }) === a.date)!.date).getTime() - new Date(entries.find(e => new Date(e.date).toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' }) === b.date)!.date).getTime());
  }, [entries]);

  const triggerFrequency = useMemo(() => {
    const counts: { [key: string]: number } = {};
    entries.forEach(entry => {
      entry.triggers.forEach(triggerId => {
        counts[triggerId] = (counts[triggerId] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([id, count]) => ({
        name: TRIGGERS.find(t => t.id === id)?.label || id,
        count: count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [entries]);

  if (entries.length < 2) {
      return (
          <Card>
              <h3 className="text-xl font-semibold mb-2">Недостаточно данных для аналитики</h3>
              <p className="text-brand-text-secondary">Добавьте хотя бы две записи в дневник, чтобы увидеть графики.</p>
          </Card>
      )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <h3 className="text-xl font-semibold mb-4">Динамика настроения</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={moodData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="mood" name="Настроение" stroke="#4f46e5" strokeWidth={2} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
      <Card>
        <h3 className="text-xl font-semibold mb-4">Частота триггеров</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={triggerFrequency} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" width={100} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" name="Количество" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default AnalyticsView;