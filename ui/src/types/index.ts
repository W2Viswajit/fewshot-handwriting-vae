export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  fonts: FontType[];
}

export interface FontType {
  id: string;
  name: string;
  createdAt: string;
  samples: FontSample[];
  settings: FontSettings;
}

export interface FontSample {
  letter: string;
  samples: string[];
}

export interface FontSettings {
  style: 'normal' | 'italic' | 'oblique';
  weight: number;
  size: number;
  lineHeight: number;
  color: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface AlertType {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}