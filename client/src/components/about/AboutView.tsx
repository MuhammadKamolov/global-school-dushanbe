import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Building 
} from 'lucide-react';
import type { TabType } from '../../types';

interface FacultyMember {
  id: number;
  name: string;
  role: string;
  degree: string;
  certifications: string[];
  experience: string;
  avatarText: string;
}

interface CampusFacility {
  id: number;
  title: string;
  description: string;
  tag: string;
  imageUrl: string;
}

const facultyList: FacultyMember[] = [
  {
    id: 1,
    name: 'Д-р Алистер Вэнс',
    role: 'Академический директор',
    degree: 'PhD in Educational Leadership, University of Cambridge',
    certifications: ['IB Senior Examiner', 'Delta Cambridge'],
    experience: '18 лет в международных школах Европы и Азии',
    avatarText: 'АВ',
  },
  {
    id: 2,
    name: 'Шахноза Исмоилова',
    role: 'Руководитель направления STEM и точных наук',
    degree: 'Магистр прикладной математики (МГУ / Бристоль)',
    certifications: ['Олимпиадный тренер РТ', 'STEM Pedagogy Certificate'],
    experience: '12 лет подготовки призёров республиканских олимпиад',
    avatarText: 'ШИ',
  },
  {
    id: 3,
    name: 'Дэвид Миллер',
    role: 'Координатор программы IELTS & Academic English',
    degree: 'MA Applied Linguistics, University of Edinburgh',
    certifications: ['Official IELTS Examiner', 'CELTA Trainer'],
    experience: '14 лет подготовки к экзаменам Band 7.5–9.0',
    avatarText: 'ДМ',
  },
  {
    id: 4,
    name: 'Фарход Раҳимов',
    role: 'Куратор лаборатории робототехники и IT',
    degree: 'BSc Computer Science, KAIST',
    certifications: ['Arduino Master Certified', 'WRO Mentor'],
    experience: '8 лет проектной работы и хакатонов',
    avatarText: 'ФР',
  },
];

const facilities: CampusFacility[] = [
  {
    id: 1,
    title: 'Лаборатории физики и биотехнологий',
    description: 'Оснащены цифровыми микроскопами, спектрометрами и безопасными станциями для практических исследований.',
    tag: 'Science Lab',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Медиацентр и академическая библиотека',
    description: 'Более 6 000 изданий на английском, таджикском и русском языках, а также доступ к онлайн-базам JSTOR.',
    tag: 'Media Library',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Крытый спортивный комплекс',
    description: 'Мультифункциональный зал для баскетбола, волейбола и гимнастики с профессиональным амортизирующим паркетом.',
    tag: 'Athletics',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
  },
];

interface AboutViewProps {
  onNavigate: (tab: TabType) => void;
  onOpenModal: () => void;
}

export const AboutView = ({ onNavigate, onOpenModal }: AboutViewProps) => {
  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Презентационный баннер */}
        <div className="bg-school-navy text-white rounded-3xl p-8 sm:p-12 mb-12 relative overflow-hidden shadow-xl">
          <div 
            aria-hidden="true" 
            className="absolute top-0 right-0 w-96 h-96 bg-school-ice/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" 
          />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-school-ice text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
              <ShieldCheck size={14} aria-hidden="true" />
              <span>Лицензия Министерства образования и науки РТ</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
              Академические традиции и международный кругозор
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              Global School создана как пространство, где академическая строгость соединяется 
              с живым исследовательским интересом. Мы готовим выпускников, способных свободно конкурировать 
              за гранты в лучших университетах мира.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onOpenModal}
                className="inline-flex items-center gap-2 px-5 py-3 bg-school-terracotta hover:bg-school-terracotta-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
              >
                <span>Записаться на день открытых дверей</span>
                <ArrowRight size={14} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('education')}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-white/20 cursor-pointer"
              >
                <span>Учебные планы</span>
              </button>
            </div>
          </div>
        </div>

        {/* Ключевые метрики доверия */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs text-center">
            <span className="text-3xl sm:text-4xl font-black text-school-navy block mb-1">1 : 8</span>
            <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Соотношение</span>
            <span className="text-[11px] text-slate-400 mt-1 block">Преподавателей к ученикам</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs text-center">
            <span className="text-3xl sm:text-4xl font-black text-school-terracotta block mb-1">7.8</span>
            <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Средний балл IELTS</span>
            <span className="text-[11px] text-slate-400 mt-1 block">Выпускной класс 2025–2026</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs text-center">
            <span className="text-3xl sm:text-4xl font-black text-school-navy block mb-1">100%</span>
            <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Поступление</span>
            <span className="text-[11px] text-slate-400 mt-1 block">В аккредитованные вузы мира</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs text-center">
            <span className="text-3xl sm:text-4xl font-black text-emerald-600 block mb-1">16+</span>
            <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Спецкурсов и секций</span>
            <span className="text-[11px] text-slate-400 mt-1 block">Включены в полный день</span>
          </div>
        </div>

        {/* Секция: Преподавательский состав */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold tracking-widest text-school-terracotta uppercase">
                Экспертиза
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-school-navy tracking-tight mt-1">
                Преподаватели и академические наставники
              </h2>
            </div>
            <p className="mt-2 sm:mt-0 text-xs sm:text-sm text-slate-500 max-w-md">
              Международные экзаменаторы, авторы исследовательских программ и сертифицированные тренеры Cambridge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facultyList.map((teacher) => (
              <div 
                key={teacher.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-school-navy text-white text-base font-black flex items-center justify-center mb-4 shadow-xs">
                    {teacher.avatarText}
                  </div>
                  <h3 className="text-base font-bold text-school-navy mb-0.5">
                    {teacher.name}
                  </h3>
                  <span className="text-xs font-semibold text-school-terracotta block mb-3">
                    {teacher.role}
                  </span>
                  
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {teacher.degree}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    {teacher.certifications.map((cert) => (
                      <div key={cert} className="flex items-center gap-1.5 text-[11px] text-slate-500">
                        <CheckCircle2 size={13} className="text-emerald-600 shrink-0" aria-hidden="true" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] font-medium text-slate-400">
                  Опыт: {teacher.experience}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Секция: Инфраструктура кампуса */}
        <div className="mb-16">
          <div className="mb-8">
            <span className="text-xs font-bold tracking-widest text-school-terracotta uppercase">
              Среда
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-school-navy tracking-tight mt-1">
              Пространство кампуса в Душанбе
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {facilities.map((facility) => (
              <div
                key={facility.id}
                className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs group"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  <img
                    src={facility.imageUrl}
                    alt={facility.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-school-navy shadow-xs">
                    {facility.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-base font-bold text-school-navy mb-2">
                    {facility.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Академическая аккредитация */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 text-school-navy rounded-2xl shrink-0">
              <Building size={24} aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-school-navy mb-1">
                Государственные и международные регламенты
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
                Школа осуществляет образовательную деятельность на основании лицензии Министерства образования и науки 
                Республики Таджикистан. Выпускники получают официальный государственный аттестат о среднем общем образовании, 
                а также международный сертификат языковой компетенции IELTS.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenModal}
            className="w-full md:w-auto px-6 py-3 bg-school-navy hover:bg-school-navy-dark text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shrink-0"
          >
            Запросить документы
          </button>
        </div>

      </div>
    </div>
  );
};