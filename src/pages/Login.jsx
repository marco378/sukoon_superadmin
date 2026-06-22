import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'

export default function Login({ onLogin }) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => onLogin(), 800)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-1">
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
            <path d="M20 4c-4 0-7 2-9 5-1.5 2.5-1 5.5 1 7.5l8 8c2 2 2.5 5 1 7.5s-5 5-9 5" stroke="#6B21A8" strokeWidth="5" strokeLinecap="round" />
            <path d="M20 36c4 0 7-2 9-5 1.5-2.5 1-5.5-1-7.5l-8-8c-2-2-2.5-5-1-7.5s5-5 9-5" stroke="#EA580C" strokeWidth="5" strokeLinecap="round" />
          </svg>
          <div>
            <span className="text-[15px] font-bold text-purple-800 tracking-tight uppercase">Sukoon</span>
            <span className="block text-[10px] font-semibold text-orange-600 tracking-wider">INSURANCE</span>
          </div>
          <p className="text-[13px] text-muted-foreground">Sign in to Super Admin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-foreground">User ID</label>
            <Input placeholder="Enter your user ID" className="h-9 text-[13px]" defaultValue="admin" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[12px] font-medium text-foreground">Password</label>
              <button type="button" className="text-[11px] text-primary hover:underline">Forgot?</button>
            </div>
            <Input type="password" placeholder="Enter password" className="h-9 text-[13px]" defaultValue="password" />
          </div>
          <Button type="submit" className="w-full h-9 text-[13px]" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <p className="text-center text-[11px] text-muted-foreground">
          Restricted access. Contact IT for credentials.
        </p>
      </div>
    </div>
  )
}
