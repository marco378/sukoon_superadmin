import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Plus, ArrowUpRight, Building2, X, Check, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { loadAffiliates, saveAffiliates } from '@/lib/affiliates.js'

const statusColor = {
  'Active': 'text-emerald-600 bg-emerald-50 border-emerald-200',
  'Pending Setup': 'text-yellow-600 bg-yellow-50 border-yellow-200',
  'Suspended': 'text-red-600 bg-red-50 border-red-200',
}

const channelColor = {
  'Bancassurance': 'text-blue-600 bg-blue-50',
  'Broker': 'text-purple-600 bg-purple-50',
  'Direct': 'text-orange-600 bg-orange-50',
  'Agent': 'text-emerald-600 bg-emerald-50',
}

const allProducts = ['UCL', 'Critical Illness', 'Cyber Insurance']

export default function Affiliates() {
  const [affiliates, setAffiliates] = useState(loadAffiliates)
  const [showModal, setShowModal] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', type: 'Bancassurance', channel: 'Bancassurance', reinsurer: '', commission: '', primaryColor: '#6B21A8', secondaryColor: '#EA580C', products: [], logo: null })
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState({})
  const fileInputRef = useRef(null)

  useEffect(() => { saveAffiliates(affiliates) }, [affiliates])

  const updateForm = (key, val) => {
    setForm(prev => ({ ...prev, [key]: val }))
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }))
  }
  const toggleProduct = (p) => setForm(prev => ({
    ...prev,
    products: prev.products.includes(p) ? prev.products.filter(x => x !== p) : [...prev.products, p]
  }))

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, logo: 'Please upload an image file' }))
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, logo: 'Image must be under 2MB' }))
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      updateForm('logo', { dataUrl: ev.target.result, name: file.name })
      setErrors(prev => ({ ...prev, logo: '' }))
    }
    reader.readAsDataURL(file)
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Affiliate name is required'
    else if (affiliates.some(a => a.name.toLowerCase() === form.name.trim().toLowerCase())) e.name = 'An affiliate with this name already exists'
    if (form.commission && !/^\d+(\.\d+)?%?$|^[A-Za-z\s]+$/.test(form.commission.trim())) e.commission = 'Invalid commission format (e.g. 10% or TPD)'
    if (!form.reinsurer) e.reinsurer = 'Please select a reinsurer'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleCreate = () => {
    if (!validate()) return
    setSaved(true)
    setTimeout(() => {
      const now = new Date()
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const newAffiliate = {
        id: `aff-${Date.now()}`,
        name: form.name.trim(),
        type: form.type,
        channel: form.channel,
        reinsurer: form.reinsurer,
        products: form.products.length ? form.products : ['UCL'],
        commission: form.commission.trim() || 'TBD',
        policies: 0,
        status: 'Pending Setup',
        since: `${monthNames[now.getMonth()]} ${now.getFullYear()}`,
        primaryColor: form.primaryColor,
        secondaryColor: form.secondaryColor,
        logo: form.logo,
      }
      setAffiliates(prev => [newAffiliate, ...prev])
      setShowModal(false)
      setStep(1)
      setForm({ name: '', type: 'Bancassurance', channel: 'Bancassurance', reinsurer: '', commission: '', primaryColor: '#6B21A8', secondaryColor: '#EA580C', products: [], logo: null })
      setErrors({})
      setSaved(false)
    }, 1200)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Affiliates</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">Manage distribution partners and white-label configurations</p>
        </div>
        <Button size="sm" className="h-8 text-[13px] gap-1.5" onClick={() => setShowModal(true)}>
          <Plus size={14} /> Add Affiliate
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          ['Total Affiliates', affiliates.length],
          ['Active', affiliates.filter(a => a.status === 'Active').length],
          ['Pending Setup', affiliates.filter(a => a.status === 'Pending Setup').length],
          ['Total Policies', affiliates.reduce((s, a) => s + a.policies, 0).toLocaleString()],
        ].map(([label, val]) => (
          <Card key={label} className="border-border">
            <CardContent className="p-4">
              <span className="text-[12px] text-muted-foreground">{label}</span>
              <div className="text-xl font-semibold tracking-tight mt-1">{val}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-[14px] font-medium">All Affiliates</CardTitle>
            <Input placeholder="Filter affiliates..." className="h-8 w-56 text-[12px]" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-[11px] h-8">Affiliate</TableHead>
                <TableHead className="text-[11px] h-8">Channel</TableHead>
                <TableHead className="text-[11px] h-8">Reinsurer</TableHead>
                <TableHead className="text-[11px] h-8">Products</TableHead>
                <TableHead className="text-[11px] h-8">Commission</TableHead>
                <TableHead className="text-[11px] h-8 text-right">Policies</TableHead>
                <TableHead className="text-[11px] h-8 text-right">Status</TableHead>
                <TableHead className="text-[11px] h-8 w-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {affiliates.map(a => (
                <TableRow key={a.id} className="border-border group">
                  <TableCell className="py-2.5">
                    <Link to={`/affiliates/${a.id}`} className="hover:underline">
                      <div className="flex items-center gap-2">
                        <div className="size-7 rounded-md bg-muted flex items-center justify-center">
                          <Building2 size={13} className="text-muted-foreground" />
                        </div>
                        <div>
                          <div className="text-[13px] font-medium">{a.name}</div>
                          <div className="text-[11px] text-muted-foreground">{a.type} · Since {a.since}</div>
                        </div>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <span className={`text-[11px] px-1.5 py-0.5 rounded ${channelColor[a.channel] || 'bg-muted text-muted-foreground'}`}>{a.channel}</span>
                  </TableCell>
                  <TableCell className="text-[13px] text-muted-foreground py-2.5">{a.reinsurer}</TableCell>
                  <TableCell className="py-2.5">
                    <div className="flex flex-wrap gap-1">
                      {a.products.map(p => (
                        <span key={p} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{p}</span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-[13px] tabular-nums py-2.5">{a.commission}</TableCell>
                  <TableCell className="text-[13px] text-right tabular-nums font-medium py-2.5">{a.policies}</TableCell>
                  <TableCell className="text-right py-2.5">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium border ${statusColor[a.status]}`}>
                      {a.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <Link to={`/affiliates/${a.id}`} className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight size={13} className="text-muted-foreground" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => { setShowModal(false); setStep(1) }} />
          <div className="relative bg-background rounded-lg border border-border shadow-lg w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 pb-0">
              <div>
                <h2 className="text-[16px] font-semibold">Add New Affiliate</h2>
                <p className="text-[12px] text-muted-foreground mt-0.5">Step {step} of 3 — {step === 1 ? 'Basic Info' : step === 2 ? 'Products & Branding' : 'Review & Create'}</p>
              </div>
              <button onClick={() => { setShowModal(false); setStep(1) }} className="text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            </div>

            <div className="flex items-center gap-1 px-5 pt-3">
              {[1, 2, 3].map(s => (
                <div key={s} className={`h-1 flex-1 rounded-full ${s <= step ? 'bg-primary' : 'bg-muted'}`} />
              ))}
            </div>

            <div className="p-5 space-y-4">
              {step === 1 && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-medium">Affiliate Name *</label>
                    <Input value={form.name} onChange={e => updateForm('name', e.target.value)} placeholder="e.g. Gulf National Bank" className={`h-9 text-[13px] ${errors.name ? 'border-red-500' : ''}`} />
                    {errors.name && <p className="text-[11px] text-red-500">{errors.name}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-medium">Channel Type</label>
                      <select value={form.channel} onChange={e => updateForm('channel', e.target.value)} className="w-full h-9 rounded-md border border-input bg-background px-3 text-[13px]">
                        <option value="Bancassurance">Bancassurance</option>
                        <option value="Broker">Broker</option>
                        <option value="Agent">Agent</option>
                        <option value="Direct">Direct Sales</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-medium">Partner Type</label>
                      <select value={form.type} onChange={e => updateForm('type', e.target.value)} className="w-full h-9 rounded-md border border-input bg-background px-3 text-[13px]">
                        <option value="Bancassurance">Bancassurance</option>
                        <option value="Broker">Broker</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Finance Co">Finance Company</option>
                        <option value="Agent">Agent</option>
                        <option value="Internal">Internal</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-medium">Reinsurer</label>
                      <select value={form.reinsurer} onChange={e => updateForm('reinsurer', e.target.value)} className={`w-full h-9 rounded-md border bg-background px-3 text-[13px] ${errors.reinsurer ? 'border-red-500' : 'border-input'}`}>
                        <option value="">Select...</option>
                        <option value="Gen Re">Gen Re</option>
                        <option value="Munich Re">Munich Re</option>
                        <option value="Lockton">Lockton</option>
                      </select>
                      {errors.reinsurer && <p className="text-[11px] text-red-500">{errors.reinsurer}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-medium">Commission</label>
                      <Input value={form.commission} onChange={e => updateForm('commission', e.target.value)} placeholder="e.g. 10% or TPD" className={`h-9 text-[13px] ${errors.commission ? 'border-red-500' : ''}`} />
                      {errors.commission && <p className="text-[11px] text-red-500">{errors.commission}</p>}
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <label className="text-[12px] font-medium">Assign Products</label>
                    <p className="text-[11px] text-muted-foreground mb-2">Select which products this affiliate can sell</p>
                    <div className="space-y-2">
                      {allProducts.map(p => (
                        <button
                          key={p}
                          onClick={() => toggleProduct(p)}
                          className={`flex items-center gap-3 w-full p-3 rounded-lg border text-left transition-colors ${
                            form.products.includes(p) ? 'border-primary/30 bg-primary/5' : 'border-border hover:bg-muted/50'
                          }`}
                        >
                          <div className={`size-4.5 rounded border flex items-center justify-center shrink-0 ${
                            form.products.includes(p) ? 'bg-primary border-primary text-white' : 'border-input'
                          }`}>
                            {form.products.includes(p) && <Check size={10} />}
                          </div>
                          <div>
                            <div className="text-[13px] font-medium">{p}</div>
                            <div className="text-[11px] text-muted-foreground">
                              {p === 'UCL' && 'Unified Credit Life — loan protection cover'}
                              {p === 'Critical Illness' && 'Critical illness coverage — lump sum on diagnosis'}
                              {p === 'Cyber Insurance' && 'Cyber risk coverage — data breach & liability'}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <label className="text-[12px] font-medium">White-Label Branding</label>
                    <p className="text-[11px] text-muted-foreground mb-2">Configure how the affiliate's portal will look</p>
                    <div className="space-y-3">
                      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className={`h-20 rounded-md border-2 border-dashed flex items-center justify-center cursor-pointer transition-colors ${
                          form.logo ? 'border-primary/30 bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-primary/5'
                        }`}
                      >
                        {form.logo ? (
                          <div className="flex items-center gap-2 px-3">
                            <img src={form.logo.dataUrl} alt="Logo preview" className="h-12 w-12 rounded object-cover" />
                            <div className="text-left">
                              <div className="text-[12px] font-medium truncate max-w-[140px]">{form.logo.name}</div>
                              <div className="text-[11px] text-muted-foreground">Click to replace</div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Upload size={16} className="mx-auto mb-1 text-muted-foreground/40" />
                            <span className="text-[11px] text-muted-foreground">Upload affiliate logo</span>
                          </div>
                        )}
                      </button>
                      {errors.logo && <p className="text-[11px] text-red-500">{errors.logo}</p>}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[11px] text-muted-foreground">Primary Color</label>
                          <div className="flex items-center gap-2">
                            <input type="color" value={form.primaryColor} onChange={e => updateForm('primaryColor', e.target.value)} className="size-8 rounded cursor-pointer border-0 p-0" />
                            <Input value={form.primaryColor} onChange={e => updateForm('primaryColor', e.target.value)} className="h-8 w-28 text-[12px] font-mono" />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] text-muted-foreground">Secondary Color</label>
                          <div className="flex items-center gap-2">
                            <input type="color" value={form.secondaryColor} onChange={e => updateForm('secondaryColor', e.target.value)} className="size-8 rounded cursor-pointer border-0 p-0" />
                            <Input value={form.secondaryColor} onChange={e => updateForm('secondaryColor', e.target.value)} className="h-8 w-28 text-[12px] font-mono" />
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border border-border overflow-hidden">
                        <div className="h-9 flex items-center px-3 gap-2" style={{ backgroundColor: form.primaryColor }}>
                          {form.logo ? (
                            <img src={form.logo.dataUrl} alt="" className="size-4 rounded object-cover" />
                          ) : (
                            <div className="size-4 rounded bg-white/20" />
                          )}
                          <span className="text-[11px] text-white font-medium">{form.name || 'Affiliate Name'}</span>
                        </div>
                        <div className="p-3 bg-gray-50 flex gap-2">
                          <div className="h-6 w-16 rounded text-[9px] text-white flex items-center justify-center font-medium" style={{ backgroundColor: form.primaryColor }}>
                            Get Quote
                          </div>
                          <div className="h-6 w-16 rounded text-[9px] flex items-center justify-center font-medium border" style={{ borderColor: form.primaryColor, color: form.primaryColor }}>
                            Learn More
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="rounded-lg border border-border p-4 space-y-2.5">
                    <h3 className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider">Review</h3>
                    {[
                      ['Affiliate Name', form.name || '—'],
                      ['Channel', form.channel],
                      ['Partner Type', form.type],
                      ['Reinsurer', form.reinsurer || 'TBD'],
                      ['Commission', form.commission || 'TBD'],
                      ['Products', form.products.join(', ') || 'None selected'],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-[13px] py-1 border-b border-border/50 last:border-0">
                        <span className="text-muted-foreground">{k}</span>
                        <span className="font-medium">{v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg border border-border overflow-hidden">
                    <div className="text-[11px] text-muted-foreground px-3 py-1.5 bg-muted/50">Portal Preview</div>
                    <div className="h-9 flex items-center px-3 gap-2" style={{ backgroundColor: form.primaryColor }}>
                      {form.logo ? (
                        <img src={form.logo.dataUrl} alt="" className="size-4 rounded object-cover" />
                      ) : (
                        <div className="size-4 rounded bg-white/20" />
                      )}
                      <span className="text-[11px] text-white font-medium">{form.name || 'Affiliate'}</span>
                    </div>
                    <div className="p-3 bg-gray-50 space-y-1.5">
                      <div className="h-2 w-28 rounded bg-gray-200" />
                      <div className="h-2 w-40 rounded bg-gray-200" />
                      <div className="flex gap-1.5 mt-2">
                        <div className="h-5 w-14 rounded text-[8px] text-white flex items-center justify-center" style={{ backgroundColor: form.primaryColor }}>Get Quote</div>
                        <div className="h-5 w-14 rounded text-[8px] flex items-center justify-center border" style={{ borderColor: form.primaryColor, color: form.primaryColor }}>Learn More</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-muted-foreground bg-muted/50 rounded-md px-3 py-2">
                    The affiliate will be created with "Pending Setup" status. You can activate it after verifying the configuration.
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between p-5 pt-0">
              {step > 1 ? (
                <Button variant="secondary" size="sm" className="h-8 text-[12px]" onClick={() => setStep(s => s - 1)}>
                  Back
                </Button>
              ) : <div />}
              {step < 3 ? (
                <Button size="sm" className="h-8 text-[12px]" onClick={() => { if (validate()) setStep(s => s + 1) }} disabled={step === 1 && !form.name}>
                  Continue
                </Button>
              ) : (
                <Button size="sm" className="h-8 text-[12px] gap-1.5" onClick={handleCreate} disabled={saved}>
                  {saved ? (
                    <><Check size={13} /> Creating...</>
                  ) : (
                    <><Plus size={13} /> Create Affiliate</>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
