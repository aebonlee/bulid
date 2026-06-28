import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProgressProvider } from './context/ProgressContext'
import Home from './pages/Home'
import VolumeOverview from './pages/VolumeOverview'
import PartPage from './pages/PartPage'
import ToolsHome from './pages/ToolsHome'
import ToolPage from './pages/ToolPage'
import PromptLab from './pages/PromptLab'
import About from './pages/About'

export default function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vol/:volId" element={<VolumeOverview />} />
          <Route path="/vol/:volId/part/:partNum" element={<PartPage />} />
          <Route path="/tools" element={<ToolsHome />} />
          <Route path="/tools/prompt" element={<PromptLab />} />
          <Route path="/tools/:toolId" element={<ToolPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ProgressProvider>
    </AuthProvider>
  )
}
