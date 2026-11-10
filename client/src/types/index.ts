export type TabType = 
  | 'home' 
  | 'about' 
  | 'education' 
  | 'admissions' 
  | 'newspaper' 
  | 'leaderboard' 
  | 'elections' 
  | 'student-portal' 
  | 'admin-portal';

export interface StudentLeader {
  id: number;
  name: string;
  grade: string;
  ieltsScore: number;
  points: number;
  avatarText: string;
}

export interface Article {
  id: number;
  title: string;
  category: 'Наука' | 'Культура' | 'Спорт' | 'Интервью';
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string; 
}

export interface Candidate {
  id: number;
  name: string;
  grade: string;
  motto: string;
  votesPercent: number;
  avatarText: string;
}