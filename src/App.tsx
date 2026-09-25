import { lazy } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { HomePage } from '@/pages/HomePage'

const RoadmapPage = lazy(() => import('@/pages/RoadmapPage'))
const LessonPage = lazy(() => import('@/pages/LessonPage'))
const NetworkPage = lazy(() => import('@/pages/NetworkPage'))
const SandboxPage = lazy(() => import('@/pages/SandboxPage'))
const CheatSheetPage = lazy(() => import('@/pages/CheatSheetPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

/**
 * Hash-based routing keeps every route on the single index.html that GitHub
 * Pages serves, so deep links and reloads never 404.
 */
export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="roadmap" element={<RoadmapPage />} />
          <Route path="learn/:nodeId" element={<LessonPage />} />
          <Route path="network" element={<NetworkPage />} />
          <Route path="sandbox" element={<SandboxPage />} />
          <Route path="cheatsheet" element={<CheatSheetPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
