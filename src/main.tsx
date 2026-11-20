import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeLanguageProvider } from './context/ThemeLanguageContext';

createRoot(document.getElementById('root')!).render(
  <ThemeLanguageProvider>
    <App />
  </ThemeLanguageProvider>
);
