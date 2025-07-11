
export enum Role {
  USER = 'user',
  PSYCHOLOGIST = 'psychologist',
}

export type Mood = 1 | 2 | 3 | 4 | 5;

export type Emotion = 'joy' | 'sadness' | 'anger' | 'fear' | 'surprise' | 'disgust' | 'neutral';

export interface Trigger {
  id: string;
  label: string;
  icon: string;
}

export interface Activity {
  id: string;
  label: string;
  icon: string;
}

export interface AIAnalysis {
  emotion: Emotion;
  summary: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: Mood;
  triggers: string[];
  activities: string[];
  aiAnalysis: AIAnalysis | null;
  psychologistNote: string | null;
}