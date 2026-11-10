import type { StudentLeader, Article, Candidate } from '../types';

export const topStudents: StudentLeader[] = [
  { id: 1, name: 'Мадина Раҳимова', grade: '11-«А»', ieltsScore: 8.5, points: 940, avatarText: 'МР' },
  { id: 2, name: 'Алишер Назаров', grade: '11-«Б»', ieltsScore: 8.0, points: 880, avatarText: 'АН' },
  { id: 3, name: 'Сабрина Каримова', grade: '10-«А»', ieltsScore: 7.5, points: 810, avatarText: 'СК' },
  { id: 4, name: 'Далер Шарипов', grade: '11-«А»', ieltsScore: 7.5, points: 760, avatarText: 'ДШ' },
  { id: 5, name: 'Фаррух Умаров', grade: '10-«Б»', ieltsScore: 7.0, points: 720, avatarText: 'ФУ' },
  { id: 6, name: 'Нилуфар Юсупова', grade: '10-«Б»', ieltsScore: 7.0, points: 690, avatarText: 'НЮ' },
  { id: 7, name: 'Анис Саидов', grade: '9-«А»', ieltsScore: 6.5, points: 640, avatarText: 'АС' },
  { id: 8, name: 'Парвина Мирзоева', grade: '9-«Б»', ieltsScore: 6.5, points: 610, avatarText: 'ПМ' },
];

export const mockArticles: Article[] = [
  {
    id: 1,
    title: 'Как наши ученики собрали солнечную станцию для кампуса',
    category: 'Наука',
    excerpt: 'Проект 10-«Б»: расчеты, установка панелей и первая неделя автономной энергии для теплицы.',
    author: 'Амина С.',
    date: '28 октября',
    readTime: '6 мин',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Неделя языков: пять дней, семь языков, один кампус',
    category: 'Культура',
    excerpt: 'Открытые уроки, кухни народов мира и дебаты на английском — итоги главной недели осени.',
    author: 'Тимур Х.',
    date: '21 октября',
    readTime: '4 мин',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Дебатный клуб Global School — первые на городском турнире',
    category: 'Спорт',
    excerpt: 'Наши старшеклассники обошли 14 команд и привезли кубок в Душанбе.',
    author: 'Парвина М.',
    date: '14 октября',
    readTime: '5 мин',
    imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
  },
];

export const mockCandidates: Candidate[] = [
  { id: 1, name: 'Далер Шарипов', grade: '11-«А»', motto: 'Прозрачный бюджет и школьный коворкинг', votesPercent: 43, avatarText: 'ДШ' },
  { id: 2, name: 'Нилуфар Юсупова', grade: '10-«Б»', motto: 'Больше клубов, меньше бумажных тестов', votesPercent: 32, avatarText: 'НЮ' },
  { id: 3, name: 'Рустам Каримов', grade: '11-«Б»', motto: 'Спорт и регулярные хакатоны', votesPercent: 25, avatarText: 'РК' },
];