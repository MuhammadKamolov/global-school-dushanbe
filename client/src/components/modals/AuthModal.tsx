import { useState, type SyntheticEvent } from 'react';
import { Lock, X, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, login } = useAuth();
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!loginInput.trim()) return;

    login(loginInput.trim(), '11-«Б»', 'student');
    setLoginInput('');
    setPasswordInput('');
  };

  const handleAdminDemoLogin = () => {
    login('Дирекция Global School', 'Staff', 'admin');
    setLoginInput('');
    setPasswordInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Закрыть окно входа"
        onClick={closeAuthModal}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs w-full h-full border-none cursor-default"
      />

      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100">
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-school-navy rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Закрыть"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-school-navy text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md">
            <Lock size={20} aria-hidden="true" />
          </div>
          <h3 className="text-xl font-bold text-school-navy">
            Вход в портал Global School
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Введите логин ученика или учетную запись сотрудника
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="authLogin" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Имя ученика или логин *
            </label>
            <input
              id="authLogin"
              type="text"
              required
              placeholder="Например: Сабрина Каримова"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-school-navy focus:ring-1 focus:ring-school-navy transition-all"
            />
          </div>

          <div>
            <label htmlFor="authPassword" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Пароль / ПИН-код *
            </label>
            <input
              id="authPassword"
              type="password"
              required
              placeholder="••••••••"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-school-navy focus:ring-1 focus:ring-school-navy transition-all"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={closeAuthModal}
              className="w-1/2 py-2.5 text-xs font-bold uppercase text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="w-1/2 py-2.5 bg-school-navy hover:bg-school-navy-dark text-white text-xs font-bold uppercase rounded-xl transition-all shadow-md cursor-pointer"
            >
              Войти
            </button>
          </div>
        </form>

        {/* Быстрое переключение для тестирования роли администратора */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={handleAdminDemoLogin}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-school-terracotta hover:underline cursor-pointer"
          >
            <ShieldAlert size={14} aria-hidden="true" />
            <span>Демо: Войти как Администратор школы</span>
          </button>
        </div>
      </div>
    </div>
  );
};