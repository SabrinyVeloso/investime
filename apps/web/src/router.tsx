import { HashRouter, Route, Routes } from 'react-router-dom';
import { AppLayout } from './layouts/app-layout';
import { InvestmentsTrackerPage } from './pages/app-pages';

export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<InvestmentsTrackerPage />} />
        </Route>
        <Route path="*" element={<InvestmentsTrackerPage />} />
      </Routes>
    </HashRouter>
  );
}
