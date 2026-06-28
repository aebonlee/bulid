import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProgressProvider } from './context/ProgressContext'
import Home from './pages/Home'
import VolumeOverview from './pages/VolumeOverview'
import PartPage from './pages/PartPage'

export default function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vol/:volId" element={<VolumeOverview />} />
          <Route path="/vol/:volId/part/:partNum" element={<PartPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ProgressProvider>
    </AuthProvider>
  )
}
