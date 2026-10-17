'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, X } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n'
import type { Filters } from '@/lib/filters'

interface Option { value: string; label: string }

interface Props {
  action: string // the localized /properties path
  filters: Filters
  t: Dictionary['filters']
  txOptions: Option[]
  typeOptions: Option[]
  areaOptions: Option[]
  bedOptions: number[]
  active: boolean
}

// A plain GET form, so it works without JavaScript; with JavaScript, empty fields are left
// out of the URL and dropdowns apply as soon as they change.
export default function PropertyFilters({ action, filters, t, txOptions, typeOptions, areaOptions, bedOptions, active }: Props) {
  const router = useRouter()

  const go = (form: HTMLFormElement) => {
    const params = new URLSearchParams()
    for (const [k, v] of new FormData(form)) {
      const value = String(v).trim()
      if (value && !(k === 'sort' && value === 'newest')) params.set(k, value)
    }
    const qs = params.toString()
    router.push(qs ? `${action}?${qs}` : action, { scroll: false })
  }

  const select = (name: keyof Filters, label: string, options: Option[], value: string | number) => (
    <label className="flex flex-col gap-1 text-xs text-gray-400">
      {label}
      <select name={name} defaultValue={String(value || '')} onChange={(e) => go(e.currentTarget.form!)}
        className="bg-[#111] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:border-brand-gold/50 outline-none">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  )

  const any = { value: '', label: t.any }

  return (
    <form action={action} method="get" role="search"
      onSubmit={(e) => { e.preventDefault(); go(e.currentTarget) }}
      className="rounded-2xl border border-white/5 bg-white/3 p-5 mb-8">
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-500" />
          <input type="search" name="q" defaultValue={filters.q} placeholder={t.searchPh} aria-label={t.search}
            className="w-full bg-[#111] border border-white/10 rounded-lg ps-9 pe-3 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-brand-gold/50 outline-none" />
        </div>
        <button type="submit"
          className="bg-brand-gold hover:bg-brand-gold-light text-brand-black text-sm font-semibold px-5 rounded-lg transition-colors">
          {t.apply}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {select('tx', t.transaction, [any, ...txOptions], filters.tx)}
        {select('type', t.type, [any, ...typeOptions], filters.type)}
        {select('area', t.area, [any, ...areaOptions], filters.area)}
        {select('beds', t.bedrooms, [any, ...bedOptions.map((n) => ({ value: String(n), label: t.bedsMin.replace('{n}', String(n)) }))], filters.beds)}
        <label className="flex flex-col gap-1 text-xs text-gray-400">
          {t.minPrice}
          <input type="number" name="min" min={0} step={1000} defaultValue={filters.min || ''} inputMode="numeric" dir="ltr"
            className="bg-[#111] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:border-brand-gold/50 outline-none" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-400">
          {t.maxPrice}
          <input type="number" name="max" min={0} step={1000} defaultValue={filters.max || ''} inputMode="numeric" dir="ltr"
            className="bg-[#111] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:border-brand-gold/50 outline-none" />
        </label>
        {select('sort', t.sort, [
          { value: 'newest', label: t.newest },
          { value: 'price-asc', label: t.priceAsc },
          { value: 'price-desc', label: t.priceDesc },
          { value: 'size-desc', label: t.sizeDesc },
        ], filters.sort)}
      </div>

      {active && (
        <Link href={action} scroll={false} className="inline-flex items-center gap-1 mt-4 text-xs text-gray-400 hover:text-brand-gold transition-colors">
          <X size={13} /> {t.clear}
        </Link>
      )}
    </form>
  )
}
