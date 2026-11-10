import { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Globe, 
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import type { TabType } from '../../types';

type StageTab = 'kindergarten' | 'primary' | 'middle' | 'high';

interface StageContent {
  id: StageTab;
  tabLabel: string;
  age: string;
  heroTitle: string;
  heroDescription: string;
  subjects: string[];
  schedule: { time: string; activity: string }[];
  keyOutcomes: string[];
}

const stageData: Record<StageTab, StageContent> = {
  kindergarten: {
    id: 'kindergarten',
    tabLabel: 'Детский сад (3–6 лет)',
    age: '3–6 лет',
    heroTitle: 'Раннее погружение и эмоциональное развитие',
    heroDescription: 'Программа Play & Learn: освоение базовых социальных навыков, мелкой моторики и естественное освоение английского языка через игровые сценарии без стресса.',
    subjects: ['English Communication Lab', 'Сенсорная математика', 'Музыка и ритмика', 'Творческая мастерская', 'Физическое воспитание'],
    schedule: [
      { time: '08:30 – 09:00', activity: 'Встреча детей, утренняя зарядка и завтрак' },
      { time: '09:00 – 11:30', activity: 'Тематические игровые блоки на английском языке' },
      { time: '11:30 – 12:30', activity: 'Прогулка на собственной закрытой парковой площадке' },
      { time: '12:30 – 13:30', activity: 'Сбалансированный горячий обед' },
      { time: '13:30 – 15:00', activity: 'Дневной сон и релаксация' },
      { time: '15:00 – 16:30', activity: 'Полдник, кружки развития и свободная игра' },
    ],
    keyOutcomes: [
      'Свободное восприятие английской речи на слух к первому классу',
      'Развитие эмоционального интеллекта и коммуникации в коллективе',
      'Готовность руки к письму и логическое мышление',
    ],
  },
  primary: {
    id: 'primary',
    tabLabel: 'Начальная школа (1–4)',
    age: '6–10 лет',
    heroTitle: 'Академический фундамент и радость познания',
    heroDescription: 'Сочетание углубленной программы точных наук с международными стандартами начального образования. Учим мыслить критически, а не просто заучивать факты.',
    subjects: ['Cambridge English', 'Олимпиадная математика', 'Естествознание (Science)', 'Таджикский и русский языки', 'Введение в программирование', 'Арт и театр'],
    schedule: [
      { time: '08:30 – 12:45', activity: 'Основные академические уроки по билингвальной сетке' },
      { time: '12:45 – 13:45', activity: 'Обед и активный отдых на свежем воздухе' },
      { time: '13:45 – 15:00', activity: 'Проектная деятельность, лабораторные опыты и чтение' },
      { time: '15:00 – 16:30', activity: 'Самоподготовка с тьютором (без домашних заданий дома) и спорт' },
    ],
    keyOutcomes: [
      'Уверенная беглая речь на английском языке (уровень A2/B1)',
      'Навыки презентации собственных проектных работ перед аудиторией',
      'Выполнение всех домашних заданий в школе под присмотром педагога',
    ],
  },
  middle: {
    id: 'middle',
    tabLabel: 'Среднее звено (5–9)',
    age: '10–15 лет',
    heroTitle: 'Предпрофильные треки и прикладные науки',
    heroDescription: 'Переход к дифференцированному обучению: глубокое погружение в STEM, робототехнику, физику и дебаты. Старт систематической подготовки к сертификатам IELTS.',
    subjects: ['Advanced Math & Алгебра', 'Physics & Chemistry Labs', 'IELTS Foundation', 'Computer Science & Python', 'Всемирная история', 'Дебатный клуб'],
    schedule: [
      { time: '08:30 – 13:30', activity: 'Академический блок: профильные дисциплины и языки' },
      { time: '13:30 – 14:15', activity: 'Обед и общение в коворкинге' },
      { time: '14:15 – 15:30', activity: 'Практикумы в лабораториях и Mock-тесты' },
      { time: '15:30 – 16:30', activity: 'Спортивные сборные, олимпиадные клубы или школьная газета' },
    ],
    keyOutcomes: [
      'Достижение уровня English B2 к окончанию 9 класса',
      'Участие в городских и международных олимпиадах',
      'Осознанный выбор профиля для старшей школы (STEM или Social Sciences)',
    ],
  },
  high: {
    id: 'high',
    tabLabel: 'Старшая школа & IELTS (10–11)',
    age: '15–18 лет',
    heroTitle: 'Целевая подготовка к мировым университетам',
    heroDescription: 'Фокус на сдаче академического экзамена IELTS на Band 7.5–8.5, формирование международного портфолио, написание исследовательских работ и грантовая поддержка.',
    subjects: ['IELTS Masterclass (Academic)', 'Calculus & Higher Math', 'Advanced Physics / Economics', 'Academic Writing & Research', 'College Counseling & Admissions'],
    schedule: [
      { time: '08:30 – 14:00', activity: 'Углубленные профильные пары по выбранному направлению' },
      { time: '14:00 – 14:45', activity: 'Обед' },
      { time: '14:45 – 16:00', activity: 'Семинары IELTS, академическое эссе и консультации по вузам' },
      { time: '16:00 – 17:00', activity: 'Ученический совет, исследовательские проекты и подготовка к олимпиадам' },
    ],
    keyOutcomes: [
      'Сертификат IELTS с баллом 7.5+ и 100% грант на экзамен для лидеров рейтинга',
      'Готовое портфолио эссе и рекомендательных писем для зарубежных вузов',
      'Государственный аттестат с отличием Республики Таджикистан',
    ],
  },
};

interface EducationViewProps {
  onOpenModal: () => void;
  onNavigate: (tab: TabType) => void;
}

export const EducationView = ({ onOpenModal, onNavigate }: EducationViewProps) => {
  const [activeStage, setActiveStage] = useState<StageTab>('high');
  const current = stageData[activeStage];

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Презентационный баннер */}
        <div className="bg-school-navy text-white rounded-3xl p-8 sm:p-12 mb-10 relative overflow-hidden shadow-xl">
          <div 
            aria-hidden="true" 
            className="absolute top-0 right-0 w-96 h-96 bg-school-ice/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" 
          />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-school-ice text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
              <GraduationCap size={14} aria-hidden="true" />
              <span>Академическая система</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
              Образовательные программы
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              Непрерывный образовательный маршрут с 3 до 18 лет. Каждая ступень плавно готовит ребенка 
              к следующему академическому уровню без разрывов в программе.
            </p>

            <button
              type="button"
              onClick={onOpenModal}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-school-terracotta hover:bg-school-terracotta-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
            >
              <span>Подобрать программу для ребенка</span>
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Переключатель ступеней */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {(Object.keys(stageData) as StageTab[]).map((key) => (
            <button
              type="button"
              key={key}
              onClick={() => setActiveStage(key)}
              className={`px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeStage === key
                  ? 'bg-school-navy text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {stageData[key].tabLabel}
            </button>
          ))}
        </div>

        {/* Детальная карточка выбранной ступени */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 mb-12 shadow-xs">
          <div className="max-w-3xl mb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-school-navy text-xs font-bold uppercase mb-3">
              Возрастная категория: {current.age}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-school-navy tracking-tight mb-2">
              {current.heroTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {current.heroDescription}
            </p>
          </div>

          {/* 3 колонки подробностей: Предметы, Расписание, Результаты */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-slate-100">
            
            {/* Блок 1: Предметы */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <BookOpen size={16} className="text-school-navy" aria-hidden="true" />
                <span>Ключевые дисциплины</span>
              </h3>
              <ul className="space-y-2.5">
                {current.subjects.map((sub) => (
                  <li key={sub} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-school-terracotta mt-1.5 shrink-0" />
                    <span className="font-medium">{sub}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Блок 2: Распорядок дня */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <Clock size={16} className="text-school-navy" aria-hidden="true" />
                <span>Распорядок полного дня</span>
              </h3>
              <div className="space-y-3">
                {current.schedule.map((item) => (
                  <div key={item.time} className="text-xs">
                    <span className="font-bold text-school-navy block text-[11px] mb-0.5">
                      {item.time}
                    </span>
                    <span className="text-slate-500 leading-relaxed block">
                      {item.activity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Блок 3: Академические результаты */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <Sparkles size={16} className="text-school-terracotta" aria-hidden="true" />
                <span>Результаты ступени</span>
              </h3>
              <div className="space-y-3">
                {current.keyOutcomes.map((outcome) => (
                  <div key={outcome} className="flex items-start gap-2.5 text-xs text-slate-600 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>

              {activeStage === 'high' && (
                <div className="mt-6 p-4 rounded-2xl bg-school-navy text-white">
                  <span className="text-[10px] font-bold uppercase text-school-ice block mb-1">
                    Грантовая программа
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    Ученики старшей школы участвуют в рейтинге за 100% покрытие стоимости сдачи IELTS.
                  </p>
                  <button
                    type="button"
                    onClick={() => onNavigate('leaderboard')}
                    className="text-xs font-bold text-school-ice hover:text-white underline cursor-pointer"
                  >
                    Посмотреть таблицу лидеров →
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Языковая модель обучения */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xs">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-50 text-school-navy rounded-2xl">
              <Globe size={24} aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-school-navy">Языковая модель Global School</h3>
              <p className="text-xs text-slate-400">Гармоничное развитие трёх языков</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-black text-school-navy text-sm block mb-1">60% — English</span>
              <p className="text-slate-500 leading-relaxed">
                Математика, Science, IT, дебаты и внеурочные мероприятия с носителями языка.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-black text-school-navy text-sm block mb-1">25% — Таджикский язык</span>
              <p className="text-slate-500 leading-relaxed">
                Родной язык, литература и история Таджикистана по государственным стандартам.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-black text-school-navy text-sm block mb-1">15% — Русский язык</span>
              <p className="text-slate-500 leading-relaxed">
                Академическая грамматика, анализ текстов и классическая литература.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};