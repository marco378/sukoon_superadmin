import { useState } from 'react'
import { Download, Filter, Search } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx'
import { Input } from '@/components/ui/input.jsx'

const policies = [
  { id: 'POL-2026-1847', affiliate: 'National Bank', product: 'UCL', customer: 'Ahmed Al-Rashidi', premium: '2,450.000', loanAmt: '50,000.000', date: '22 Jun 2026', expiry: '22 Jun 2036', status: 'Active' },
  { id: 'POL-2026-1846', affiliate: 'Ahli Bank', product: 'Critical Illness', customer: 'Fatima Al-Habsi', premium: '1,200.000', loanAmt: '—', date: '22 Jun 2026', expiry: '22 Jun 2027', status: 'Active' },
  { id: 'POL-2026-1845', affiliate: 'Direct Sales', product: 'UCL', customer: 'Mohammed Al-Siyabi', premium: '3,100.000', loanAmt: '75,000.000', date: '21 Jun 2026', expiry: '21 Jun 2041', status: 'Active' },
  { id: 'POL-2026-1844', affiliate: 'United Finance', product: 'Cyber Insurance', customer: 'Sara Al-Lawati', premium: '850.000', loanAmt: '—', date: '21 Jun 2026', expiry: '21 Jun 2027', status: 'Pending' },
  { id: 'POL-2026-1843', affiliate: 'National Bank', product: 'UCL', customer: 'Khalid Al-Farsi', premium: '4,200.000', loanAmt: '120,000.000', date: '20 Jun 2026', expiry: '20 Jun 2046', status: 'Active' },
  { id: 'POL-2026-1842', affiliate: 'Agent Network', product: 'UCL', customer: 'Layla Al-Kindi', premium: '1,950.000', loanAmt: '40,000.000', date: '20 Jun 2026', expiry: '20 Jun 2041', status: 'Active' },
  { id: 'POL-2026-1841', affiliate: 'Gulf Insurance Brokers', product: 'Critical Illness', customer: 'Hassan Al-Riyami', premium: '980.000', loanAmt: '—', date: '19 Jun 2026', expiry: '19 Jun 2027', status: 'Active' },
  { id: 'POL-2026-1840', affiliate: 'Ahli Bank', product: 'UCL', customer: 'Noor Al-Balushi', premium: '2,800.000', loanAmt: '65,000.000', date: '19 Jun 2026', expiry: '19 Jun 2039', status: 'Active' },
  { id: 'POL-2026-1839', affiliate: 'Suhail Bahwan Group', product: 'Cyber Insurance', customer: 'Rashid Al-Maskari', premium: '1,100.000', loanAmt: '—', date: '18 Jun 2026', expiry: '18 Jun 2027', status: 'Active' },
  { id: 'POL-2026-1838', affiliate: 'National Bank', product: 'UCL', customer: 'Aisha Al-Amri', premium: '1,800.000', loanAmt: '35,000.000', date: '18 Jun 2026', expiry: '18 Jun 2036', status: 'Active' },
]

const statusColor = {
  'Active': 'text-emerald-600 bg-emerald-50 border-emerald-200',
  'Pending': 'text-yellow-600 bg-yellow-50 border-yellow-200',
  'Expired': 'text-red-600 bg-red-50 border-red-200',
  'Cancelled': 'text-gray-600 bg-gray-50 border-gray-200',
}

const summaryStats = [
  { label: 'Total Policies', value: '1,847' },
  { label: 'Active', value: '1,792' },
  { label: 'Pending', value: '38' },
  { label: 'Total Premium', value: '284,400 OMR' },
]

export default function Policies() {
  const [search, setSearch] = useState('')
  const [productFilter, setProductFilter] = useState('all')

  const filtered = policies.filter(p => {
    if (productFilter !== 'all' && p.product !== productFilter) return false
    if (search && !p.customer.toLowerCase().includes(search.toLowerCase()) && !p.id.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Policies</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">All policies across affiliates and products</p>
        </div>
        <Button variant="secondary" size="sm" className="h-8 text-[12px] gap-1.5">
          <Download size={13} /> Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {summaryStats.map(({ label, value }) => (
          <Card key={label} className="border-border">
            <CardContent className="p-4">
              <span className="text-[12px] text-muted-foreground">{label}</span>
              <div className="text-xl font-semibold tracking-tight mt-1">{value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-[14px] font-medium">All Policies</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="h-8 w-44 pl-8 text-[12px]"
                />
              </div>
              <select
                value={productFilter}
                onChange={e => setProductFilter(e.target.value)}
                className="h-8 rounded-md border border-input bg-background px-2 text-[12px] text-foreground"
              >
                <option value="all">All Products</option>
                <option value="UCL">UCL</option>
                <option value="Critical Illness">Critical Illness</option>
                <option value="Cyber Insurance">Cyber Insurance</option>
              </select>
            </div>
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
                <TableHead className="text-[11px] h-8">Issued</TableHead>
                <TableHead className="text-[11px] h-8">Expiry</TableHead>
                <TableHead className="text-[11px] h-8 text-right">Status</TableHead>
                <TableHead className="text-[11px] h-8 w-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(p => (
                <TableRow key={p.id} className="border-border group">
                  <TableCell className="text-[13px] font-mono text-primary py-2.5">{p.id}</TableCell>
                  <TableCell className="text-[13px] py-2.5">{p.affiliate}</TableCell>
                  <TableCell className="py-2.5">
                    <span className="text-[11px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{p.product}</span>
                  </TableCell>
                  <TableCell className="text-[13px] py-2.5">{p.customer}</TableCell>
                  <TableCell className="text-[13px] text-right tabular-nums font-medium py-2.5">{p.premium}</TableCell>
                  <TableCell className="text-[13px] text-muted-foreground py-2.5">{p.date}</TableCell>
                  <TableCell className="text-[13px] text-muted-foreground py-2.5">{p.expiry}</TableCell>
                  <TableCell className="text-right py-2.5">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium border ${statusColor[p.status]}`}>
                      {p.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-primary hover:underline">
                      <Download size={13} className="text-muted-foreground" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
