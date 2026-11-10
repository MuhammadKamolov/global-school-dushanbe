interface StageItem {
  id: string;
  age: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

const stages: StageItem[] = [
  {
    id: 'kindergarten',
    age: '3–6 лет',
    title: 'Детский сад / Play & Learn',
    subtitle: 'Мягкая адаптация и среда',
    description: 'Развитие эмоционального интеллекта, моторики и погружение в английский в игровой форме.',
    imageUrl: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'primary',
    age: '6–10 лет',
    title: 'Начальная школа',
    subtitle: '1–4 классы',
    description: 'Фундамент академических знаний, проектная работа и развитие логического мышления.',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'middle',
    age: '10–15 лет',
    title: 'Средняя школа',
    subtitle: '5–9 классы',
    description: 'Предпрофильные треки, углубленная математика, робототехника и олимпиады.',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'high',
    age: '15–18 лет',
    title: 'Старшая школа & IELTS',
    subtitle: '10–11 классы',
    description: 'Интенсивная академическая подготовка к международным вузам и гранты на IELTS.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
  },
];

export const EducationStages = () => {
  return (
    <section id="stages-section" className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Заголовок секции */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold tracking-widest text-school-terracotta uppercase">
              Образование
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-school-navy tracking-tight mt-1">
              Образовательные ступени
            </h2>
          </div>
          <p className="mt-2 sm:mt-0 text-xs sm:text-sm text-slate-500 max-w-md">
            Единая образовательная экосистема от раннего детства до поступления в ведущие мировые вузы.
          </p>
        </div>

        {/* Сетка карточек с гармоничной высотой h-[310px] */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className="group relative h-[310px] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 bg-slate-900 flex flex-col justify-between p-5 cursor-pointer"
            >
              {/* Фото с приближением */}
              <img
                src={stage.imageUrl}
                alt={stage.title}
                className="absolute inset-0 w-full h-full object-cover object-center opacity-70 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
              />

              {/* Затемняющий градиент снизу */}
              <div 
                aria-hidden="true" 
                className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" 
              />

              {/* Верхняя плашка с возрастом */}
              <div className="relative z-10 flex justify-start">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 backdrop-blur-md text-white border border-white/20">
                  {stage.age}
                </span>
              </div>

              {/* Нижняя информация */}
              <div className="relative z-10 text-white">
                <h3 className="text-base font-bold tracking-tight mb-0.5 leading-snug">
                  {stage.title}
                </h3>
                <p className="text-[11px] font-medium text-school-ice mb-1.5">
                  {stage.subtitle}
                </p>
                <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                  {stage.description}
                </p>

                <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-[10px] font-semibold text-school-ice group-hover:text-white transition-colors">
                  <span>Подробнее</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};