import { useState } from 'react'
import { Save, Globe, Shield, Bell, Users } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Separator } from '@/components/ui/separator.jsx'

export default function Settings() {
  const [tab, setTab] = useState('general')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'users', label: 'Admin Users', icon: Users },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Settings</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">Platform configuration and admin preferences</p>
      </div>

      <div className="flex gap-6">
        <div className="w-48 shrink-0 space-y-0.5">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 w-full px-2.5 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
                tab === t.id ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              }`}
            >
              <t.icon size={14} />
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1">
          {tab === 'general' && (
            <Card className="border-border">
              <CardContent className="p-5 space-y-5">
                <div>
                  <h3 className="text-[14px] font-medium">General Settings</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Basic platform configuration</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-medium">Platform Name</label>
                    <Input defaultValue="Sukoon Insurance" className="h-9 text-[13px]" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-medium">Support Email</label>
                    <Input defaultValue="support@sukoon.om" className="h-9 text-[13px]" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-medium">Default Currency</label>
                    <Input defaultValue="OMR" readOnly className="h-9 text-[13px] bg-muted" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-medium">Timezone</label>
                    <Input defaultValue="Asia/Muscat (GMT+4)" readOnly className="h-9 text-[13px] bg-muted" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider">Default Branding</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-medium">Primary Color</label>
                      <div className="flex items-center gap-2">
                        <div className="size-8 rounded-md bg-primary border border-border" />
                        <Input defaultValue="#7C3AED" className="h-8 w-32 text-[12px] font-mono" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-medium">Accent Color</label>
                      <div className="flex items-center gap-2">
                        <div className="size-8 rounded-md bg-orange-600 border border-border" />
                        <Input defaultValue="#EA580C" className="h-8 w-32 text-[12px] font-mono" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button size="sm" className="h-8 text-[12px] gap-1.5" onClick={handleSave}>
                    <Save size={13} />
                    {saved ? 'Saved!' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {tab === 'security' && (
            <Card className="border-border">
              <CardContent className="p-5 space-y-5">
                <div>
                  <h3 className="text-[14px] font-medium">Security Settings</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Authentication and access control</p>
                </div>

                <div className="space-y-4">
                  {[
                    ['Two-Factor Authentication', 'Require 2FA for all admin users', true],
                    ['Session Timeout', 'Auto-logout after 30 minutes of inactivity', true],
                    ['IP Whitelisting', 'Restrict admin access to specific IPs', false],
                    ['Audit Logging', 'Log all admin actions for compliance', true],
                  ].map(([title, desc, enabled]) => (
                    <div key={title} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                      <div>
                        <div className="text-[13px] font-medium">{title}</div>
                        <div className="text-[11px] text-muted-foreground">{desc}</div>
                      </div>
                      <div className={`w-9 h-5 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${enabled ? 'bg-primary justify-end' : 'bg-muted justify-start'}`}>
                        <div className="size-4 rounded-full bg-white shadow-sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {tab === 'notifications' && (
            <Card className="border-border">
              <CardContent className="p-5 space-y-5">
                <div>
                  <h3 className="text-[14px] font-medium">Notification Preferences</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Choose what triggers email and in-app alerts</p>
                </div>

                <div className="space-y-4">
                  {[
                    ['New Affiliate Registration', true, true],
                    ['Policy Issued', false, true],
                    ['Reinsurance Agreement Expiry', true, true],
                    ['Commission Payout', true, false],
                    ['Affiliate Status Change', true, true],
                  ].map(([title, email, inApp]) => (
                    <div key={title} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                      <span className="text-[13px]">{title}</span>
                      <div className="flex items-center gap-4 text-[11px]">
                        <label className="flex items-center gap-1.5 text-muted-foreground">
                          <div className={`size-3.5 rounded border flex items-center justify-center ${email ? 'bg-primary border-primary text-white' : 'border-input'}`}>
                            {email && <span className="text-[8px]">✓</span>}
                          </div>
                          Email
                        </label>
                        <label className="flex items-center gap-1.5 text-muted-foreground">
                          <div className={`size-3.5 rounded border flex items-center justify-center ${inApp ? 'bg-primary border-primary text-white' : 'border-input'}`}>
                            {inApp && <span className="text-[8px]">✓</span>}
                          </div>
                          In-App
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {tab === 'users' && (
            <Card className="border-border">
              <CardContent className="p-5 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[14px] font-medium">Admin Users</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Manage who has access to the Super Admin portal</p>
                  </div>
                  <Button size="sm" className="h-7 text-[11px]">Add User</Button>
                </div>

                <div className="space-y-2">
                  {[
                    { name: 'Sarah Al-Maskari', email: 'sarah@sukoon.om', role: 'Super Admin', lastLogin: '22 Jun 2026, 09:15' },
                    { name: 'Omar Al-Rashidi', email: 'omar@sukoon.om', role: 'Admin', lastLogin: '22 Jun 2026, 08:30' },
                    { name: 'Maryam Al-Habsi', email: 'maryam@sukoon.om', role: 'Viewer', lastLogin: '21 Jun 2026, 14:20' },
                  ].map(u => (
                    <div key={u.email} className="flex items-center justify-between p-3 rounded-md border border-border">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-muted flex items-center justify-center text-[11px] font-semibold text-muted-foreground">
                          {u.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-[13px] font-medium">{u.name}</div>
                          <div className="text-[11px] text-muted-foreground">{u.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[11px] text-muted-foreground">Last login: {u.lastLogin}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                          u.role === 'Super Admin' ? 'bg-primary/10 text-primary' : u.role === 'Admin' ? 'bg-blue-50 text-blue-600' : 'bg-muted text-muted-foreground'
                        }`}>{u.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
