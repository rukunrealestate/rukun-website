'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, X } from 'lucide-react'
import OptionList from '@/components/OptionList'
import { BUDGETS, budgetLabel, applyBudget } from '@/lib/budgets'
import type { Dictionary } from '@/lib/i18n'
import type { Filters } from '@/lib/filters'

interface Option { value: string; label: string; group?: string }

interface Props {
  action: string // the localized /properties path
  filters: Filters
  t: Dictionary['filters']
  th: Dictionary['hero'] // Buy/Rent and budget labels, shared with the home page search
  typeOptions: Option[]
  areaOptions: Option[]
  bedOptions: number[]
  active: boolean
}

// Same look as the home page search. A plain GET form, so it works without JavaScript;
// with JavaScript, empty fields are left out of the URL and dropdowns apply as soon as they change.
export default function PropertyFilters({ action, filters, t, th, typeOptions, areaOptions, bedOptions, active }: Props) {
  const router = useRouter()

  const go = (form: HTMLFormElement, submitter?: HTMLButtonElement | null) => {
    const data = new FormData(form)
    const tab = submitter?.name === 'tx' ? submitter.value : null
    if (tab !== null) { data.set('tx', tab); data.delete('budget') } // a new Buy/Rent tab gets its own price ranges
    const params = new URLSearchParams()
    for (const [k, v] of data) {
      const value = String(v).trim()
      if (!value || (k === 'sort' && value === 'newest')) continue
      if (k === 'budget') applyBudget(params, value)
      else params.set(k, value)
    }
    const qs = params.toString()
    router.push(qs ? `${action}?${qs}` : action, { scroll: false })
  }

  const field = 'w-full bg-transparent text-[15px] text-[#16130F] font-medium outline-none cursor-pointer'
  const label = 'block text-[10px] font-bold uppercase tracking-[0.14em] text-[#9C7840] mb-0.5'
  const cell = 'px-4 py-3 border-[#ECE6DC] min-w-0'

  const select = (name: string, text: string, options: Option[], value: string | number, extra = '') => (
    <label className={`${cell} ${extra}`}>
      <span className={label}>{text}</span>
      <select name={name} defaultValue={String(value || '')} onChange={(e) => go(e.currentTarget.form!)} className={field}>
        <OptionList options={options} />
      </select>
    </label>
  )

  // Price ranges for the chosen tab; a range typed into the URL that isn't in the list still shows
  const ranges = BUDGETS[filters.tx === 'rent' ? 'rent' : 'sale']
  const current = filters.min || filters.max ? `${filters.min}-${filters.max}` : ''
  const budgetOptions = ranges.map(([min, max]) => ({ value: `${min}-${max}`, label: budgetLabel(min, max, th) }))
  if (current && !budgetOptions.some((o) => o.value === current)) budgetOptions.push({ value: current, label: budgetLabel(filters.min, filters.max, th) })

  const tabs = [{ value: '', label: t.any }, { value: 'sale', label: th.buy }, { value: 'rent', label: th.rent }]

  return (
    <form action={action} method="get" role="search"
      onSubmit={(e) => { e.preventDefault(); go(e.currentTarget, (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null) }}
      className="mb-8">
      <div className="bg-white rounded-[6px] overflow-hidden shadow-[0_24px_48px_-24px_rgba(0,0,0,0.7)]">
        <div className="flex flex-wrap items-stretch border-b border-[#ECE6DC]">
          <div className="flex" role="tablist">
            {tabs.map((o) => (
              <button key={o.value} type="submit" name="tx" value={o.value} role="tab" aria-selected={filters.tx === o.value}
                className={`px-6 py-3 text-sm font-semibold transition-colors ${filters.tx === o.value ? 'text-[#16130F] shadow-[inset_0_-3px_0_#C8472A]' : 'text-[#6B6358] hover:text-[#16130F]'}`}>
                {o.label}
              </button>
            ))}
          </div>
          <input type="hidden" name="tx" value={filters.tx} />
          <div className="relative flex-1 min-w-[220px] border-t sm:border-t-0 sm:border-s border-[#ECE6DC]">
            <Search size={16} className="absolute top-1/2 -translate-y-1/2 start-4 text-[#9C9284]" />
            <input type="search" name="q" defaultValue={filters.q} placeholder={t.searchPh} aria-label={t.search}
              className="w-full h-full bg-transparent ps-11 pe-4 py-3 text-sm text-[#16130F] placeholder:text-[#9C9284] outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-[1fr_1fr_1fr_1.2fr_1fr_auto]">
          {select('type', t.type, [{ value: '', label: th.anyType }, ...typeOptions], filters.type, 'border-e border-b md:border-b-0')}
          {select('area', t.area, [{ value: '', label: th.allAreas }, ...areaOptions], filters.area, 'border-b md:border-b-0 md:border-e')}
          {select('beds', t.bedrooms, [{ value: '', label: t.any }, ...bedOptions.map((n) => ({ value: String(n), label: t.bedsMin.replace('{n}', String(n)) }))], filters.beds, 'border-e border-b md:border-b-0')}
          <label className={`${cell} border-b md:border-b-0 md:border-e`}>
            <span className={label}>{th.budget}</span>
            <select key={filters.tx} name="budget" defaultValue={current} onChange={(e) => go(e.currentTarget.form!)} className={field}>
              <option value="">{th.anyBudget}</option>
              {budgetOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </label>
          {select('sort', t.sort, [
            { value: 'newest', label: t.newest },
            { value: 'price-asc', label: t.priceAsc },
            { value: 'price-desc', label: t.priceDesc },
            { value: 'size-desc', label: t.sizeDesc },
          ], filters.sort, 'border-e md:border-e-0')}
          <button type="submit" className="flex items-center justify-center gap-2 bg-brand-red hover:bg-[#B23D23] text-white font-semibold text-sm px-8 py-4 transition-colors">
            <Search size={16} /> {th.search}
          </button>
        </div>
      </div>

      {active && (
        <Link href={action} scroll={false} className="inline-flex items-center gap-1 mt-4 text-xs text-gray-400 hover:text-brand-gold transition-colors">
          <X size={13} /> {t.clear}
        </Link>
      )}
    </form>
  )
}
