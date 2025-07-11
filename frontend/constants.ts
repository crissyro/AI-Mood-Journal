
import type { Trigger, Activity, JournalEntry, Emotion, Mood } from './types';
import { Role } from './types';

export const TRIGGERS: Trigger[] = [
  { id: 'work', label: 'Работа', icon: '💼' },
  { id: 'family', label: 'Семья', icon: '👨‍👩‍👧‍👦' },
  { id: 'relationships', label: 'Отношения', icon: '❤️' },
  { id: 'health', label: 'Здоровье', icon: '💪' },
  { id: 'finance', label: 'Финансы', icon: '💰' },
  { id: 'stress', label: 'Стресс', icon: '🤯' },
  { id: 'hobby', label: 'Хобби', icon: '🎨' },
  { id: 'weather', label: 'Погода', icon: '🌦️' },
];

export const ACTIVITIES: Activity[] = [
  { id: 'sleep', label: 'Сон', icon: '😴' },
  { id: 'exercise', label: 'Спорт', icon: '🏃' },
  { id: 'meditation', label: 'Медитация', icon: '🧘' },
  { id: 'social', label: 'Общение', icon: '🗣️' },
  { id: 'work_task', label: 'Рабочая задача', icon: '📝' },
  { id: 'relax', label: 'Отдых', icon: '🛀' },
  { id: 'reading', label: 'Чтение', icon: '📚' },
  { id: 'gaming', label: 'Игры', icon: '🎮' },
];

export const EMOTIONS: Emotion[] = ['joy', 'sadness', 'anger', 'fear', 'surprise', 'disgust', 'neutral'];

export const MOOD_COLORS: { [key in Mood]: string } = {
  1: 'bg-red-500',
  2: 'bg-orange-500',
  3: 'bg-yellow-500',
  4: 'bg-blue-500',
  5: 'bg-green-500',
};

export const EMOTION_COLORS: { [key in Emotion]: string } = {
  joy: 'bg-green-100 text-green-800',
  sadness: 'bg-blue-100 text-blue-800',
  anger: 'bg-red-100 text-red-800',
  fear: 'bg-purple-100 text-purple-800',
  surprise: 'bg-yellow-100 text-yellow-800',
  disgust: 'bg-orange-100 text-orange-800',
  neutral: 'bg-gray-100 text-gray-800',
};

export const INITIAL_ENTRIES: JournalEntry[] = [
  {
    id: '1',
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    content: "Сегодня был довольно напряженный день на работе. Много задач и дедлайнов. Чувствую себя вымотанным, но справился со всем. Вечером посмотрел фильм, чтобы расслабиться.",
    mood: 3,
    triggers: ['work', 'stress'],
    activities: ['work_task', 'relax'],
    aiAnalysis: {
      emotion: 'neutral',
      summary: "Пользователь описывает напряженный рабочий день, который завершился отдыхом.",
    },
    psychologistNote: "Важно находить время для отдыха после стрессовых дней. Хорошо, что вы смогли расслабиться вечером."
  },
  {
    id: '2',
    date: new Date(Date.now() - 86400000).toISOString(),
    content: "Провел отличный день с друзьями на природе. Погода была замечательная, много смеялись и общались. Это именно то, что мне было нужно. Зарядился позитивом на всю неделю.",
    mood: 5,
    triggers: ['relationships', 'weather'],
    activities: ['social', 'exercise'],
    aiAnalysis: {
      emotion: 'joy',
      summary: "Пользователь с удовольствием провел время с друзьями на природе, что значительно улучшило его настроение.",
    },
    psychologistNote: null
  },
];