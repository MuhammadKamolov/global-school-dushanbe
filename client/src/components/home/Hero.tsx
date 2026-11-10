interface HeroProps {
  onOpenModal: () => void;
  onExploreStages: () => void;
}

export const Hero = ({ onOpenModal, onExploreStages }: HeroProps) => {
  return (
    <section className="relative bg-school-navy text-white py-20 lg:py-28 overflow-hidden">
      {/* Декоративная подсветка фона */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-radial from-school-navy-dark via-school-navy to-[#0a122c] opacity-90" 
      />
      
      {/* Тонкая сетка на фоне для технологичного академического вида */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Бейдж локации и стандарта */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-school-ice text-xs font-semibold tracking-wide uppercase mb-6">
          <span className="w-2 h-2 rounded-full bg-school-terracotta animate-pulse" />
          <span>Душанбе • Международная программа полного дня</span>
        </div>

        {/* Главный заголовок с адаптивным размером (text-3xl -> text-6xl) */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none">
          Учебный календарь и программы на{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-school-ice to-white">
            2026–2027 год
          </span>
        </h1>

        {/* Подзаголовок */}
        <p className="mt-6 text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Международная школа от детского сада до выпускных классов: академическая база, 
          свободный английский язык и подготовка к сдаче IELTS на высший балл.
        </p>

        {/* Кнопки призыва к действию (CTA) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={onOpenModal}
            className="w-full sm:w-auto px-6 py-3.5 bg-school-terracotta hover:bg-school-terracotta-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-orange-500/20 cursor-pointer"
          >
            Заявка на получение информации
          </button>
          
          <button
            type="button"
            onClick={onExploreStages}
            className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all backdrop-blur-xs cursor-pointer"
          >
            Образовательные ступени ↓
          </button>
        </div>
      </div>
    </section>
  );
};