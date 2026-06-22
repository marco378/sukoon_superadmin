import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Building2, Globe, Check, Copy, ExternalLink, Download } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx'
import { loadAffiliates, buildAffiliateDetail } from '@/lib/affiliates.js'

const richData = {
  'aff-1': {
    beneficiaries: 'Only National Bank customers',
    recentPolicies: [
      { id: 'POL-2026-1847', customer: 'Ahmed Al-Rashidi', product: 'UCL', premium: '2,450.000', date: '22 Jun 2026', status: 'Active' },
      { id: 'POL-2026-1843', customer: 'Khalid Al-Farsi', product: 'UCL', premium: '4,200.000', date: '20 Jun 2026', status: 'Active' },
      { id: 'POL-2026-1838', customer: 'Noor Al-Balushi', product: 'UCL', premium: '1,800.000', date: '18 Jun 2026', status: 'Active' },
      { id: 'POL-2026-1830', customer: 'Yusuf Al-Kindi', product: 'UCL', premium: '3,600.000', date: '15 Jun 2026', status: 'Active' },
    ],
  },
}

const fallbackRich = {
  beneficiaries: '',
  recentPolicies: [],
}

const statusColor = {
  'Active': 'text-emerald-600 bg-emerald-50 border-emerald-200',
  'Pending Setup': 'text-yellow-600 bg-yellow-50 border-yellow-200',
  'Suspended': 'text-red-600 bg-red-50 border-red-200',
}

export default function AffiliateDetail() {
  const { id } = useParams()
  const [tab, setTab] = useState('overview')
  const [copied, setCopied] = useState(false)

  const affiliates = loadAffiliates()
  const affiliate = affiliates.find(a => a.id === id)

  if (!affiliate) {
    return (
      <div className="space-y-5">
        <Link to="/affiliates" className="inline-flex items-center gap-1 text-[12px] text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={13} /> All Affiliates
        </Link>
        <div className="text-center py-16">
          <Building2 size={32} className="mx-auto mb-3 text-muted-foreground/40" />
          <p className="text-[14px] text-muted-foreground">Affiliate not found</p>
        </div>
      </div>
    )
  }

  const extra = richData[id] || { ...fallbackRich, beneficiaries: `Only ${affiliate.name} customers` }
  const data = { ...buildAffiliateDetail(affiliate), ...extra }

  const tabs = ['overview', 'branding', 'products', 'policies']

  const copyUrl = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-5">
      <Link to="/affiliates" className="inline-flex items-center gap-1 text-[12px] text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft size={13} /> All Affiliates
      </Link>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-muted flex items-center justify-center">
            <Building2 size={18} className="text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">{data.name}</h1>
            <p className="text-[13px] text-muted-foreground mt-0.5">{data.type} · Since {data.since}</p>
          </div>
        </div>
        <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${statusColor[data.status]}`}>
          {data.status}
        </span>
      </div>

      <Card className="border-border">
        <CardContent className="py-3 px-5">
          <div className="flex items-center gap-2 text-[13px]">
            <Globe size={13} className="text-muted-foreground" />
            <span className="text-muted-foreground">White-label URL:</span>
            <code className="text-[12px] bg-muted px-2 py-0.5 rounded font-mono">{data.portalUrl}</code>
            <button onClick={copyUrl} className="text-muted-foreground hover:text-foreground transition-colors">
              {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors ml-1">
              <ExternalLink size={13} />
            </button>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-0.5 bg-muted rounded-lg p-0.5 w-fit">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-md text-[12px] font-medium capitalize transition-colors ${
              tab === t ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-border">
            <CardContent className="p-5">
              <h3 className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider mb-3">Configuration</h3>
              <div className="space-y-2.5">
                {[
                  ['Channel', data.type],
                  ['Reinsurer', data.reinsurer],
                  ['Commission', data.commission],
                  ['Beneficiaries', data.beneficiaries],
                  ['Active Since', data.since],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-[13px] py-1 border-b border-border/50 last:border-0">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-5">
              <h3 className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider mb-3">Performance</h3>
              <div className="space-y-2.5">
                {[
                  ['Total Policies', data.stats.totalPolicies],
                  ['Active Policies', data.stats.activePolicies],
                  ['Total Premium', data.stats.totalPremium + ' OMR'],
                  ['Avg. Premium', data.stats.avgPremium + ' OMR'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-[13px] py-1 border-b border-border/50 last:border-0">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium tabular-nums">{v}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === 'branding' && (
        <Card className="border-border">
          <CardContent className="p-5 space-y-6">
            <div>
              <h3 className="text-[14px] font-medium">White-Label Branding</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">Customize the affiliate's portal appearance</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium">Logo</label>
                  <div className="h-24 rounded-md border-2 border-dashed border-border flex items-center justify-center">
                    {data.branding.logo ? (
                      <div className="text-center">
                        <img src={data.branding.logo} alt={`${data.name} logo`} className="h-16 w-16 rounded-md object-cover mx-auto mb-1" />
                        <span className="text-[11px] text-muted-foreground">{data.branding.logoName}</span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="size-10 mx-auto rounded-md bg-muted flex items-center justify-center mb-1">
                          <Building2 size={18} className="text-muted-foreground" />
                        </div>
                        <span className="text-[11px] text-muted-foreground">{data.branding.logoName}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium">Primary Color</label>
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-md border border-border" style={{ backgroundColor: data.branding.primaryColor }} />
                    <Input value={data.branding.primaryColor} readOnly className="h-8 w-32 text-[12px] font-mono" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium">Secondary Color</label>
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-md border border-border" style={{ backgroundColor: data.branding.secondaryColor }} />
                    <Input value={data.branding.secondaryColor} readOnly className="h-8 w-32 text-[12px] font-mono" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-medium">Preview</label>
                <div className="rounded-lg border border-border overflow-hidden">
                  <div className="h-10 flex items-center px-3 gap-2" style={{ backgroundColor: data.branding.primaryColor }}>
                    {data.branding.logo ? (
                      <img src={data.branding.logo} alt="" className="size-5 rounded object-cover" />
                    ) : (
                      <div className="size-5 rounded bg-white/20" />
                    )}
                    <span className="text-[12px] text-white font-medium">{data.name}</span>
                  </div>
                  <div className="p-4 bg-gray-50 space-y-2">
                    <div className="h-3 w-32 rounded bg-gray-200" />
                    <div className="h-3 w-48 rounded bg-gray-200" />
                    <div className="flex gap-2 mt-3">
                      <div className="h-7 w-20 rounded text-[10px] text-white flex items-center justify-center font-medium" style={{ backgroundColor: data.branding.primaryColor }}>
                        Get Quote
                      </div>
                      <div className="h-7 w-20 rounded text-[10px] flex items-center justify-center font-medium border" style={{ borderColor: data.branding.primaryColor, color: data.branding.primaryColor }}>
                        Learn More
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground mt-2">This is how the affiliate's portal header and buttons will appear to their customers.</p>
              </div>
            </div>

            <Separator />

            <div className="flex justify-end">
              <Button size="sm" className="h-8 text-[12px]">Save Branding</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {tab === 'products' && (
        <Card className="border-border">
          <CardContent className="p-5 space-y-4">
            <div>
              <h3 className="text-[14px] font-medium">Assigned Products</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">Choose which products this affiliate can sell</p>
            </div>

            <div className="space-y-3">
              {data.products.map(p => (
                <div key={p.name} className={`flex items-center justify-between p-4 rounded-lg border ${p.enabled ? 'border-primary/30 bg-primary/5' : 'border-border'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`size-5 rounded border flex items-center justify-center ${
                      p.enabled ? 'bg-primary border-primary text-primary-foreground' : 'border-input'
                    }`}>
                      {p.enabled && <Check size={11} />}
                    </div>
                    <div>
                      <div className="text-[13px] font-medium">{p.name}</div>
                      <div className="text-[11px] text-muted-foreground">
                        {p.name === 'UCL' && 'Unified Credit Life — loan protection cover'}
                        {p.name === 'Critical Illness' && 'Critical illness coverage — lump sum on diagnosis'}
                        {p.name === 'Cyber Insurance' && 'Cyber risk coverage — data breach & liability'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[13px] font-medium tabular-nums">{p.policies} policies</div>
                    <div className="text-[11px] text-muted-foreground tabular-nums">{p.premium} OMR</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {tab === 'policies' && (
        <Card className="border-border">
          <CardContent className="p-0">
            <div className="px-5 py-3 border-b border-border flex items-center justify-between">
              <h3 className="text-[14px] font-medium">Recent Policies</h3>
              <Button variant="secondary" size="sm" className="h-7 text-[11px] gap-1">
                <Download size={11} /> Export
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-[11px] h-8">Policy ID</TableHead>
                  <TableHead className="text-[11px] h-8">Customer</TableHead>
                  <TableHead className="text-[11px] h-8">Product</TableHead>
                  <TableHead className="text-[11px] h-8 text-right">Premium (OMR)</TableHead>
                  <TableHead className="text-[11px] h-8">Date</TableHead>
                  <TableHead className="text-[11px] h-8 text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.recentPolicies.map(p => (
                  <TableRow key={p.id} className="border-border">
                    <TableCell className="text-[13px] font-mono text-primary py-2.5">{p.id}</TableCell>
                    <TableCell className="text-[13px] py-2.5">{p.customer}</TableCell>
                    <TableCell className="text-[13px] text-muted-foreground py-2.5">{p.product}</TableCell>
                    <TableCell className="text-[13px] text-right tabular-nums font-medium py-2.5">{p.premium}</TableCell>
                    <TableCell className="text-[13px] text-muted-foreground py-2.5">{p.date}</TableCell>
                    <TableCell className="text-right py-2.5">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium border ${statusColor[p.status]}`}>
                        {p.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
