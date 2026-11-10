import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { EducationStages } from './components/home/EducationStages';
import { BentoGrid } from './components/home/BentoGrid';
import { InquiryModal } from './components/modals/InquiryModal';
import { AuthModal } from './components/modals/AuthModal';
import { AboutView } from './components/about/AboutView';
import { EducationView } from './components/education/EducationView';
import { AdmissionsView } from './components/admissions/AdmissionsView';
import { NewspaperView } from './components/newspaper/NewspaperView';
import { LeaderboardView } from './components/leaderboard/LeaderboardView';
import { ElectionsView } from './components/elections/ElectionsView';
import { StudentPortalView } from './components/portal/StudentPortalView';
import type { TabType } from './types';
import { AdminPortalView } from './components/admin/AdminPortalView';

function MainLayout() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToStages = () => {
    const section = document.getElementById('stages-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Промо-баннер с набором */}
      <div className="bg-school-navy text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-3 border-b border-white/10">
        <span className="hidden sm:inline bg-school-navy-dark text-school-ice px-2 py-0.5 rounded text-[11px] font-bold">
          2026–2027
        </span>
        <span className="text-slate-200 text-xs">
          Поступление в Global School & Грант на официальный экзамен IELTS
        </span>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-school-terracotta hover:bg-school-terracotta-hover text-white text-[11px] px-3 py-0.5 rounded-full font-bold transition-all shrink-0 cursor-pointer"
        >
          ПОДРОБНЕЕ
        </button>
      </div>

      {/* Шапка сайта */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenModal={() => setIsModalOpen(true)}
      />

      {/* Основной контент: 100% экранов подключены */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <>
            <Hero 
              onOpenModal={() => setIsModalOpen(true)} 
              onExploreStages={scrollToStages} 
            />
            <EducationStages />
            <BentoGrid onNavigate={setCurrentTab} />
          </>
        )}

        {currentTab === 'about' && (
          <AboutView 
            onNavigate={setCurrentTab} 
            onOpenModal={() => setIsModalOpen(true)} 
          />
        )}

        {currentTab === 'education' && (
          <EducationView 
            onNavigate={setCurrentTab} 
            onOpenModal={() => setIsModalOpen(true)} 
          />
        )}

        {currentTab === 'admissions' && (
          <AdmissionsView onOpenInquiryModal={() => setIsModalOpen(true)} />
        )}
        
        {currentTab === 'newspaper' && <NewspaperView />}
        {currentTab === 'leaderboard' && <LeaderboardView />}
        {currentTab === 'elections' && <ElectionsView />}
        {currentTab === 'student-portal' && <StudentPortalView onNavigate={setCurrentTab} />}
        {currentTab === 'admin-portal' && <AdminPortalView />}
      </main>

      {/* Подвал */}
      <Footer 
        onNavigate={setCurrentTab} 
        onOpenModal={() => setIsModalOpen(true)} 
      />

      {/* Модальные окна */}
      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}