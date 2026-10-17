'use client'

import { useState } from 'react'
import { Loader2, CalendarCheck, Check } from 'lucide-react'
import { submitLead } from '@/lib/contact'
import type { Dictionary, Locale } from '@/lib/i18n'

// "Book a viewing" on a listing page → CRM Listing Inquiries, linked to the property
export default function ViewingForm({ t, lang, propertyId, transaction }: {
  t: Dictionary['leads']
  lang: Locale
  propertyId: string
  transaction: string
}) {
  const [form, setForm] = useState({ name: '', phone: '', preferred_time: t.timeAny, message: '', website: '' })
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
      kind: 'viewing', lang, property_id: propertyId, transaction,
      name: form.name.trim(), phone: form.phone.trim(), preferred_time: form.preferred_time,
      message: form.message.trim(), website: form.website,
    })
    if (res.ok) setState('sent')
    else { setState('idle'); setError(t.errGeneric) }
  }

  return (
    <section id="book-viewing" className="scroll-mt-28 bg-white/3 border border-brand-gold/20 rounded-2xl p-6">
      {state === 'sent' ? (
        <div className="text-center py-6">
          <div className="w-14 h-14 rounded-full bg-brand-gold/20 flex items-center justify-center mx-auto mb-3"><Check className="text-brand-gold" /></div>
          <h2 className="font-heading text-xl font-semibold text-white mb-1">{t.sentTitle}</h2>
          <p className="text-gray-400 text-sm">{t.sentText}</p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div>
            <h2 className="font-heading text-xl font-semibold text-white mb-1 flex items-center gap-2"><CalendarCheck size={20} className="text-brand-gold" /> {t.viewingTitle}</h2>
            <p className="text-gray-400 text-sm">{t.viewingSub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input className="form-input" placeholder={t.name} aria-label={t.name} autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} />
            <input className="form-input" placeholder={t.phone} aria-label={t.phone} type="tel" autoComplete="tel" dir="ltr" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
          </div>
          <label className="block text-xs text-gray-400">
            {t.preferredTime}
            <select className="form-input mt-1.5" value={form.preferred_time} onChange={(e) => set('preferred_time', e.target.value)}>
              {[t.timeAny, t.timeWeekdayAm, t.timeWeekdayPm, t.timeEvening, t.timeWeekend].map((o) => <option key={o} value={o} className="bg-[#111]">{o}</option>)}
            </select>
          </label>
          <textarea className="form-input" rows={2} placeholder={t.message} aria-label={t.message} value={form.message} onChange={(e) => set('message', e.target.value)} />
          {/* Honeypot — hidden from people, filled by bots */}
          <input tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={form.website} onChange={(e) => set('website', e.target.value)} />
          {error && <p className="text-brand-red text-sm">{error}</p>}
          <button type="submit" disabled={state === 'sending'}
            className="w-full flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-brand-black font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-70">
            {state === 'sending' ? <Loader2 size={17} className="animate-spin" /> : <CalendarCheck size={17} />}
            {state === 'sending' ? t.sending : t.send}
          </button>
        </form>
      )}
    </section>
  )
}
