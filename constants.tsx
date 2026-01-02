
import React from 'react';
import { Course, Exam } from './types';

export const IUA_COURSES: Course[] = [
  { id: '1', name: 'Droit Civil', code: 'DRT101', department: 'Droit', icon: '⚖️' },
  { id: '2', name: 'Macroéconomie', code: 'ECO201', department: 'Gestion', icon: '📈' },
  { id: '3', name: 'Comptabilité Analytique', code: 'MGT305', department: 'Gestion', icon: '📋' },
  { id: '4', name: 'Mathématiques Appliquées', code: 'MTH110', department: 'Sciences', icon: '🔢' },
  { id: '5', name: 'Anglais des Affaires', code: 'ANG210', department: 'Langues', icon: '🌐' },
];

export const UPCOMING_EXAMS: Exam[] = [
  { id: 'e1', courseId: '1', date: '2024-06-15', time: '08:30', room: 'Amphi A', priority: 'high' },
  { id: 'e2', courseId: '2', date: '2024-06-17', time: '14:00', room: 'Salle 12', priority: 'medium' },
  { id: 'e3', courseId: '3', date: '2024-06-20', time: '09:00', room: 'Amphi B', priority: 'high' },
];

export const THEME_COLORS = {
  primary: '#1E40AF', // Deep IUA Blue
  secondary: '#F97316', // IUA Orange
  accent: '#3B82F6',
};
