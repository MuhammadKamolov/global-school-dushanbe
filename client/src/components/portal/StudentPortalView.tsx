import { useState } from 'react';
import { 
  Trophy, 
  TrendingUp, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Lock, 
  ShieldCheck, 
  ChevronRight,
  Plus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { TabType } from '../../types';

interface XPRecord {
  id: number;
  activity: string;
  category: string;
  points: number;
  date: string;
}

interface StudentSubmission {
  id: number;
  title: string;
  category: string;
  status: 'published' | 'review' | 'draft';
  submittedDate: string;
}

const mockXPHistory: XPRecord[] = [
  { id: 1, activity: 'IELTS Mock Exam #3 (Overall Band 8.0)', category: 'Академический тест', points: 280, date: '04 ноября 2026' },
  { id: 2, activity: 'Статья в The Global Pulse: «Солнечная станция»', category: 'Публикация', points: 80, date: '28 октября 2026' },
  { id: 3, activity: 'Городской дебатный турнир (1-е место)', category: 'Внеурочная деятельность', points: 200, date: '14 октября 2026' },
  { id: 4, activity: 'Академическая успеваемость за I четверть (GPA 4.9)', category: 'Учёба', points: 150, date: '10 октября 2026' },
];

const mockSubmissions: StudentSubmission[] = [
  { id: 101, title: 'Как наши ученики собрали солнечную станцию для кампуса', category: 'Наука', status: 'published', submittedDate: '26 октября' },
  { id: 102, title: 'Подготовка к секции Writing: опыт сдачи Mock-теста', category: 'Наука', status: 'review', submittedDate: '07 ноября' },
];

interface StudentPortalViewProps {
  onNavigate: (tab: TabType) => void;
}

export const StudentPortalView = ({ onNavigate }: StudentPortalViewProps) => {
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'submissions'>('overview');

  // Route Guard: если пользователь не залогинен
  if (!isAuthenticated || !user) {
    return (
      <div className="py-20 sm:py-28 bg-slate-50 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center">
          <div className="w-16 h-16 bg-blue-50 text-school-navy rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={28} aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-black text-school-navy tracking-tight mb-2">
            Доступ ограничен
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
            Личный кабинет доступен только авторизованным учащимся Global School. Войдите, используя школьный логин и пароль.
          </p>
          <button
            type="button"
            onClick={openAuthModal}
            className="w-full py-3.5 bg-school-navy hover:bg-school-navy-dark text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
          >
            Войти в портал
          </button>
        </div>
      </div>
    );
  }

  // Расчет прогресса до целевого балла IELTS 8.5
  const targetScore = 8.5;
  const currentScore = user.ieltsScore || 7.5;
  const scorePercent = Math.min(100, Math.round((currentScore / 9.0) * 100));

  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 1. Верхняя визитка ученика */}
        <div className="bg-school-navy text-white rounded-3xl p-6 sm:p-10 mb-8 relative overflow-hidden shadow-xl">
          <div 
            aria-hidden="true" 
            className="absolute top-0 right-0 w-80 h-80 bg-school-ice/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" 
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xl sm:text-2xl font-black flex items-center justify-center shadow-inner">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                  <ShieldCheck size={12} aria-hidden="true" />
                  <span>Ученик подтверждён</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{user.name}</h1>
                <p className="text-xs sm:text-sm text-slate-300">
                  Класс: <strong className="text-white">{user.grade}</strong> • Личный ID: GS-2026-0{user.id}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-center">
                <span className="block text-[10px] uppercase font-bold text-school-ice">Текущий рейтинг</span>
                <span className="text-lg font-black">2-е место</span>
              </div>
              <div className="px-4 py-2.5 rounded-xl bg-school-terracotta text-center text-white shadow-md">
                <span className="block text-[10px] uppercase font-bold text-orange-200">Грант IELTS</span>
                <span className="text-lg font-black">100% покрытие</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Сетка ключевых показателей (KPI Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Показатель 1: IELTS прогресс */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">IELTS Mock Score</span>
                <span className="text-xs font-bold text-school-terracotta">Цель: {targetScore}</span>
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-3xl font-black text-school-navy">{currentScore}</span>
                <span className="text-xs text-slate-400 font-semibold">из 9.0 баллов</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full bg-school-navy rounded-full transition-all duration-500" 
                  style={{ width: `${scorePercent}%` }} 
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Следующий пробный экзамен в кампусе: <strong>21 ноября</strong>
            </p>
          </div>

          {/* Показатель 2: Баллы XP */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Академические очки</span>
                <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
                  <Sparkles size={16} aria-hidden="true" />
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-black text-school-navy">{user.points || 880}</span>
                <span className="text-xs font-bold text-amber-600">XP</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                До 1-го места в общем зачёте осталось <strong>60 XP</strong>.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('leaderboard')}
              className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-school-navy hover:text-school-terracotta flex items-center justify-between cursor-pointer transition-colors"
            >
              <span>Посмотреть общую таблицу лидеров</span>
              <ChevronRight size={14} aria-hidden="true" />
            </button>
          </div>

          {/* Показатель 3: Выборы и голос */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Выборы президента</span>
                <div className="p-1.5 bg-blue-50 text-school-navy rounded-lg">
                  <Trophy size={16} aria-hidden="true" />
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={20} className="text-emerald-600" aria-hidden="true" />
                <span className="text-sm font-bold text-school-navy">Голос зафиксирован</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Вы приняли участие в голосовании ученического совета. Итоги выборов будут подведены в пятницу.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('elections')}
              className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-school-navy hover:text-school-terracotta flex items-center justify-between cursor-pointer transition-colors"
            >
              <span>Текущие результаты гонки</span>
              <ChevronRight size={14} aria-hidden="true" />
            </button>
          </div>

        </div>

        {/* 3. Переключатель разделов кабинета */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-3 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'border-school-terracotta text-school-navy'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            История начисления XP
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('submissions')}
            className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'submissions'
                ? 'border-school-terracotta text-school-navy'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            Мои статьи в газету ({mockSubmissions.length})
          </button>
        </div>

        {/* 4. Контент вкладок */}
        {activeTab === 'overview' ? (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Событие и основание начисления
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Баллы
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {mockXPHistory.map((record) => (
                <div key={record.id} className="p-5 sm:px-6 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2 rounded-xl bg-blue-50 text-school-navy mt-0.5">
                      <TrendingUp size={16} aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-school-navy">{record.activity}</h4>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                        <span className="font-semibold text-slate-600">{record.category}</span>
                        <span>•</span>
                        <span>{record.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm sm:text-base font-black text-emerald-600">
                      +{record.points} XP
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-slate-500">
                Материалы, переданные в редакционную коллегию школьной газеты The Global Pulse.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('newspaper')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-school-navy text-white text-[11px] font-bold uppercase rounded-lg hover:bg-school-navy-dark transition-colors cursor-pointer"
              >
                <Plus size={13} aria-hidden="true" />
                <span>Написать материал</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100 overflow-hidden">
              {mockSubmissions.map((sub) => (
                <div key={sub.id} className="p-5 sm:px-6 flex items-center justify-between">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2 rounded-xl bg-slate-100 text-slate-600 mt-0.5">
                      <FileText size={16} aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-school-navy">{sub.title}</h4>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                        <span className="font-semibold text-slate-600">Рубрика: {sub.category}</span>
                        <span>•</span>
                        <span>Подано: {sub.submittedDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    {sub.status === 'published' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase">
                        <CheckCircle2 size={12} aria-hidden="true" />
                        <span>Опубликовано (+80 XP)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold uppercase">
                        <Clock size={12} aria-hidden="true" />
                        <span>На проверке куратором</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};