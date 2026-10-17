'use client'

import { useState } from 'react'
import { Loader2, BellRing, Check } from 'lucide-react'
import { submitLead } from '@/lib/contact'
import type { Dictionary, Locale } from '@/lib/i18n'

interface Option { value: string; label: string }

// "Notify me" — a buyer/renter request (what they want + budget) → CRM Contacts, lead type "request"
export default function AlertForm({ t, tf, lang, txOptions, typeOptions, areaOptions, initial }: {
  t: Dictionary['leads']
  tf: Dictionary['filters']
  lang: Locale
  txOptions: Option[]
  typeOptions: Option[]
  areaOptions: Option[]
  initial?: { tx?: string; type?: string; area?: string; budget?: number; beds?: number }
}) {
  const [form, setForm] = useState({
    name: '', phone: '', website: '',
    transaction: initial?.tx || '', property_type: initial?.type || '', area: initial?.area || '',
    budget_max: initial?.budget ? String(initial.budget) : '', bedrooms: initial?.beds ? String(initial.beds) : '',
  })
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState('')
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }))
  const labelOf = (opts: Option[], v: string) => opts.find((o) => o.value === v)?.label ?? ''

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim() || !form.phone.trim()) return setError(t.errRequired)
    if (!/^[+\d\s\-().]{7,20}$/.test(form.phone.trim())) return setError(t.errPhone)
    setState('sending')
    const res = await submitLead({
      kind: 'alert', lang, website: form.website,
      name: form.name.trim(), phone: form.phone.trim(),
      transaction: form.transaction,
      // Labels in the visitor's language read naturally in the CRM
      property_type: labelOf(typeOptions, form.property_type),
      location: labelOf(areaOptions, form.area),
      budget_max: form.budget_max, bedrooms: form.bedrooms,
    })
    if (res.ok) setState('sent')
    else { setState('idle'); setError(t.errGeneric) }
  }

  const select = (k: 'transaction' | 'property_type' | 'area' | 'bedrooms', label: string, options: Option[]) => (
    <label className="flex flex-col gap-1 text-xs text-gray-400">
      {label}
      <select value={form[k]} onChange={(e) => set(k, e.target.value)}
        className="bg-[#111] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-brand-gold/50">
        <option value="">{tf.any}</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  )

  return (
    <section className="rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-6 md:p-8 mb-16">
      {state === 'sent' ? (
        <div className="text-center py-4">
          <div className="w-14 h-14 rounded-full bg-brand-gold/20 flex items-center justify-center mx-auto mb-3"><Check className="text-brand-gold" /></div>
          <h2 className="font-heading text-xl font-semibold text-white mb-1">{t.alertSentTitle}</h2>
          <p className="text-gray-400 text-sm">{t.alertSentText}</p>
        </div>
      ) : (
        <form onSubmit={submit}>
          <h2 className="font-heading text-2xl font-bold text-white mb-2 flex items-center gap-2"><BellRing size={22} className="text-brand-gold" /> {t.alertTitle}</h2>
          <p className="text-gray-400 text-sm mb-5 max-w-2xl">{t.alertSub}</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
            {select('transaction', tf.transaction, txOptions)}
            {select('property_type', tf.type, typeOptions)}
            {select('area', tf.area, areaOptions)}
            {select('bedrooms', tf.bedrooms, ['1', '2', '3', '4'].map((n) => ({ value: n, label: tf.bedsMin.replace('{n}', n) })))}
            <label className="flex flex-col gap-1 text-xs text-gray-400 col-span-2 md:col-span-1">
              {t.alertBudget}
              <input type="number" min={0} step={1000} inputMode="numeric" dir="ltr" value={form.budget_max} onChange={(e) => set('budget_max', e.target.value)}
                className="bg-[#111] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-brand-gold/50" />
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3">
            <input className="form-input" placeholder={t.name} aria-label={t.name} autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} />
            <input className="form-input" placeholder={t.phone} aria-label={t.phone} type="tel" autoComplete="tel" dir="ltr" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
            <button type="submit" disabled={state === 'sending'}
              className="flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-brand-black font-semibold px-6 py-3.5 rounded-xl transition-colors disabled:opacity-70">
              {state === 'sending' ? <Loader2 size={17} className="animate-spin" /> : <BellRing size={17} />}
              {state === 'sending' ? t.sending : t.alertSend}
            </button>
          </div>
          <input tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={form.website} onChange={(e) => set('website', e.target.value)} />
          {error && <p className="text-brand-red text-sm mt-3">{error}</p>}
        </form>
      )}
    </section>
  )
}
