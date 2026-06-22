const STORAGE_KEY = 'sukoon_affiliates'

const initialAffiliates = [
  { id: 'aff-1', name: 'National Bank', type: 'Bancassurance', channel: 'Bancassurance', reinsurer: 'Munich Re', products: ['UCL'], commission: '12%', policies: 412, status: 'Active', since: 'Jan 2024', primaryColor: '#00457C', secondaryColor: '#E8A317' },
  { id: 'aff-2', name: 'Ahli Bank', type: 'Bancassurance', channel: 'Bancassurance', reinsurer: 'Gen Re', products: ['UCL'], commission: 'TPD', policies: 298, status: 'Active', since: 'Mar 2024', primaryColor: '#1B4D3E', secondaryColor: '#C5A355' },
  { id: 'aff-3', name: 'United Finance', type: 'Bancassurance', channel: 'Bancassurance', reinsurer: 'Lockton', products: ['UCL', 'Critical Illness'], commission: 'TPD', policies: 189, status: 'Active', since: 'Jun 2024', primaryColor: '#1E3A5F', secondaryColor: '#F59E0B' },
  { id: 'aff-4', name: 'Capital Housing Bank', type: 'Bancassurance', channel: 'Bancassurance', reinsurer: 'TBD', products: ['UCL'], commission: 'TPD', policies: 0, status: 'Pending Setup', since: '—', primaryColor: '#4A90D9', secondaryColor: '#7C3AED' },
  { id: 'aff-5', name: 'Suhail Bahwan Group', type: 'Corporate', channel: 'Bancassurance', reinsurer: 'Lockton', products: ['UCL', 'Cyber Insurance'], commission: 'TPD', policies: 134, status: 'Active', since: 'Sep 2024', primaryColor: '#059669', secondaryColor: '#D97706' },
  { id: 'aff-6', name: 'Peninsula Financial', type: 'Finance Co', channel: 'Bancassurance', reinsurer: 'Lockton', products: ['UCL'], commission: 'TPD', policies: 87, status: 'Active', since: 'Nov 2024', primaryColor: '#DC2626', secondaryColor: '#1D4ED8' },
  { id: 'aff-7', name: 'Alpha Insurance Brokers', type: 'Broker', channel: 'Broker', reinsurer: 'Gen Re', products: ['UCL', 'Critical Illness', 'Cyber Insurance'], commission: '10%', policies: 245, status: 'Active', since: 'Feb 2024', primaryColor: '#7C3AED', secondaryColor: '#EC4899' },
  { id: 'aff-8', name: 'Gulf Insurance Brokers', type: 'Broker', channel: 'Broker', reinsurer: 'Gen Re', products: ['UCL', 'Critical Illness'], commission: '10%', policies: 156, status: 'Active', since: 'May 2024', primaryColor: '#2563EB', secondaryColor: '#10B981' },
  { id: 'aff-9', name: 'Direct Sales (HO)', type: 'Internal', channel: 'Direct', reinsurer: 'Gen Re', products: ['UCL', 'Critical Illness', 'Cyber Insurance'], commission: '10%', policies: 245, status: 'Active', since: 'Jan 2024', primaryColor: '#EA580C', secondaryColor: '#6B21A8' },
  { id: 'aff-10', name: 'Agent Network', type: 'Agent', channel: 'Agent', reinsurer: 'Gen Re', products: ['UCL', 'Critical Illness', 'Cyber Insurance'], commission: '10%', policies: 312, status: 'Active', since: 'Jan 2024', primaryColor: '#0891B2', secondaryColor: '#BE185D' },
]

export function loadAffiliates() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch (e) {
    // localStorage unavailable or corrupted — fall through to defaults
  }
  return initialAffiliates
}

export function saveAffiliates(affiliates) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(affiliates))
}

export function buildAffiliateDetail(affiliate) {
  return {
    name: affiliate.name,
    type: affiliate.type,
    channel: affiliate.channel,
    status: affiliate.status,
    since: affiliate.since,
    reinsurer: affiliate.reinsurer,
    commission: affiliate.commission,
    beneficiaries: `Only ${affiliate.name} customers`,
    branding: {
      primaryColor: affiliate.primaryColor || '#6B21A8',
      secondaryColor: affiliate.secondaryColor || '#EA580C',
      logo: affiliate.logo?.dataUrl || null,
      logoName: affiliate.logo?.name || `${affiliate.name.toLowerCase().replace(/\s+/g, '-')}-logo.png`,
    },
    products: [
      { name: 'UCL', enabled: affiliate.products?.includes('UCL'), policies: affiliate.products?.includes('UCL') ? affiliate.policies : 0, premium: affiliate.products?.includes('UCL') ? '0.000' : '0.000' },
      { name: 'Critical Illness', enabled: affiliate.products?.includes('Critical Illness'), policies: affiliate.products?.includes('Critical Illness') ? Math.floor(affiliate.policies * 0.15) : 0, premium: '0.000' },
      { name: 'Cyber Insurance', enabled: affiliate.products?.includes('Cyber Insurance'), policies: affiliate.products?.includes('Cyber Insurance') ? Math.floor(affiliate.policies * 0.1) : 0, premium: '0.000' },
    ],
    recentPolicies: [],
    stats: { totalPolicies: affiliate.policies, activePolicies: Math.floor(affiliate.policies * 0.96), totalPremium: '0.000', avgPremium: '0.000' },
    portalUrl: `portal.${affiliate.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.sukoon.om`,
  }
}
