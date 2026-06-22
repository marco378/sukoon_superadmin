import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/components/Layout.jsx'
import Login from '@/pages/Login.jsx'
import Dashboard from '@/pages/Dashboard.jsx'
import Affiliates from '@/pages/Affiliates.jsx'
import AffiliateDetail from '@/pages/AffiliateDetail.jsx'
import Products from '@/pages/Products.jsx'
import Policies from '@/pages/Policies.jsx'
import Settings from '@/pages/Settings.jsx'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />

  return (
    <BrowserRouter>
      <Layout onLogout={() => setLoggedIn(false)}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/affiliates" element={<Affiliates />} />
          <Route path="/affiliates/:id" element={<AffiliateDetail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
