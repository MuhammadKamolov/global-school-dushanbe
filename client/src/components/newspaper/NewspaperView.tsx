import { useState } from 'react';
import { Clock, User, ArrowLeft, Send, Sparkles, BookOpen } from 'lucide-react';
import type { Article } from '../../types';
import { mockArticles } from '../../data/mockData';

const categories = ['Все', 'Наука', 'Культура', 'Спорт', 'Интервью'] as const;
type CategoryFilter = typeof categories[number];

const allArticles: Article[] = [
  ...mockArticles,
  {
    id: 4,
    title: 'Интервью с учителем физики: почему робототехника важнее сухой теории',
    category: 'Интервью',
    excerpt: 'Поговорили о подготовке к международным олимпиадам, школьной лаборатории и о том, как увлечься наукой с 7 класса.',
    author: 'Далер Ш.',
    date: '10 октября',
    readTime: '8 мин',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Подготовка к IELTS: топ-5 ошибок в секции Writing Task 2',
    category: 'Наука',
    excerpt: 'Разбор структуры эссе, академического вокабуляра и критериев оценки экзаменаторов от выпускников школы.',
    author: 'Мадина Р.',
    date: '3 октября',
    readTime: '7 мин',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Осенний благотворительный фестиваль: как мы собрали книги для сельских школ',
    category: 'Культура',
    excerpt: 'Ученики и родители собрали более 400 книг на таджикском и английском языках. Фотоотчет с ярмарки.',
    author: 'Сабрина К.',
    date: '25 сентября',
    readTime: '5 мин',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
  },
];

export const NewspaperView = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('Все');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const filteredArticles = selectedCategory === 'Все'
    ? allArticles
    : allArticles.filter((item) => item.category === selectedCategory);

  const badgeColors: Record<Article['category'], string> = {
    Наука: 'bg-blue-50 text-blue-700 border-blue-200/60',
    Культура: 'bg-amber-50 text-amber-700 border-amber-200/60',
    Спорт: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    Интервью: 'bg-purple-50 text-purple-700 border-purple-200/60',
  };

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Баннер газеты */}
        <div className="bg-school-navy text-white rounded-3xl p-8 sm:p-12 mb-10 relative overflow-hidden shadow-xl">
          <div 
            aria-hidden="true" 
            className="absolute top-0 right-0 w-96 h-96 bg-school-ice/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" 
          />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-school-ice text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
              <BookOpen size={14} aria-hidden="true" />
              <span>Школьное издательство</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
              The Global Pulse
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              Авторская колонка учащихся Global School. Здесь публикуются исследовательские заметки, 
              репортажи с олимпиад и интервью с преподавателями.
            </p>

            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-school-terracotta hover:bg-school-terracotta-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
            >
              <Sparkles size={16} aria-hidden="true" />
              <span>Предложить статью в номер</span>
            </button>
          </div>
        </div>

        {/* Фильтры категорий */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-school-navy text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Сетка статей с фотообложками */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <button
              type="button"
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="text-left bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer group focus:outline-hidden focus:ring-2 focus:ring-school-navy"
            >
              <div>
                {/* Контейнер обложки статьи с фиксацией 16:9 и плавным зумом при ховере */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Плашка категории поверх фото в верхнем левом углу */}
                  <div className="absolute top-3 left-3">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs backdrop-blur-md bg-white/95 text-school-navy`}>
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 pb-2">
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium mb-2.5">
                    <Clock size={12} aria-hidden="true" />
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-school-navy group-hover:text-school-terracotta transition-colors leading-snug mb-2 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-3">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 text-school-navy text-[10px] font-bold flex items-center justify-center">
                      <User size={12} aria-hidden="true" />
                    </div>
                    <span className="font-semibold text-slate-700">{article.author}</span>
                  </div>
                  <span>{article.date}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* Модальное окно чтения статьи с полноразмерным баннером */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Закрыть окно статьи"
            onClick={() => setActiveArticle(null)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs w-full h-full border-none cursor-default"
          />

          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100">
            {/* Верхний сервисный бар */}
            <div className="flex items-center justify-between gap-4 mb-5 pb-3 border-b border-slate-100">
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-school-navy transition-colors cursor-pointer"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                <span>Назад к списку</span>
              </button>

              <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${badgeColors[activeArticle.category]}`}>
                {activeArticle.category}
              </span>
            </div>

            {/* Главная обложка внутри статьи */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-6 bg-slate-100">
              <img
                src={activeArticle.imageUrl}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-school-navy tracking-tight leading-snug mb-3">
              {activeArticle.title}
            </h2>

            <div className="flex items-center gap-3 text-xs text-slate-400 pb-5 mb-5 border-b border-slate-100">
              <span className="font-semibold text-slate-700">Автор: {activeArticle.author}</span>
              <span>•</span>
              <span>{activeArticle.date}</span>
              <span>•</span>
              <span>{activeArticle.readTime} чтения</span>
            </div>

            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p className="font-semibold text-slate-800 text-base leading-relaxed">
                {activeArticle.excerpt}
              </p>
              <p>
                В Global School особое внимание уделяется прикладным навыкам. Учащиеся не просто осваивают 
                теоретический материал, но и проверяют полученные знания на практике: в физических и химических лабораториях, 
                на открытых дебатах и в ходе совместных инженерных экспериментов.
              </p>
              <p>
                Подобные проекты формируют портфолио будущего абитуриента для поступления в ведущие международные вузы. 
                В следующих выпусках редакция опубликует подробные комментарии научных руководителей и расписание открытых воркшопов на следующий месяц.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно отправки статьи */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Закрыть форму отправки"
            onClick={() => setIsSubmitModalOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs w-full h-full border-none cursor-default"
          />

          <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100">
            <div className="mb-6">
              <span className="text-[11px] font-bold text-school-terracotta uppercase tracking-wider">
                Редакция
              </span>
              <h3 className="text-xl font-bold text-school-navy mt-1">
                Предложить материал
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Статья будет проверена куратором школьной редакции перед публикацией.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Статья отправлена куратору школьной газеты!');
                setIsSubmitModalOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="articleTitle" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Заголовок статьи
                </label>
                <input
                  id="articleTitle"
                  type="text"
                  required
                  placeholder="О чем ваш материал?"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-school-navy"
                />
              </div>

              <div>
                <label htmlFor="articleCategory" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Рубрика
                </label>
                <select 
                  id="articleCategory"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-hidden focus:border-school-navy"
                >
                  <option value="Наука">Наука</option>
                  <option value="Культура">Культура</option>
                  <option value="Спорт">Спорт</option>
                  <option value="Интервью">Интервью</option>
                </select>
              </div>

              <div>
                <label htmlFor="articleText" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Текст статьи / Тезисы
                </label>
                <textarea
                  id="articleText"
                  rows={4}
                  required
                  placeholder="Опишите краткое содержание или вставьте черновик..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-school-navy"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold uppercase text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-school-navy hover:bg-school-navy-dark text-white text-xs font-bold uppercase rounded-xl transition-all cursor-pointer"
                >
                  <Send size={14} aria-hidden="true" />
                  <span>Отправить на модерацию</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};