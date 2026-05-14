export interface NewsItem {
  id: number
  title: string
  summary: string
  content: string
  category: 'tax-update' | 'deadline' | 'tip' | 'announcement'
  date: string
  important?: boolean
  icon: string
}

export const categories = [
  { key: 'all', label: 'All Updates' },
  { key: 'tax-update', label: 'Tax Updates' },
  { key: 'deadline', label: 'Deadlines' },
  { key: 'tip', label: 'Tips & Advice' },
  { key: 'announcement', label: 'Announcements' }
] as const

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'FBR Extends Tax Filing Deadline for Salaried Individuals',
    summary:
      'The Federal Board of Revenue has announced an extension in the tax filing deadline for salaried individuals for the tax year 2025.',
    content:
      'The Federal Board of Revenue (FBR) has extended the deadline for filing income tax returns for salaried individuals. The new deadline is now October 31, 2025. This extension applies to all salaried class taxpayers who were previously required to file by September 30, 2025.',
    category: 'deadline',
    date: '2025-09-15',
    important: true,
    icon: '📅'
  },
  {
    id: 2,
    title: 'New Withholding Tax Rates on Banking Transactions',
    summary:
      'Updated withholding tax rates applicable on banking transactions for non-filers have been announced in the latest finance bill.',
    content:
      'The government has announced revised withholding tax rates on banking transactions exceeding Rs. 50,000 for non-filers. The rate has been increased from 0.6% to 0.9% for cash withdrawals and from 0.6% to 0.9% for banking transactions. Filers continue to enjoy exemption from this tax.',
    category: 'tax-update',
    date: '2025-08-20',
    important: true,
    icon: '🏦'
  },
  {
    id: 3,
    title: 'How to Maximize Your Tax Savings This Year',
    summary:
      'Expert tips on legitimate tax planning strategies that can help you reduce your tax liability within the legal framework.',
    content:
      'Tax planning is essential for minimizing your tax burden. Key strategies include: investing in approved pension funds, claiming education expenses, utilizing health insurance deductions, and timing your charitable donations. Consult with our experts at Taxmate for personalized tax planning advice.',
    category: 'tip',
    date: '2025-08-10',
    icon: '💡'
  },
  {
    id: 4,
    title: 'Property Transfer Fee Calculator Now Available',
    summary:
      'We have launched a new interactive tool to help you calculate property transfer fees and stamp duties across Pakistan.',
    content:
      'Taxmate is proud to introduce our Property Transfer Fee Calculator. This tool helps you estimate the total costs involved in property transfers including stamp duty, registration fees, CVT, and withholding tax. Visit our tools section to try it out.',
    category: 'announcement',
    date: '2025-07-25',
    icon: '🏠'
  },
  {
    id: 5,
    title: 'Super Tax Applicable for Tax Year 2025',
    summary:
      'The super tax on high-income individuals and businesses continues for the current tax year with updated thresholds.',
    content:
      'Super tax remains applicable for tax year 2025. Individuals with income exceeding Rs. 150 million are liable for super tax at progressive rates ranging from 1% to 10%. Companies in specific sectors including banking, beverages, and tobacco face higher rates.',
    category: 'tax-update',
    date: '2025-07-15',
    icon: '📊'
  },
  {
    id: 6,
    title: 'Monthly Sales Tax Return Deadline - 18th of Every Month',
    summary:
      'Reminder: Sales tax returns must be filed by the 18th of every month. Late filing attracts penalties and default surcharge.',
    content:
      'All registered persons under the Sales Tax Act 1990 are required to file their monthly sales tax return by the 18th of the following month. Failure to file on time results in a penalty of Rs. 5,000 per day of default, up to a maximum of Rs. 150,000, along with default surcharge at 12% per annum.',
    category: 'deadline',
    date: '2025-07-01',
    important: true,
    icon: '⏰'
  },
  {
    id: 7,
    title: 'Understanding the Active Taxpayer List (ATL)',
    summary:
      'Being on the Active Taxpayer List offers significant benefits. Learn how to get on the ATL and the advantages it provides.',
    content:
      'The Active Taxpayer List (ATL) is published by FBR and includes all taxpayers who have filed their income tax return for the latest tax year. Benefits of being on ATL include: reduced withholding tax rates, lower tax on property transactions, and reduced tax on vehicle registration. File your return on time to stay on the ATL.',
    category: 'tip',
    date: '2026-05-14',
    icon: '✅'
  },
  {
    id: 8,
    title: 'Taxmate Opens New Branch in Bhakkar',
    summary:
      'We are expanding our services! Taxmate has opened a new office in Bhakkar to serve clients in Southern Punjab.',
    content:
      'We are delighted to announce the opening of our new branch office in Bhakkars. This expansion allows us to better serve our growing client base in Southern Punjab. The new office offers all our services including tax filing, consultancy, and corporate registration.',
    category: 'announcement',
    date: '2025-06-01',
    icon: '🎉'
  }
]
