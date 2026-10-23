'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import OptionList from '@/components/OptionList'
import { BUDGETS, budgetLabel, applyBudget } from '@/lib/budgets'

interface Option { value: string; label: string; group?: string }

interface Props {
  action: string // the localized /properties path
  t: { buy: string; rent: string; type: string; anyType: string; area: string; allAreas: string; budget: string; anyBudget: string; under: string; over: string; search: string }
  typeOptions: Option[]
  areaOptions: Option[]
}


// Buy/Rent search on the home page. A plain GET form to /properties (same query
// parameters as the filters there), so it also works without JavaScript.
export default function HeroSearch({ action, t, typeOptions, areaOptions }: Props) {
  const router = useRouter()
  const [tx, setTx] = useState<'sale' | 'rent'>('sale')

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params = new URLSearchParams()
    for (const [k, v] of new FormData(e.currentTarget)) {
      if (!String(v)) continue
      if (k === 'budget') applyBudget(params, String(v))
      else params.set(k, String(v))
    }
    router.push(`${action}?${params.toString()}`)
  }

  const field = 'w-full bg-transparent text-[15px] text-[#16130F] font-medium outline-none cursor-pointer appearance-none'
  const label = 'block text-[10px] font-bold uppercase tracking-[0.14em] text-[#9C7840] mb-0.5'

  return (
    <form action={action} method="get" onSubmit={submit} className="bg-white rounded-[6px] overflow-hidden shadow-[0_24px_48px_-24px_rgba(0,0,0,0.7)] max-w-[760px]">
      <input type="hidden" name="tx" value={tx} />
      <div className="flex border-b border-[#ECE6DC]" role="tablist">
        {(['sale', 'rent'] as const).map((k) => (
          <button key={k} type="button" role="tab" aria-selected={tx === k} onClick={() => setTx(k)}
            className={`px-6 py-3 text-sm font-semibold transition-colors ${tx === k ? 'text-[#16130F] shadow-[inset_0_-3px_0_#C8472A]' : 'text-[#6B6358] hover:text-[#16130F]'}`}>
            {k === 'sale' ? t.buy : t.rent}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-[1fr_1fr_1fr_auto]">
        <label className="px-4 py-3 border-e border-b md:border-b-0 border-[#ECE6DC] min-w-0">
          <span className={label}>{t.type}</span>
          <select name="type" defaultValue="" className={field}>
            <option value="">{t.anyType}</option>
            <OptionList options={typeOptions} />
          </select>
        </label>
        <label className="px-4 py-3 border-b md:border-b-0 md:border-e border-[#ECE6DC] min-w-0">
          <span className={label}>{t.area}</span>
          <select name="area" defaultValue="" className={field}>
            <option value="">{t.allAreas}</option>
            <OptionList options={areaOptions} />
          </select>
        </label>
        <label className="px-4 py-3 border-e border-[#ECE6DC] min-w-0">
          <span className={label}>{t.budget}</span>
          <select key={tx} name="budget" defaultValue="" className={field}>
            <option value="">{t.anyBudget}</option>
            {BUDGETS[tx].map(([min, max]) => (
              <option key={min} value={`${min}-${max}`}>
                {budgetLabel(min, max, t)}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="flex items-center justify-center gap-2 bg-brand-red hover:bg-[#B23D23] text-white font-semibold text-sm px-8 py-4 transition-colors">
          <Search size={16} /> {t.search}
        </button>
      </div>
    </form>
  )
}
