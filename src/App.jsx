import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import MonitorMap from './pages/MonitorMap'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/monitor" element={<MonitorMap />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
