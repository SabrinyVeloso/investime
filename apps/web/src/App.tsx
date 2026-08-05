import { AppRouter } from './routes';
import { ThemeProvider } from './contexts/theme-context';

export default function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}
