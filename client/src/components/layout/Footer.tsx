import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';
import type { TabType } from '../../types';

interface FooterProps {
  onNavigate: (tab: TabType) => void;
  onOpenModal: () => void;
}

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TelegramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m22 2-7 20-4-9-9-4Z"/>
    <path d="M22 2 11 13"/>
  </svg>
);

const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export const Footer = ({ onNavigate, onOpenModal }: FooterProps) => {
  return (
    <footer className="bg-school-navy text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          
          {/* Бренд */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2 select-none">
              <div className="w-8 h-9 border-2 border-white rounded-xs grid grid-cols-2 p-0.5 gap-0.5" aria-hidden="true">
                <div className="bg-white"></div>
                <div className="bg-school-ice"></div>
                <div className="bg-school-ice"></div>
                <div className="bg-white"></div>
              </div>
              <span className="text-xl font-black tracking-wider text-white">
                GLOBAL SCHOOL
              </span>
            </div>
            
            <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
              Международное академическое учреждение полного дня в Душанбе. Обучение по углубленным стандартам, билингвальная среда и целевая подготовка к международным сертификатам IELTS.
            </p>

            <div className="pt-2 flex items-center gap-2.5 text-slate-300">
              <a href="/" aria-label="Instagram" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <InstagramIcon size={16} />
              </a>
              <a href="/" aria-label="Telegram" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <TelegramIcon size={15} />
              </a>
              <a href="/" aria-label="Facebook" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <FacebookIcon size={16} />
              </a>
              <a href="/" aria-label="LinkedIn" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <LinkedinIcon size={16} />
              </a>
            </div>
          </div>

          {/* Навигация */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-school-ice mb-4">
              Навигация
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button type="button" onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
                  Главная страница
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('admissions')} className="hover:text-white transition-colors cursor-pointer">
                  Поступление и гранты
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('newspaper')} className="hover:text-white transition-colors cursor-pointer">
                  Школьная газета
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('leaderboard')} className="hover:text-white transition-colors cursor-pointer">
                  Рейтинг IELTS
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('elections')} className="hover:text-white transition-colors cursor-pointer">
                  Выборы президента
                </button>
              </li>
            </ul>
          </div>

          {/* Программы */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-school-ice mb-4">
              Программы
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>Детский сад (3–6 лет)</li>
              <li>Начальная школа (1–4 классы)</li>
              <li>Среднее звено (5–9 классы)</li>
              <li>High School & IELTS (10–11)</li>
              <li>Робототехника и олимпиады</li>
            </ul>
          </div>

          {/* Контакты: аккуратная компактная кнопка w-fit */}
          <div className="lg:col-span-3 flex flex-col items-start">
            <h4 className="text-xs font-bold uppercase tracking-wider text-school-ice mb-4">
              Контакты
            </h4>
            <address className="not-italic space-y-3 text-xs text-slate-300 mb-5">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-school-terracotta shrink-0 mt-0.5" aria-hidden="true" />
                <span>г. Душанбе, Республика Таджикистан</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-school-terracotta shrink-0" aria-hidden="true" />
                <a href="tel:+992900000000" className="hover:text-white transition-colors font-medium">
                  +992 (90) 000-00-00
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-school-terracotta shrink-0" aria-hidden="true" />
                <a href="mailto:info@globalschool.tj" className="hover:text-white transition-colors">
                  info@globalschool.tj
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-[11px] text-slate-400">
                <Clock size={14} className="shrink-0" aria-hidden="true" />
                <span>Пн – Сб: 08:00 – 17:00</span>
              </div>
            </address>

            <button
              type="button"
              onClick={onOpenModal}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-school-terracotta hover:bg-school-terracotta-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              <span>Записаться на визит</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </button>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© 2026 Global School Dushanbe. Все права защищены.</p>
          <div className="flex items-center gap-6">
            <span>Лицензия Министерства образования РТ</span>
            <span>Политика конфиденциальности</span>
          </div>
        </div>

      </div>
    </footer>
  );
};