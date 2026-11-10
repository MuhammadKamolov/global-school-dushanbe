import { useState } from 'react';
import { ChevronDown, User, Menu, X, LogOut } from 'lucide-react';
import type { TabType } from '../../types';
import { useAuth } from '../../context/AuthContext';

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

interface HeaderProps {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  onOpenModal: () => void;
}

export const Header = ({ currentTab, setCurrentTab, onOpenModal }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalMenuOpen, setPortalMenuOpen] = useState(false);
  
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();

  const navItems: { id: TabType; label: string }[] = [
    { id: 'home', label: 'ГЛАВНАЯ' },
    { id: 'about', label: 'О НАС' },
    { id: 'education', label: 'ОБРАЗОВАНИЕ' },
    { id: 'admissions', label: 'ПОСТУПЛЕНИЕ' },
    { id: 'newspaper', label: 'ШКОЛЬНАЯ ГАЗЕТА' },
    { id: 'leaderboard', label: 'РЕЙТИНГ IELTS' },
    { id: 'elections', label: 'ВЫБОРЫ' },
  ];

  const handleNavClick = (tab: TabType) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40">
      {/* 1. Верхний служебный ярус */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between border-b border-slate-100">
        <div className="hidden lg:flex items-center gap-4 text-slate-500 shrink-0">
          <a href="/" aria-label="Instagram" className="hover:text-school-navy transition-colors"><InstagramIcon size={16} /></a>
          <a href="/" aria-label="Telegram" className="hover:text-school-navy transition-colors"><TelegramIcon size={15} /></a>
          <a href="/" aria-label="Facebook" className="hover:text-school-navy transition-colors"><FacebookIcon size={16} /></a>
          <a href="/" aria-label="LinkedIn" className="hover:text-school-navy transition-colors"><LinkedinIcon size={16} /></a>
        </div>

        <button 
          type="button"
          onClick={() => handleNavClick('home')}
          className="flex flex-col items-center cursor-pointer select-none text-left bg-transparent border-none p-0 focus:outline-hidden shrink-0"
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-8 border-2 border-school-navy rounded-xs grid grid-cols-2 p-0.5 gap-0.5" aria-hidden="true">
              <div className="bg-school-navy"></div>
              <div className="bg-school-ice"></div>
              <div className="bg-school-ice"></div>
              <div className="bg-school-navy"></div>
            </div>
            <span className="text-lg sm:text-xl font-black tracking-wider text-school-navy">
              GLOBAL SCHOOL
            </span>
          </div>
          <span className="text-[9px] tracking-widest text-slate-400 font-semibold uppercase">
            International School of Dushanbe
          </span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenModal}
            className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-school-terracotta hover:bg-school-terracotta-hover text-white text-[11px] sm:text-xs font-bold rounded-full transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0"
          >
            ЗАЯВКА
          </button>
          
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-600 px-2 py-1 rounded border border-slate-200 shrink-0">
            <span>RU</span>
            <ChevronDown size={13} aria-hidden="true" />
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-slate-600 hover:text-school-navy cursor-pointer shrink-0"
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {mobileMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* 2. Основная навигация: Трёхзвенный Flexbox (меню по центру, элементы в потоке) */}
      <div className="hidden lg:flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-center justify-between gap-4 h-13">
        
        {/* Левый спейсер (уравновешивает блок профиля справа) */}
        <div className="flex-1 flex items-center justify-start min-w-0" aria-hidden="true" />

        {/* Меню строго по центру, адаптивный интервал */}
        <nav className="flex items-center space-x-2 xl:space-x-4 2xl:space-x-5 shrink-0">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-[11px] xl:text-xs font-bold uppercase tracking-wider transition-colors pb-1 border-b-2 cursor-pointer whitespace-nowrap shrink-0 ${
                currentTab === item.id
                  ? 'border-school-terracotta text-school-navy'
                  : 'border-transparent text-slate-600 hover:text-school-navy'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Правый блок: в общем потоке (никогда не перекроет меню) */}
        <div className="flex-1 flex items-center justify-end shrink-0 min-w-0">
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setPortalMenuOpen(!portalMenuOpen)}
                className="flex items-center gap-1.5 xl:gap-2 px-2.5 xl:px-3 py-1.5 text-xs font-bold text-school-navy bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer whitespace-nowrap"
              >
                <div className="w-5 h-5 rounded-full bg-school-navy text-white text-[10px] flex items-center justify-center font-bold shrink-0">
                  {user.name.charAt(0)}
                </div>
                <span className="max-w-[85px] xl:max-w-[140px] truncate text-left">
                  {user.name}
                </span>
                <span className="text-[10px] text-slate-400 shrink-0">({user.grade})</span>
                <ChevronDown size={13} aria-hidden="true" className="shrink-0" />
              </button>

              {portalMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50">
                  {user.role === 'admin' ? (
                    <button
                      type="button"
                      onClick={() => {
                        handleNavClick('admin-portal');
                        setPortalMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-school-terracotta hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                    >
                      <span>Панель управления</span>
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-black">ADMIN</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        handleNavClick('student-portal');
                        setPortalMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                    >
                      <span>Личный кабинет</span>
                      <span className="text-[10px] bg-school-ice px-1.5 py-0.5 rounded text-school-navy font-bold">IELTS</span>
                    </button>
                  )}
                  <div className="border-t border-slate-100 my-1" />
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setPortalMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut size={13} aria-hidden="true" />
                    <span>Выйти из аккаунта</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={openAuthModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase text-white bg-school-navy rounded-lg hover:bg-school-navy-dark transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              <User size={13} aria-hidden="true" />
              <span>Войти в портал</span>
            </button>
          )}
        </div>

      </div>

      {/* 3. Мобильное выпадающее меню */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2 text-xs font-bold uppercase rounded-md cursor-pointer ${
                currentTab === item.id
                  ? 'bg-slate-100 text-school-navy'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100">
            {isAuthenticated && user ? (
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => handleNavClick('student-portal')}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold uppercase bg-school-navy text-white rounded-md cursor-pointer"
                >
                  <span className="truncate">Кабинет: {user.name}</span>
                  <User size={14} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-md cursor-pointer"
                >
                  <LogOut size={14} aria-hidden="true" />
                  <span>Выйти из аккаунта</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal();
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold uppercase bg-school-navy text-white rounded-md cursor-pointer"
              >
                <span>Войти в портал</span>
                <User size={14} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};