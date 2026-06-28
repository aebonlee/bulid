import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProgressProvider } from './context/ProgressContext'
import Home from './pages/Home'
import VolumeOverview from './pages/VolumeOverview'
import PartPage from './pages/PartPage'
import Schedule from './pages/Schedule'
import ToolsHome from './pages/ToolsHome'
import ToolPage from './pages/ToolPage'
import PromptLab from './pages/PromptLab'
import About from './pages/About'
import InstructorIntro from './pages/InstructorIntro'
import CompanyIntro from './pages/CompanyIntro'
import Appendix from './pages/Appendix'

export default function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vol/:volId" element={<VolumeOverview />} />
          <Route path="/vol/:volId/part/:partNum" element={<PartPage />} />
          <Route path="/schedule/:volId" element={<Schedule />} />
          <Route path="/tools" element={<ToolsHome />} />
          <Route path="/tools/prompt" element={<Navigate to="/tools/prompt/learn" replace />} />
          <Route path="/tools/prompt/:section" element={<PromptLab />} />
          <Route path="/tools/:toolId" element={<ToolPage />} />
          <Route path="/tools/:toolId/:section" element={<ToolPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/instructor" element={<InstructorIntro />} />
          <Route path="/about/company" element={<CompanyIntro />} />
          <Route path="/appendix" element={<Appendix />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ProgressProvider>
    </AuthProvider>
  )
}
