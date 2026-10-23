'use client'

import { useState } from 'react'
import { Loader2, Send, Check } from 'lucide-react'
import { submitLead } from '@/lib/contact'
import OptionList from '@/components/OptionList'
import type { Dictionary, Locale } from '@/lib/i18n'

interface Option { value: string; label: string; group?: string }

// "List your property" → CRM Property Sources (role: owner)
export default function OwnerForm({ t, lang, typeOptions }: { t: Dictionary['leads']; lang: Locale; typeOptions: Option[] }) {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', website: '',
    property_type: '', transaction: 'sale', location: '', area_sqm: '', price: '', message: '',
  })
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState('')
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim() || !form.phone.trim()) return setError(t.errRequired)
    if (!/^[+\d\s\-().]{7,20}$/.test(form.phone.trim())) return setError(t.errPhone)
    setState('sending')
    const res = await submitLead({
      kind: 'owner', lang, website: form.website,
      name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim(),
      property_type: typeOptions.find((o) => o.value === form.property_type)?.label ?? '',
      transaction: form.transaction === 'rent' ? 'rent out' : 'sell',
      location: form.location.trim(), area_sqm: form.area_sqm, price: form.price, message: form.message.trim(),
    })
    if (res.ok) setState('sent')
    else { setState('idle'); setError(t.errGeneric) }
  }

  if (state === 'sent') {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full bg-brand-gold/20 flex items-center justify-center mx-auto mb-4"><Check className="text-brand-gold" size={28} /></div>
        <h2 className="font-heading text-2xl font-semibold text-white mb-2">{t.ownerSentTitle}</h2>
        <p className="text-gray-400">{t.ownerSentText}</p>
      </div>
    )
  }

  const field = 'bg-[#111] border border-white/10 rounded-lg px-3 py-3 text-sm text-white outline-none focus:border-brand-gold/50 w-full'

  return (
    <form onSubmit={submit} className="space-y-4">
      <h2 className="font-heading text-2xl font-semibold text-white mb-2">{t.ownerFormTitle}</h2>
      <div className="grid grid-cols-2 gap-2">
        {[{ v: 'sale', l: t.sell }, { v: 'rent', l: t.rentOut }].map((o) => (
          <button key={o.v} type="button" onClick={() => set('transaction', o.v)}
            className={`py-3 rounded-lg text-sm font-semibold border transition-colors ${form.transaction === o.v ? 'bg-brand-gold text-brand-black border-brand-gold' : 'border-white/10 text-gray-300 hover:border-brand-gold/40'}`}>
            {o.l}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-400">
          {t.propertyType}
          <select className={field} value={form.property_type} onChange={(e) => set('property_type', e.target.value)}>
            <option value="">—</option>
            <OptionList options={typeOptions} />
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-400">
          {t.location}
          <input className={field} value={form.location} onChange={(e) => set('location', e.target.value)} />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-400">
          {t.size}
          <input className={field} type="number" min={0} inputMode="numeric" dir="ltr" value={form.area_sqm} onChange={(e) => set('area_sqm', e.target.value)} />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-400">
          {t.askingPrice}
          <input className={field} type="number" min={0} step={1000} inputMode="numeric" dir="ltr" value={form.price} onChange={(e) => set('price', e.target.value)} />
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input className="form-input" placeholder={t.name} aria-label={t.name} autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} />
        <input className="form-input" placeholder={t.phone} aria-label={t.phone} type="tel" autoComplete="tel" dir="ltr" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
      </div>
      <textarea className="form-input" rows={3} placeholder={t.message} aria-label={t.message} value={form.message} onChange={(e) => set('message', e.target.value)} />
      <input tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={form.website} onChange={(e) => set('website', e.target.value)} />
      {error && <p className="text-brand-red text-sm">{error}</p>}
      <button type="submit" disabled={state === 'sending'}
        className="w-full flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-brand-black font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-70">
        {state === 'sending' ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} />}
        {state === 'sending' ? t.sending : t.ownerSend}
      </button>
    </form>
  )
}
