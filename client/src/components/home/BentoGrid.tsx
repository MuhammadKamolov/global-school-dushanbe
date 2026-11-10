import { Trophy, Newspaper, Vote, ArrowRight, Clock } from 'lucide-react';
import type { TabType } from '../../types';
import { topStudents, mockArticles, mockCandidates } from '../../data/mockData';

interface BentoGridProps {
  onNavigate: (tab: TabType) => void;
}

export const BentoGrid = ({ onNavigate }: BentoGridProps) => {
  // Берем строго Топ-3 для превью на главной странице
  const previewTopStudents = topStudents.slice(0, 3);

  return (
    <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Заголовок секции */}
        <div className="mb-8 text-center sm:text-left">
          <span className="text-xs font-bold tracking-widest text-school-terracotta uppercase">
            Школьная жизнь
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-school-navy tracking-tight mt-1">
            Global School в движении
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 max-w-xl">
            Академические достижения, авторские материалы учеников и честное школьное самоуправление.
          </p>
        </div>

        {/* Сетка Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* ================= КАРТОЧКА 1: ГОНКА ЗА IELTS ================= */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2.5 text-school-navy">
                  <div className="p-2 bg-blue-50 text-school-navy rounded-lg">
                    <Trophy size={17} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold leading-none">Гонка за IELTS</h3>
                    <span className="text-[10px] text-slate-400">Топ-3 месяца</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200/60 uppercase">
                  ● Live
                </span>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Официальный экзамен IELTS — полностью за счёт школы для лидеров рейтинга.
              </p>

              {/* Выводим строго 3 учеников */}
              <div className="space-y-2.5">
                {previewTopStudents.map((student, idx) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-slate-200 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-4 text-center text-xs font-black ${
                        idx === 0 ? 'text-amber-500' : idx === 1 ? 'text-slate-400' : 'text-amber-700'
                      }`}>
                        {idx + 1}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-school-navy text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {student.avatarText}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-school-navy">{student.name}</div>
                        <div className="text-[10px] text-slate-400">{student.grade} • {student.points} XP</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black text-school-navy">{student.ieltsScore}</span>
                      <span className="block text-[8px] uppercase tracking-wider font-semibold text-slate-400">IELTS</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-400">Обновляется еженедельно</span>
              <button
                type="button"
                onClick={() => onNavigate('leaderboard')}
                className="inline-flex items-center gap-1 font-bold text-school-navy hover:text-school-terracotta transition-colors cursor-pointer text-xs"
              >
                <span>Весь рейтинг</span>
                <ArrowRight size={12} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* ================= КАРТОЧКА 2: ШКОЛЬНАЯ ГАЗЕТА ================= */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2.5 text-school-navy">
                  <div className="p-2 bg-blue-50 text-school-navy rounded-lg">
                    <Newspaper size={17} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold leading-none">The Global Pulse</h3>
                    <span className="text-[10px] text-slate-400">Школьная газета</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Репортажи из лабораторий, интервью и клубные новости от учащихся.
              </p>

              {/* 3 статьи */}
              <div className="space-y-3">
                {mockArticles.slice(0, 3).map((article) => (
                  <div
                    key={article.id}
                    onClick={() => onNavigate('newspaper')}
                    className="group cursor-pointer pb-2.5 border-b border-slate-100 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between text-[10px] mb-0.5">
                      <span className="font-bold text-school-terracotta uppercase tracking-wider">
                        {article.category}
                      </span>
                      <div className="flex items-center gap-1 text-slate-400">
                        <Clock size={10} aria-hidden="true" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <h4 className="text-xs font-bold text-school-navy group-hover:text-school-terracotta transition-colors line-clamp-1">
                      {article.title}
                    </h4>
                    <div className="text-[10px] text-slate-400 mt-0.5 flex items-center justify-between">
                      <span>{article.author}</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-400">Пишут сами ученики</span>
              <button
                type="button"
                onClick={() => onNavigate('newspaper')}
                className="inline-flex items-center gap-1 font-bold text-school-navy hover:text-school-terracotta transition-colors cursor-pointer text-xs"
              >
                <span>Все статьи</span>
                <ArrowRight size={12} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* ================= КАРТОЧКА 3: ВЫБОРЫ ПРЕЗИДЕНТА ================= */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2.5 text-school-navy">
                  <div className="p-2 bg-blue-50 text-school-navy rounded-lg">
                    <Vote size={17} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold leading-none">Выборы президента</h3>
                    <span className="text-[10px] text-slate-400">Самоуправление</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 uppercase">
                  342 голоса
                </span>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Голосование школьного совета: 1 подтвержденный ученик = 1 голос.
              </p>

              {/* Кандидаты */}
              <div className="space-y-3">
                {mockCandidates.map((candidate) => (
                  <div key={candidate.id} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[9px] font-bold flex items-center justify-center">
                          {candidate.avatarText}
                        </div>
                        <span className="font-bold text-school-navy text-xs">{candidate.name}</span>
                      </div>
                      <span className="font-black text-school-navy text-xs">{candidate.votesPercent}%</span>
                    </div>

                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-school-navy rounded-full transition-all duration-500"
                        style={{ width: `${candidate.votesPercent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-400">Тайное голосование</span>
              <button
                type="button"
                onClick={() => onNavigate('elections')}
                className="inline-flex items-center gap-1 font-bold text-school-navy hover:text-school-terracotta transition-colors cursor-pointer text-xs"
              >
                <span>Кандидаты</span>
                <ArrowRight size={12} aria-hidden="true" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};