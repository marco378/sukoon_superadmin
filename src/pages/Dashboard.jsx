import { Link } from 'react-router-dom'
import { Building2, FileCheck, Package, TrendingUp, ArrowUpRight, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx'

const stats = [
  { label: 'Active Affiliates', value: '12', change: '+2 this quarter', icon: Building2 },
  { label: 'Total Policies', value: '1,847', change: '+156 this month', icon: FileCheck },
  { label: 'Active Products', value: '3', change: 'UCL, CI, Cyber', icon: Package },
  { label: 'Monthly Premium', value: '284K OMR', change: '+12.3% vs last month', icon: TrendingUp },
]

const recentPolicies = [
  { id: 'POL-2026-1847', affiliate: 'National Bank', product: 'UCL', customer: 'Ahmed Al-Rashidi', premium: '2,450.000', date: '22 Jun 2026', status: 'Active' },
  { id: 'POL-2026-1846', affiliate: 'Ahli Bank', product: 'Critical Illness', customer: 'Fatima Al-Habsi', premium: '1,200.000', date: '22 Jun 2026', status: 'Active' },
  { id: 'POL-2026-1845', affiliate: 'Direct Sales', product: 'UCL', customer: 'Mohammed Al-Siyabi', premium: '3,100.000', date: '21 Jun 2026', status: 'Active' },
  { id: 'POL-2026-1844', affiliate: 'United Finance', product: 'Cyber Insurance', customer: 'Sara Al-Lawati', premium: '850.000', date: '21 Jun 2026', status: 'Pending' },
  { id: 'POL-2026-1843', affiliate: 'National Bank', product: 'UCL', customer: 'Khalid Al-Farsi', premium: '4,200.000', date: '20 Jun 2026', status: 'Active' },
]

const topAffiliates = [
  { name: 'National Bank', policies: 412, premium: '98,400', growth: '+15%' },
  { name: 'Ahli Bank', policies: 298, premium: '67,200', growth: '+8%' },
  { name: 'Direct Sales', policies: 245, premium: '55,800', growth: '+22%' },
  { name: 'United Finance', policies: 189, premium: '42,100', growth: '+5%' },
]

const alerts = [
  { text: 'Capital Housing Bank — rates pending configuration', type: 'warning' },
  { text: 'Suhail Bahwan Group — reinsurance agreement expiring in 15 days', type: 'warning' },
]

const statusColor = {
  'Active': 'text-emerald-600 bg-emerald-50 border-emerald-200',
  'Pending': 'text-yellow-600 bg-yellow-50 border-yellow-200',
  'Suspended': 'text-red-600 bg-red-50 border-red-200',
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">Platform overview and affiliate performance</p>
      </div>

      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((a, i) => (
            <div key={i} className="flex items-center gap-2.5 px-3 py-2 rounded-md bg-yellow-50 border border-yellow-200 text-[12px] text-yellow-700">
              <AlertCircle size={13} />
              {a.text}
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {stats.map(({ label, value, change, icon: Icon }) => (
          <Card key={label} className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
                <Icon size={14} className="text-muted-foreground" />
              </div>
              <div className="text-2xl font-semibold tracking-tight">{value}</div>
              <p className="text-[12px] text-muted-foreground mt-1">{change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[14px] font-medium">Recent Policies</CardTitle>
                <Link to="/policies" className="text-[12px] text-primary hover:underline flex items-center gap-0.5">
                  View all <ArrowUpRight size={11} />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-[11px] h-8">Policy ID</TableHead>
                    <TableHead className="text-[11px] h-8">Affiliate</TableHead>
                    <TableHead className="text-[11px] h-8">Product</TableHead>
                    <TableHead className="text-[11px] h-8">Customer</TableHead>
                    <TableHead className="text-[11px] h-8 text-right">Premium (OMR)</TableHead>
                    <TableHead className="text-[11px] h-8 text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentPolicies.map(p => (
                    <TableRow key={p.id} className="border-border">
                      <TableCell className="text-[13px] font-mono text-primary py-2.5">{p.id}</TableCell>
                      <TableCell className="text-[13px] py-2.5">{p.affiliate}</TableCell>
                      <TableCell className="text-[13px] text-muted-foreground py-2.5">{p.product}</TableCell>
                      <TableCell className="text-[13px] py-2.5">{p.customer}</TableCell>
                      <TableCell className="text-[13px] text-right tabular-nums font-medium py-2.5">{p.premium}</TableCell>
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
        </div>

        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-[14px] font-medium">Top Affiliates</CardTitle>
              <Link to="/affiliates" className="text-[12px] text-primary hover:underline flex items-center gap-0.5">
                View all <ArrowUpRight size={11} />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              {topAffiliates.map((a, i) => (
                <div key={a.name} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] font-medium text-muted-foreground w-4">{i + 1}.</span>
                    <div>
                      <div className="text-[13px] font-medium">{a.name}</div>
                      <div className="text-[11px] text-muted-foreground">{a.policies} policies · {a.premium} OMR</div>
                    </div>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-medium">{a.growth}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
