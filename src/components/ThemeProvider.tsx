import { FC, createContext, useContext, ReactNode } from 'react';
import theme from '../theme';

// Create a context for the theme
const ThemeContext = createContext(theme);

// Custom hook to use the theme
export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

// Theme provider component
export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
