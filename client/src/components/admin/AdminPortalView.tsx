import { useState } from 'react';
import { Users, Sparkles, CheckCircle2, Phone, Lock, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ParentInquiry {
    id: number;
    parentName: string;
    studentName: string;
    grade: string;
    phone: string;
    date: string;
    status: 'new' | 'contacted' | 'scheduled';
}

interface ModerationArticle {
    id: number;
    title: string;
    author: string;
    grade: string;
    category: string;
    submittedDate: string;
    excerpt: string;
}

const mockInquiriesList: ParentInquiry[] = [
    {
        id: 1,
        parentName: 'Рустам Раҳимов',
        studentName: 'Мадина',
        grade: '10 класс',
        phone: '+992 90 123 4567',
        date: '10 ноября',
        status: 'new',
    },
    {
        id: 2,
        parentName: 'Заррина Умарова',
        studentName: 'Фаррух',
        grade: '1 класс (Начальная)',
        phone: '+992 93 555 7890',
        date: '09 ноября',
        status: 'contacted',
    },
    {
        id: 3,
        parentName: 'Джамшед Саидов',
        studentName: 'Анис',
        grade: 'Детский сад (Play & Learn)',
        phone: '+992 98 888 2233',
        date: '08 ноября',
        status: 'scheduled',
    },
];

const mockPendingArticles: ModerationArticle[] = [
    {
        id: 101,
        title: 'Подготовка к секции Writing: опыт сдачи Mock-теста',
        author: 'Алишер Назаров',
        grade: '11-«Б»',
        category: 'Наука',
        submittedDate: 'Вчера, 16:40',
        excerpt:
            'Личные рекомендации по тайм-менеджменту в Writing Task 2 и анализ шаблонов от экзаменаторов Cambridge.',
    },
    {
        id: 102,
        title: 'Открытие шахматного турнира в новом коворкинге',
        author: 'Сабрина Каримова',
        grade: '10-«А»',
        category: 'Спорт',
        submittedDate: 'Сегодня, 11:20',
        excerpt:
            'Репортаж с первого тура: 24 участника, регламент блица и призовой фонд от ученического совета.',
    },
];

export const AdminPortalView = () => {
    const { user, isAuthenticated, openAuthModal } = useAuth();
    const [activeTab, setActiveTab] = useState<'inquiries' | 'articles' | 'xp'>('inquiries');

    const [inquiries, setInquiries] = useState<ParentInquiry[]>(mockInquiriesList);
    const [articles, setArticles] = useState<ModerationArticle[]>(mockPendingArticles);

    // Стейт формы ручного начисления XP
    const [xpStudentName, setXpStudentName] = useState('Алишер Назаров (11-«Б»)');
    const [xpReason, setXpReason] = useState('1-е место на городской олимпиаде по математике');
    const [xpAmount, setXpAmount] = useState('150');
    const [xpSuccessNotice, setXpSuccessNotice] = useState(false);

    // Защита доступа (Guard): только для role === 'admin'
    if (!isAuthenticated || user?.role !== 'admin') {
        return (
            <div className="py-20 sm:py-28 bg-slate-50 min-h-screen flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center">
                    <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Lock size={28} aria-hidden="true" />
                    </div>
                    <h2 className="text-2xl font-black text-school-navy tracking-tight mb-2">
                        Требуются права Администратора
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                        Этот раздел предназначен исключительно для руководства школы, координаторов
                        приёма и модераторов контента.
                    </p>
                    <button
                        type="button"
                        onClick={openAuthModal}
                        className="w-full py-3.5 bg-school-navy hover:bg-school-navy-dark text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                    >
                        Войти с правами сотрудника
                    </button>
                </div>
            </div>
        );
    }

    // Смена статуса заявки родителя
    const handleUpdateInquiryStatus = (id: number, nextStatus: ParentInquiry['status']) => {
        setInquiries(prev =>
            prev.map(item => (item.id === id ? { ...item, status: nextStatus } : item)),
        );
    };

    // Одобрение статьи в газету (+80 XP)
    const handleApproveArticle = (articleId: number) => {
        alert('Статья одобрена! В базу добавлена транзакция: +80 XP автору статьи.');
        setArticles(prev => prev.filter(a => a.id !== articleId));
    };

    // Отклонение статьи
    const handleRejectArticle = (articleId: number) => {
        setArticles(prev => prev.filter(a => a.id !== articleId));
    };

    // Ручное начисление очков
    const handleGrantXP = (e: React.FormEvent) => {
        e.preventDefault();
        setXpSuccessNotice(true);
        setTimeout(() => setXpSuccessNotice(false), 4000);
    };

    return (
        <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Шапка административной панели */}
                <div className="bg-school-navy text-white rounded-3xl p-6 sm:p-10 mb-8 relative overflow-hidden shadow-xl">
                    <div
                        aria-hidden="true"
                        className="absolute top-0 right-0 w-80 h-80 bg-school-terracotta/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"
                    />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-school-terracotta text-white text-xs font-bold uppercase tracking-wider mb-3">
                                <ShieldAlert size={14} aria-hidden="true" />
                                <span>Панель управления Global School</span>
                            </div>
                            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
                                Центр администрирования
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-300 mt-1">
                                Оперативное управление входящими заявками, публикациями и
                                академическим рейтингом.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="px-4 py-3 rounded-2xl bg-white/10 border border-white/15 text-center">
                                <span className="block text-[10px] uppercase font-bold text-school-ice">
                                    Новых заявок
                                </span>
                                <span className="text-xl font-black">
                                    {inquiries.filter(i => i.status === 'new').length}
                                </span>
                            </div>
                            <div className="px-4 py-3 rounded-2xl bg-white/10 border border-white/15 text-center">
                                <span className="block text-[10px] uppercase font-bold text-amber-300">
                                    На модерации
                                </span>
                                <span className="text-xl font-black">{articles.length}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Вкладки модулей админки */}
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3 mb-8 overflow-x-auto no-scrollbar">
                    <button
                        type="button"
                        onClick={() => setActiveTab('inquiries')}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                            activeTab === 'inquiries'
                                ? 'bg-school-navy text-white shadow-sm'
                                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                    >
                        Заявки родителей ({inquiries.length})
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('articles')}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                            activeTab === 'articles'
                                ? 'bg-school-navy text-white shadow-sm'
                                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                    >
                        Модерация газеты ({articles.length})
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('xp')}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                            activeTab === 'xp'
                                ? 'bg-school-navy text-white shadow-sm'
                                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                    >
                        Начисление баллов (XP)
                    </button>
                </div>

                {/* ================= ВКЛАДКА 1: ЗАЯВКИ РОДИТЕЛЕЙ (CRM) ================= */}
                {activeTab === 'inquiries' && (
                    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-school-navy">
                                    Журнал электронных обращений
                                </h3>
                                <p className="text-xs text-slate-400">
                                    Данные с формы на сайте и консультаций
                                </p>
                            </div>
                            <span className="text-xs text-slate-500 font-semibold">
                                Всего: {inquiries.length} записей
                            </span>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {inquiries.map(inq => (
                                <div
                                    key={inq.id}
                                    className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-school-navy flex items-center justify-center shrink-0 mt-0.5">
                                            <Users size={18} aria-hidden="true" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-school-navy text-sm">
                                                    {inq.parentName}
                                                </h4>
                                                <span className="text-xs text-slate-400">
                                                    ({inq.date})
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-600 mt-0.5">
                                                Ребёнок:{' '}
                                                <strong className="text-slate-800">
                                                    {inq.studentName}
                                                </strong>{' '}
                                                • Класс:{' '}
                                                <span className="font-semibold text-school-terracotta">
                                                    {inq.grade}
                                                </span>
                                            </p>
                                            <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-slate-700">
                                                <Phone
                                                    size={13}
                                                    className="text-slate-400"
                                                    aria-hidden="true"
                                                />
                                                <a
                                                    href={`tel:${inq.phone}`}
                                                    className="hover:text-school-navy"
                                                >
                                                    {inq.phone}
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {/* Бейдж статуса */}
                                        <span
                                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                                                inq.status === 'new'
                                                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                                                    : inq.status === 'contacted'
                                                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                                                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                            }`}
                                        >
                                            {inq.status === 'new'
                                                ? 'Новая заявка'
                                                : inq.status === 'contacted'
                                                  ? 'Связались'
                                                  : 'Записан на визит'}
                                        </span>

                                        {/* Кнопки смены статуса */}
                                        <div className="flex items-center gap-1.5">
                                            {inq.status === 'new' && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleUpdateInquiryStatus(
                                                            inq.id,
                                                            'contacted',
                                                        )
                                                    }
                                                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
                                                >
                                                    Отметить звонок
                                                </button>
                                            )}
                                            {inq.status !== 'scheduled' && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleUpdateInquiryStatus(
                                                            inq.id,
                                                            'scheduled',
                                                        )
                                                    }
                                                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer transition-colors"
                                                >
                                                    Назначить визит
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ================= ВКЛАДКА 2: МОДЕРАЦИЯ ГАЗЕТЫ ================= */}
                {activeTab === 'articles' && (
                    <div className="space-y-4">
                        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs mb-6">
                            <h3 className="text-base font-bold text-school-navy">
                                Материалы учеников, ожидающие проверки
                            </h3>
                            <p className="text-xs text-slate-500 mt-1">
                                После одобрения статья моментально публикуется в номере The Global
                                Pulse, а на баланс автора начисляется +80 XP.
                            </p>
                        </div>

                        {articles.length === 0 ? (
                            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                                <CheckCircle2 size={36} className="text-emerald-500 mx-auto mb-3" />
                                <h4 className="text-base font-bold text-school-navy">
                                    Все статьи проверены
                                </h4>
                                <p className="text-xs text-slate-400 mt-1">
                                    Новых материалов от учащихся пока нет
                                </p>
                            </div>
                        ) : (
                            articles.map(item => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between gap-6"
                                >
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700">
                                                {item.category}
                                            </span>
                                            <span className="text-xs text-slate-400">•</span>
                                            <span className="text-xs text-slate-400">
                                                {item.submittedDate}
                                            </span>
                                        </div>

                                        <h4 className="text-lg font-bold text-school-navy mb-2">
                                            {item.title}
                                        </h4>

                                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                                            <span className="font-semibold text-slate-800">
                                                Автор: {item.author}
                                            </span>
                                            <span>•</span>
                                            <span>Класс: {item.grade}</span>
                                        </div>

                                        <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100 leading-relaxed">
                                            «{item.excerpt}»
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                                        <button
                                            type="button"
                                            onClick={() => handleRejectArticle(item.id)}
                                            className="px-4 py-2 text-xs font-bold uppercase text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                                        >
                                            Отклонить
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleApproveArticle(item.id)}
                                            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                                        >
                                            <CheckCircle2 size={15} aria-hidden="true" />
                                            <span>Опубликовать (+80 XP)</span>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* ================= ВКЛАДКА 3: НАЧИСЛЕНИЕ БАЛЛОВ XP ================= */}
                {activeTab === 'xp' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
                            <h3 className="text-lg font-bold text-school-navy mb-1">
                                Ручное поощрение академическими очками
                            </h3>
                            <p className="text-xs text-slate-500 mb-6">
                                Начисленные очки напрямую влияют на позицию учащегося в борьбе за
                                100% грант на официальный IELTS.
                            </p>

                            {xpSuccessNotice && (
                                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                                    <span>
                                        Баллы успешно начислены! Транзакция зафиксирована в журнале
                                        рейтингов.
                                    </span>
                                </div>
                            )}

                            <form onSubmit={handleGrantXP} className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="xpStudent"
                                        className="block text-xs font-bold text-slate-700 uppercase mb-1.5"
                                    >
                                        Выберите учащегося *
                                    </label>
                                    <select
                                        id="xpStudent"
                                        value={xpStudentName}
                                        onChange={e => setXpStudentName(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-hidden focus:border-school-navy"
                                    >
                                        <option value="Алишер Назаров (11-«Б»)">
                                            Алишер Назаров (11-«Б»)
                                        </option>
                                        <option value="Мадина Раҳимова (11-«А»)">
                                            Мадина Раҳимова (11-«А»)
                                        </option>
                                        <option value="Сабрина Каримова (10-«А»)">
                                            Сабрина Каримова (10-«А»)
                                        </option>
                                        <option value="Далер Шарипов (11-«А»)">
                                            Далер Шарипов (11-«А»)
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="xpReason"
                                        className="block text-xs font-bold text-slate-700 uppercase mb-1.5"
                                    >
                                        Основание для начисления *
                                    </label>
                                    <input
                                        id="xpReason"
                                        type="text"
                                        required
                                        value={xpReason}
                                        onChange={e => setXpReason(e.target.value)}
                                        placeholder="Например: Победитель городской олимпиады по английскому"
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-school-navy"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="xpAmount"
                                        className="block text-xs font-bold text-slate-700 uppercase mb-1.5"
                                    >
                                        Количество очков (XP) *
                                    </label>
                                    <select
                                        id="xpAmount"
                                        value={xpAmount}
                                        onChange={e => setXpAmount(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-hidden focus:border-school-navy"
                                    >
                                        <option value="50">+50 XP (Участие в конференции)</option>
                                        <option value="80">
                                            +80 XP (Исследовательская статья)
                                        </option>
                                        <option value="150">
                                            +150 XP (GPA 4.8+ по итогам четверти)
                                        </option>
                                        <option value="200">
                                            +200 XP (Призовое место на олимпиаде)
                                        </option>
                                        <option value="300">
                                            +300 XP (Прорывной результат на Mock IELTS Band 8.5+)
                                        </option>
                                    </select>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-school-navy hover:bg-school-navy-dark text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                                    >
                                        <Sparkles size={15} aria-hidden="true" />
                                        <span>Начислить очки в профиль</span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Справочный регламент */}
                        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs h-fit">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                                Академический регламент
                            </h4>
                            <p className="text-xs text-slate-600 leading-relaxed mb-4">
                                Все начисления очков XP протоколируются и отображаются в истории
                                транзакций личного кабинета учащегося.
                            </p>
                            <div className="space-y-2 text-xs text-slate-500">
                                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                                    <span>Макс. за четверть:</span>
                                    <strong className="text-school-navy">600 XP</strong>
                                </div>
                                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                                    <span>Период подсчета:</span>
                                    <strong className="text-school-navy">До 25 декабря</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
