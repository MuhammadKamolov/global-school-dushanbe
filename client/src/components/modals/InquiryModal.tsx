import { useState, useEffect, type SyntheticEvent } from 'react';
import { X, CheckCircle2, ChevronDown } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface InquiryFormData {
  parentName: string;
  childName: string;
  phone: string;
  grade: string;
  academicYear: string;
}

export const InquiryModal = ({ isOpen, onClose }: InquiryModalProps) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    parentName: '',
    childName: '',
    phone: '',
    grade: 'Детский сад / Play & Learn',
    academicYear: '2026–2027',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      console.log('Отправка заявки на Go API:', formData);
    }, 600);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFormData({
      parentName: '',
      childName: '',
      phone: '',
      grade: 'Детский сад / Play & Learn',
      academicYear: '2026–2027',
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      onClick={handleResetAndClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-school-navy rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Закрыть окно"
        >
          <X size={20} aria-hidden="true" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={36} aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-school-navy mb-2">
              Заявка успешно принята!
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">
              Спасибо за интерес к Global School. Приёмная комиссия свяжется с вами по указанному WhatsApp в течение рабочего дня.
            </p>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full py-3 bg-school-navy hover:bg-school-navy-dark text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Отлично, закрыть
            </button>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <span className="text-[11px] font-bold tracking-widest text-school-terracotta uppercase">
                Приёмная комиссия
              </span>
              <h3 id="inquiry-title" className="text-xl sm:text-2xl font-black text-school-navy tracking-tight mt-1">
                Заявка на получение информации
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Заполните форму, чтобы получить презентацию программ и записаться на экскурсию.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="parentName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Имя и Фамилия родителя *
                </label>
                <input
                  type="text"
                  id="parentName"
                  required
                  placeholder="Например: Рустам Шарипов"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-school-navy focus:ring-1 focus:ring-school-navy transition-all"
                />
              </div>

              <div>
                <label htmlFor="childName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Имя и Фамилия ребенка *
                </label>
                <input
                  type="text"
                  id="childName"
                  required
                  placeholder="Например: Анис Шарипов"
                  value={formData.childName}
                  onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-school-navy focus:ring-1 focus:ring-school-navy transition-all"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Телефон / WhatsApp для связи *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-600 text-xs font-bold select-none">
                    🇹🇯 +992
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    required
                    placeholder="900 00 00 00"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-r-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-school-navy focus:ring-1 focus:ring-school-navy transition-all"
                  />
                </div>
              </div>

              {/* Блок выбора с кастомными стрелочками */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* 1. Класс поступления */}
                <div>
                  <label htmlFor="grade" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Класс поступления
                  </label>
                  <div className="relative">
                    <select
                      id="grade"
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      className="w-full appearance-none pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-hidden focus:border-school-navy transition-all cursor-pointer"
                    >
                      <option value="Детский сад / Play & Learn">Детский сад (3–6 лет)</option>
                      <option value="Начальная школа (1–4 классы)">Начальная школа (1–4 классы)</option>
                      <option value="Средняя школа (5–9 классы)">Средняя школа (5–9 классы)</option>
                      <option value="Старшая школа & IELTS (10–11 классы)">Старшая школа (10–11 классы)</option>
                    </select>
                    {/* Кастомная стрелка со сдвигом влево */}
                    <div className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-slate-400">
                      <ChevronDown size={15} aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* 2. Учебный год */}
                <div>
                  <label htmlFor="academicYear" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Учебный год
                  </label>
                  <div className="relative">
                    <select
                      id="academicYear"
                      value={formData.academicYear}
                      onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                      className="w-full appearance-none pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-hidden focus:border-school-navy transition-all cursor-pointer"
                    >
                      <option value="2026–2027">2026–2027</option>
                      <option value="2027–2028">2027–2028</option>
                    </select>
                    {/* Кастомная стрелка со сдвигом влево */}
                    <div className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-slate-400">
                      <ChevronDown size={15} aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-school-terracotta hover:bg-school-terracotta-hover disabled:bg-slate-300 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-orange-500/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoading ? <span>Отправка данных...</span> : <span>Отправить заявку</span>}
                </button>
              </div>

              <p className="text-[10px] text-center text-slate-400 mt-2">
                Отправляя форму, вы подтверждаете согласие на обработку контактных данных приёмной комиссией школы.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};