import { createContext, useContext, useState, type ReactNode } from 'react';

export interface AuthUser {
  id: number;
  name: string;
  grade: string;
  role: 'student' | 'admin';
  ieltsScore?: number;
  points?: number;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (name: string, grade?: string, role?: 'student' | 'admin') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Для тестирования можно переключать начальное состояние: роль 'student' или 'admin'
  const [user, setUser] = useState<AuthUser | null>({
    id: 104,
    name: 'Алишер Назаров',
    grade: '11-«Б»',
    role: 'student',
    ieltsScore: 8.0,
    points: 880,
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const login = (
    name: string, 
    grade: string = '11-«Б»', 
    role: 'student' | 'admin' = 'student'
  ) => {
    if (role === 'admin' || name.toLowerCase() === 'admin') {
      setUser({
        id: 1,
        name: 'Администрация школы',
        grade: 'Staff',
        role: 'admin',
      });
    } else {
      setUser({
        id: 201,
        name,
        grade,
        role: 'student',
        ieltsScore: 7.5,
        points: 750,
      });
    }
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};