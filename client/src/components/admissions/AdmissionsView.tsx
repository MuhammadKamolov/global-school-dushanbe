import { useState } from 'react';
import { 
  GraduationCap, 
  HelpCircle, 
  ChevronDown, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

interface AdmissionsViewProps {
  onOpenInquiryModal: () => void;
}

interface StepItem {
  step: string;
  title: string;
  description: string;
}

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const steps: StepItem[] = [
  {
    step: '01',
    title: 'Подача электронной заявки',
    description: 'Заполните онлайн-форму на сайте или свяжитесь с приёмной комиссией школы по телефону/WhatsApp.',
  },
  {
    step: '02',
    title: 'Индивидуальная экскурсия',
    description: 'Визит в кампус: знакомство с учебными классами, научными лабораториями, столовой и преподавательским составом.',
  },
  {
    step: '03',
    title: 'Комплексное тестирование',
    description: 'Оценка уровня владения английским языком, математической логики и собеседование со школьным психологом.',
  },
  {
    step: '04',
    title: 'Заключение договора',
    description: 'Подписание документов, оформление личного дела учащегося и выдача школьного доступа в личный кабинет.',
  },
];

const faqs: FaqItem[] = [
  {
    id: 1,
    question: 'Какой язык обучения является основным?',
    answer: 'Обучение ведется по билингвальной международной программе: ключевые академические дисциплины (математика, естественные науки, IT) преподаются на английском языке с параллельной поддержкой государственных стандартов образования.',
  },
  {
    id: 2,
    question: 'Как распределяются 100% гранты на официальный экзамен IELTS?',
    answer: 'Каждый учебный триместр учащиеся старших классов (9–11) участвуют в академическом рейтинге XP. Тройка лидеров общего зачёта получает полную оплату сдачи сертификационного теста IELTS в официальном тест-центре Душанбе.',
  },
  {
    id: 3,
    question: 'Включено ли питание в распорядок дня?',
    answer: 'Да, в режим полного дня (с 08:30 до 16:30) входит сбалансированное трехразовое горячее питание (завтрак, обед и полдник), приготовленное на собственной кухне школы.',
  },
  {
    id: 4,
    question: 'Какие документы нужны для перевода из другой школы?',
    answer: 'Копия свидетельства о рождении (или паспорта), табель успеваемости за предыдущие годы, медицинская карта формы 026/у и заявление от родителей.',
  },
];

export const AdmissionsView = ({ onOpenInquiryModal }: AdmissionsViewProps) => {
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenFaqId(prev => (prev === id ? null : id));
  };

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Главный промо-баннер */}
        <div className="bg-school-navy text-white rounded-3xl p-8 sm:p-12 mb-12 relative overflow-hidden shadow-xl">
          <div 
            aria-hidden="true" 
            className="absolute top-0 right-0 w-96 h-96 bg-school-ice/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" 
          />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-school-ice text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
              <GraduationCap size={14} aria-hidden="true" />
              <span>Приёмная кампания 2026–2027</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
              Поступление в Global School
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              Мы формируем сообщество увлеченных исследователей, будущих лидеров и новаторов. 
              Узнайте подробнее об этапах отбора и запишитесь на персональную консультацию.
            </p>

            <button
              type="button"
              onClick={onOpenInquiryModal}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-school-terracotta hover:bg-school-terracotta-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
            >
              <span>Подать заявку на поступление</span>
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Секция: 4 этапа зачисления */}
        <div className="mb-16">
          <div className="mb-8">
            <span className="text-xs font-bold tracking-widest text-school-terracotta uppercase">
              Процедура
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-school-navy tracking-tight mt-1">
              4 простых шага к зачислению
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item) => (
              <div 
                key={item.step} 
                className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-black text-school-ice block mb-3">
                    {item.step}
                  </span>
                  <h3 className="text-base font-bold text-school-navy mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Секция: Что включено в обучение */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 mb-16 shadow-xs">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold tracking-widest text-school-terracotta uppercase">
              Стандарты
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-school-navy tracking-tight mt-1">
              Что входит в программу полного дня
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-800 text-sm mb-1">Билингвальная среда</strong>
                Ежедневная языковая практика с аккредитованными преподавателями и носителями языка.
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-800 text-sm mb-1">Трёхразовое питание</strong>
                Сбалансированный рацион, разработанный с учетом физиологических потребностей детей.
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-800 text-sm mb-1">Спецкурсы & Клубы</strong>
                Робототехника, лабораторные практикумы, дебатный клуб и спортивные секции без доплат.
              </div>
            </div>
          </div>
        </div>

        {/* Секция: Вопросы и ответы (FAQ Accordion) */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-10 h-10 bg-amber-50 text-school-terracotta rounded-xl flex items-center justify-center mx-auto mb-2">
              <HelpCircle size={20} aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-black text-school-navy tracking-tight">
              Часто задаваемые вопросы
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Ответы на ключевые вопросы родителей о поступлении и учёбе.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                  >
                    <span className="text-xs sm:text-sm font-bold text-school-navy">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-slate-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-school-terracotta' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-500 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};