import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'cyberpunk' | 'ocean';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Array<{ name: Theme; label: string; colors: string }>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themes = [
  {
    name: 'light' as Theme,
    label: 'Light',
    colors: 'bg-gradient-to-br from-blue-50 to-indigo-100'
  },
  {
    name: 'dark' as Theme,
    label: 'Dark',
    colors: 'bg-gradient-to-br from-gray-900 to-black'
  },
  {
    name: 'cyberpunk' as Theme,
    label: 'Cyberpunk',
    colors: 'bg-gradient-to-br from-purple-900 to-pink-900'
  },
  {
    name: 'ocean' as Theme,
    label: 'Ocean',
    colors: 'bg-gradient-to-br from-blue-900 to-teal-900'
  }
];

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};