import { Shield, Heart, Laptop, ArrowUpRight, FileText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx'
import { Separator } from '@/components/ui/separator.jsx'

const products = [
  {
    name: 'Unified Credit Life (UCL)',
    code: 'UCL',
    icon: Shield,
    description: 'Life cover protecting bank loans — pays outstanding balance if borrower passes away or becomes disabled.',
    status: 'Active',
    affiliates: 10,
    policies: 1289,
    premium: '198,600.000',
    reinsurer: 'Gen Re / Munich Re / Lockton',
    workflow: ['Quote Request', 'Medical Tests (MTRF)', 'Underwriting', 'Policy Issuance', 'Policy Download'],
  },
  {
    name: 'Critical Illness',
    code: 'CI',
    icon: Heart,
    description: 'Lump-sum payout on diagnosis of covered critical illnesses — cancer, heart attack, stroke, etc.',
    status: 'Active',
    affiliates: 5,
    policies: 358,
    premium: '52,400.000',
    reinsurer: 'Gen Re',
    workflow: ['Quote Request', 'Medical Declaration', 'Underwriting', 'Policy Issuance', 'Policy Download'],
  },
  {
    name: 'Cyber Insurance',
    code: 'CYBER',
    icon: Laptop,
    description: 'Coverage for data breaches, cyber attacks, business interruption, and third-party liability.',
    status: 'Active',
    affiliates: 3,
    policies: 200,
    premium: '33,400.000',
    reinsurer: 'Gen Re / Lockton',
    workflow: ['Risk Assessment', 'Quote Generation', 'Review & Approve', 'Policy Issuance', 'Policy Download'],
  },
]

const statusColor = {
  'Active': 'text-emerald-600 bg-emerald-50 border-emerald-200',
  'Draft': 'text-yellow-600 bg-yellow-50 border-yellow-200',
  'Inactive': 'text-red-600 bg-red-50 border-red-200',
}

export default function Products() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Products</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">Insurance products available for white-label distribution</p>
      </div>

      <div className="space-y-4">
        {products.map(p => (
          <Card key={p.code} className="border-border">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <p.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-[14px] font-semibold">{p.name}</h3>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${statusColor[p.status]}`}>{p.status}</span>
                    </div>
                    <p className="text-[12px] text-muted-foreground mt-0.5 max-w-xl">{p.description}</p>
                  </div>
                </div>
                <Button variant="secondary" size="sm" className="h-7 text-[11px] gap-1 shrink-0">
                  <FileText size={11} /> View Details
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4">
                {[
                  ['Affiliates', p.affiliates],
                  ['Total Policies', p.policies.toLocaleString()],
                  ['Premium (OMR)', p.premium],
                  ['Reinsurer', p.reinsurer],
                ].map(([label, val]) => (
                  <div key={label} className="bg-muted/50 rounded-md px-3 py-2">
                    <div className="text-[11px] text-muted-foreground">{label}</div>
                    <div className="text-[13px] font-medium mt-0.5 tabular-nums">{val}</div>
                  </div>
                ))}
              </div>

              <div>
                <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">Workflow</div>
                <div className="flex items-center gap-1">
                  {p.workflow.map((step, i) => (
                    <div key={step} className="flex items-center gap-1">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted text-[11px] font-medium">
                        <span className="text-[10px] text-muted-foreground">{i + 1}</span>
                        {step}
                      </div>
                      {i < p.workflow.length - 1 && (
                        <ArrowUpRight size={11} className="text-muted-foreground/40 rotate-45" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
