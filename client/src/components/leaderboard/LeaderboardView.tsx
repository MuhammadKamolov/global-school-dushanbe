import { useState } from 'react';
import { Trophy, Sparkles, HelpCircle, Check } from 'lucide-react';
import { topStudents } from '../../data/mockData';

type GradeFilter = 'Все' | '11' | '10' | '9';

export const LeaderboardView = () => {
  const [selectedGrade, setSelectedGrade] = useState<GradeFilter>('Все');
  const [showRulesModal, setShowRulesModal] = useState(false);

  // Фильтрация по параллелям классов
  const filteredStudents = selectedGrade === 'Все'
    ? topStudents
    : topStudents.filter((student) => student.grade.startsWith(selectedGrade));

  // Сортировка по очкам (по убыванию)
  const sortedStudents = [...filteredStudents].sort((a, b) => b.points - a.points);

  const topThree = sortedStudents.slice(0, 3);
  const restStudents = sortedStudents.slice(3);

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Баннер грантовой программы */}
        <div className="bg-school-navy text-white rounded-3xl p-8 sm:p-12 mb-10 relative overflow-hidden shadow-xl">
          <div 
            aria-hidden="true" 
            className="absolute top-0 right-0 w-96 h-96 bg-school-ice/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" 
          />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-school-ice text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
              <Trophy size={14} aria-hidden="true" />
              <span>Грантовая инициатива 2026–2027</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
              Академический рейтинг IELTS
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              Тройка лидеров рейтинга по итогам учебного периода получает 100% покрытие 
              стоимости сдачи официального экзамена IELTS в аккредитованном центре Душанбе.
            </p>

            <button
              type="button"
              onClick={() => setShowRulesModal(true)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-white/20 cursor-pointer"
            >
              <HelpCircle size={16} aria-hidden="true" />
              <span>Как начисляются баллы (XP)?</span>
            </button>
          </div>
        </div>

        {/* Фильтры по классам */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            {(['Все', '11', '10', '9'] as GradeFilter[]).map((grade) => (
              <button
                type="button"
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedGrade === grade
                    ? 'bg-school-navy text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {grade === 'Все' ? 'Все классы' : `${grade}-е классы`}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400 font-medium">
            Обновлено: текущая учебная неделя
          </span>
        </div>

        {/* Пьедестал почёта: Топ-3 */}
        {topThree.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 items-end">
            {/* 2 МЕСТО (Серебро) */}
            {topThree[1] && (
              <div className="order-2 md:order-1 bg-white border border-slate-200 rounded-2xl p-6 text-center relative shadow-xs">
                <div className="w-10 h-10 mx-auto -mt-11 mb-3 rounded-full bg-slate-200 border-4 border-white flex items-center justify-center font-black text-slate-600 text-sm shadow-sm">
                  2
                </div>
                <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 text-school-navy text-base font-bold flex items-center justify-center mb-3">
                  {topThree[1].avatarText}
                </div>
                <h3 className="font-bold text-school-navy text-base">{topThree[1].name}</h3>
                <p className="text-xs text-slate-400 mb-3">{topThree[1].grade}</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                  <span>IELTS {topThree[1].ieltsScore}</span>
                  <span>•</span>
                  <span>{topThree[1].points} XP</span>
                </div>
                <span className="mt-3 block text-[10px] font-bold uppercase text-emerald-600">
                  100% грант на экзамен
                </span>
              </div>
            )}

            {/* 1 МЕСТО (Золото) — центральная карточка выше остальных */}
            {topThree[0] && (
              <div className="order-1 md:order-2 bg-gradient-to-b from-amber-500/10 via-white to-white border-2 border-amber-400 rounded-3xl p-8 text-center relative shadow-lg">
                <div className="w-12 h-12 mx-auto -mt-14 mb-3 rounded-full bg-amber-400 border-4 border-white flex items-center justify-center font-black text-amber-950 text-base shadow-md">
                  👑
                </div>
                <div className="w-16 h-16 mx-auto rounded-full bg-school-navy text-white text-lg font-bold flex items-center justify-center mb-3 shadow-sm">
                  {topThree[0].avatarText}
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase mb-2">
                  Лидер рейтинга
                </span>
                <h3 className="font-extrabold text-school-navy text-lg">{topThree[0].name}</h3>
                <p className="text-xs text-slate-400 mb-4">{topThree[0].grade}</p>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-school-navy text-white text-xs font-black shadow-xs">
                  <span>Band {topThree[0].ieltsScore}</span>
                  <span>•</span>
                  <span>{topThree[0].points} XP</span>
                </div>
                <span className="mt-3 block text-xs font-black uppercase text-school-terracotta">
                  ★ 100% грант на экзамен ★
                </span>
              </div>
            )}

            {/* 3 МЕСТО (Бронза) */}
            {topThree[2] && (
              <div className="order-3 md:order-3 bg-white border border-slate-200 rounded-2xl p-6 text-center relative shadow-xs">
                <div className="w-10 h-10 mx-auto -mt-11 mb-3 rounded-full bg-amber-700/20 border-4 border-white flex items-center justify-center font-black text-amber-900 text-sm shadow-sm">
                  3
                </div>
                <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 text-school-navy text-base font-bold flex items-center justify-center mb-3">
                  {topThree[2].avatarText}
                </div>
                <h3 className="font-bold text-school-navy text-base">{topThree[2].name}</h3>
                <p className="text-xs text-slate-400 mb-3">{topThree[2].grade}</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                  <span>IELTS {topThree[2].ieltsScore}</span>
                  <span>•</span>
                  <span>{topThree[2].points} XP</span>
                </div>
                <span className="mt-3 block text-[10px] font-bold uppercase text-emerald-600">
                  100% грант на экзамен
                </span>
              </div>
            )}
          </div>
        )}

        {/* Список остальных участников (Табличный вид) */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Участники в гонке за грант</span>
            <span>Статус и баллы</span>
          </div>

          <div className="divide-y divide-slate-100">
            {restStudents.map((student, idx) => (
              <div
                key={student.id}
                className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="w-6 text-center font-bold text-slate-400 text-sm">
                    {idx + 4}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-slate-100 text-school-navy text-xs font-bold flex items-center justify-center">
                    {student.avatarText}
                  </div>
                  <div>
                    <h4 className="font-bold text-school-navy text-sm">{student.name}</h4>
                    <p className="text-xs text-slate-400">{student.grade}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="block font-black text-school-navy text-sm">
                      {student.points} <span className="text-[10px] font-bold text-slate-400">XP</span>
                    </span>
                    <span className="text-xs font-bold text-slate-500">IELTS {student.ieltsScore}</span>
                  </div>

                  <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
                    Кандидат
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Модальное окно с правилами начисления XP */}
      {showRulesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Закрыть правила"
            onClick={() => setShowRulesModal(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs w-full h-full border-none cursor-default"
          />

          <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                <Sparkles size={22} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-school-navy">Система баллов (XP)</h3>
                <p className="text-xs text-slate-400">Критерии формирования рейтинга</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-slate-600 mb-6">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 text-emerald-600 shrink-0"><Check size={14} /></div>
                <div>
                  <strong className="text-slate-800">Пробные IELTS Mock-тесты:</strong> до +300 XP в зависимости от прогресса Band Score.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 text-emerald-600 shrink-0"><Check size={14} /></div>
                <div>
                  <strong className="text-slate-800">Школьная газета & Исследования:</strong> +80 XP за каждую опубликованную статью в The Global Pulse.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 text-emerald-600 shrink-0"><Check size={14} /></div>
                <div>
                  <strong className="text-slate-800">Олимпиады и городские дебаты:</strong> до +200 XP за призовые места от лица школы.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 text-emerald-600 shrink-0"><Check size={14} /></div>
                <div>
                  <strong className="text-slate-800">Академическая успеваемость (GPA):</strong> +150 XP по итогам четверти без троек.
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowRulesModal(false)}
              className="w-full py-3 bg-school-navy hover:bg-school-navy-dark text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Всё понятно
            </button>
          </div>
        </div>
      )}
    </div>
  );
};