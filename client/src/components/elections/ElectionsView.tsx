import { useState } from 'react';
import { Vote, CheckCircle2, ShieldCheck, Users, Flame, Lock } from 'lucide-react';
import type { Candidate } from '../../types';
import { mockCandidates } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

interface ExtendedCandidate extends Candidate {
  bio: string;
  initiatives: string[];
}

const detailedCandidates: ExtendedCandidate[] = [
  {
    ...mockCandidates[0],
    bio: 'Капитан школьной команды по дебатам, призер городских олимпиад по обществознанию.',
    initiatives: [
      'Открытие коворкинга с бесплатным чаем и зоной для тихой самоподготовки к IELTS',
      'Публичный ежемесячный отчет о расходах бюджета школьного совета',
      'Еженедельные пятничные турниры по шахматам и настольным играм',
    ],
  },
  {
    ...mockCandidates[1],
    bio: 'Главный редактор The Global Pulse, куратор эко-клуба и соревнований по робототехнике.',
    initiatives: [
      'Сокращение бумажного документооборота и замена части тестов на мини-проекты',
      'Установка вендинговых автоматов со здоровым перекусом на 2 и 3 этажах',
      'Школьный радиоподкаст с приглашением зарубежных спикеров и выпускников',
    ],
  },
  {
    ...mockCandidates[2],
    bio: 'Организатор межшкольного хакатона Global Tech, капитан баскетбольной сборной.',
    initiatives: [
      'Оснащение лаборатории современными платами Arduino и 3D-принтером',
      'Спортивная лига старшеклассников с кубком по футболу и волейболу',
      'Дни самоуправления раз в четверть с реальным ведением уроков учениками',
    ],
  },
];

export const ElectionsView = () => {
  const { user, isAuthenticated, openAuthModal } = useAuth();

  const [candidatesList, setCandidatesList] = useState<ExtendedCandidate[]>(detailedCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<ExtendedCandidate | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [votedCandidateId, setVotedCandidateId] = useState<number | null>(null);

  const totalVotesCount = 342;

  const handleConfirmVote = () => {
    if (!selectedCandidate || !user) return;

    setCandidatesList((prev) =>
      prev.map((c) =>
        c.id === selectedCandidate.id
          ? { ...c, votesPercent: Math.min(100, c.votesPercent + 1) }
          : c
      )
    );

    setVotedCandidateId(selectedCandidate.id);
    setHasVoted(true);
    setSelectedCandidate(null);
  };

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Баннер выборов */}
        <div className="bg-school-navy text-white rounded-3xl p-8 sm:p-12 mb-10 relative overflow-hidden shadow-xl">
          <div 
            aria-hidden="true" 
            className="absolute top-0 right-0 w-96 h-96 bg-school-ice/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" 
          />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-school-ice text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
              <Vote size={14} aria-hidden="true" />
              <span>Школьное самоуправление 2026–2027</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
              Выборы президента школы
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              Голосование за лидера ученического совета. Президент представляет интересы учащихся 
              на педсоветах и распоряжается бюджетом школьных инициатив.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-school-ice">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <Users size={14} aria-hidden="true" />
                <span>Всего проголосовало: {hasVoted ? totalVotesCount + 1 : totalVotesCount}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <ShieldCheck size={14} aria-hidden="true" />
                <span>Защита: 1 аккаунт ученика = 1 голос</span>
              </div>
            </div>
          </div>
        </div>

        {/* Уведомление об успешном голосовании */}
        {hasVoted && (
          <div className="mb-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between text-emerald-800 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0" aria-hidden="true" />
              <span>Ваш голос успешно зафиксирован в избирательном протоколе!</span>
            </div>
            <span className="font-bold uppercase tracking-wider text-[11px] bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full">
              Голос учтен
            </span>
          </div>
        )}

        {/* Сетка кандидатов (без временной плашки!) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {candidatesList.map((candidate) => {
            const isWinner = candidate.id === 1;
            const isUserChoice = votedCandidateId === candidate.id;

            return (
              <div
                key={candidate.id}
                className={`bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 border relative ${
                  isUserChoice
                    ? 'border-emerald-500 ring-2 ring-emerald-400 shadow-md'
                    : 'border-slate-200 hover:shadow-lg'
                }`}
              >
                {isWinner && (
                  <div className="absolute -top-3 left-6">
                    <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-school-terracotta text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                      <Flame size={12} aria-hidden="true" />
                      <span>Фаворит гонки</span>
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-school-navy text-white text-base font-black flex items-center justify-center shadow-xs">
                        {candidate.avatarText}
                      </div>
                      <div>
                        <h3 className="font-black text-school-navy text-lg leading-snug">
                          {candidate.name}
                        </h3>
                        <span className="text-xs font-semibold text-slate-400">
                          {candidate.grade}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xl font-black text-school-navy">
                        {candidate.votesPercent}%
                      </span>
                      <span className="block text-[10px] uppercase font-bold text-slate-400">
                        Голосов
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
                    <div
                      className="h-full bg-school-navy rounded-full transition-all duration-500"
                      style={{ width: `${candidate.votesPercent}%` }}
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 mb-6">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1">
                      Главный девиз:
                    </span>
                    <p className="text-xs font-bold text-school-navy italic">
                      «{candidate.motto}»
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    {candidate.bio}
                  </p>

                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-bold uppercase text-slate-700 tracking-wider block">
                      Ключевые инициативы:
                    </span>
                    {candidate.initiatives.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs text-slate-600">
                        <span className="text-school-terracotta font-bold mt-0.5">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Кнопка голосования */}
                <div className="pt-4 border-t border-slate-100">
                  {!isAuthenticated ? (
                    <button
                      type="button"
                      onClick={openAuthModal}
                      className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Lock size={13} aria-hidden="true" />
                      <span>Войти, чтобы голосовать</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={hasVoted}
                      onClick={() => setSelectedCandidate(candidate)}
                      className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        hasVoted
                          ? isUserChoice
                            ? 'bg-emerald-600 text-white cursor-default'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-school-navy hover:bg-school-navy-dark text-white shadow-xs'
                      }`}
                    >
                      {isUserChoice ? 'Вы проголосовали' : hasVoted ? 'Голос уже отдан' : 'Голосовать за кандидата'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Модальное окно подтверждения выбора */}
      {selectedCandidate && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Закрыть окно"
            onClick={() => setSelectedCandidate(null)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs w-full h-full border-none cursor-default"
          />

          <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-blue-50 text-school-navy rounded-full flex items-center justify-center mx-auto mb-3">
                <Vote size={22} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-school-navy">
                Подтверждение голоса
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Вы отдаете голос за кандидата:
              </p>
              <div className="text-base font-black text-school-navy mt-1">
                {selectedCandidate.name} ({selectedCandidate.grade})
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 mb-5">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1">
                Голосует ученик:
              </span>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-school-navy block">{user.name}</span>
                  <span className="text-[11px] text-slate-500">{user.grade} • Ученический совет</span>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  Верифицирован
                </span>
              </div>
            </div>

            <p className="text-[11px] text-amber-900 bg-amber-50 p-3 rounded-xl border border-amber-200/60 leading-relaxed mb-6">
              Голосование анонимное для кандидатов, но фиксируется в школьной системе. Изменить выбор после отправки нельзя.
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className="w-1/2 py-2.5 text-xs font-bold uppercase text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={handleConfirmVote}
                className="w-1/2 py-2.5 bg-school-terracotta hover:bg-school-terracotta-hover text-white text-xs font-bold uppercase rounded-xl transition-all shadow-md cursor-pointer"
              >
                Да, отдать голос
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};