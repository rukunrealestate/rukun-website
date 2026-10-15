'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Send, Loader2 } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n'

export default function ContactSection({ t }: { t: Dictionary['contact'] }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '', website: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Client-side validation — mirrors server-side rules
    const name = form.name.trim().slice(0, 200)
    const phone = form.phone.trim().slice(0, 50)
    const email = form.email.trim().slice(0, 200)
    const message = form.message.trim().slice(0, 2000)

    // Honeypot — bots fill hidden fields; silently fake success
    if (form.website) { setSent(true); return }

    if (!name || !phone) { setError(t.errRequired); return }
    if (!/^[+\d\s\-().]{7,20}$/.test(phone)) { setError(t.errPhone); return }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError(t.errEmail); return }

    setLoading(true)
    try {
      const crmUrl = process.env.NEXT_PUBLIC_CRM_URL || 'https://crm.rukunrealestate.com'
      const res = await fetch(`${crmUrl}/api/leads/website`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, message, website: form.website }),
      })
      if (res.ok) {
        setSent(true)
        setForm({ name: '', phone: '', email: '', message: '', website: '' })
      } else {
        setError(t.errGeneric)
      }
    } catch {
      setError(t.errConnection)
    }
    setLoading(false)
  }

  return (
    <section className="section-padding bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div>
            <p className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-3">{t.eyebrow}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              {t.titleA}
              <br />{t.titleB}
            </h2>
            <div className="gold-divider mb-6" />
            <p className="text-gray-400 leading-relaxed mb-10">{t.intro}</p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-brand-gold" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">{t.phoneLabel}</div>
                  <a href="tel:+9613709240" dir="ltr" className="text-white hover:text-brand-gold transition-colors font-medium">+961 3 709 240</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-brand-gold" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">{t.emailLabel}</div>
                  <a href="mailto:mirna.i.itani@gmail.com" className="text-white hover:text-brand-gold transition-colors font-medium">mirna.i.itani@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-brand-gold" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">{t.locationLabel}</div>
                  <span className="text-white font-medium">{t.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white/3 border border-white/5 rounded-3xl p-8">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✓</span>
                </div>
                <h3 className="font-heading text-xl text-white font-semibold mb-2">{t.sentTitle}</h3>
                <p className="text-gray-400 text-sm">{t.sentText}</p>
                <button onClick={() => setSent(false)}
                  className="mt-6 text-brand-gold text-sm hover:underline">
                  {t.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-heading text-xl font-semibold text-white mb-6">{t.formTitle}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <label className="text-xs text-gray-400 mb-1.5 block">{t.name}</label>
                    <input className="form-input" placeholder={t.namePh} required
                      value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="text-xs text-gray-400 mb-1.5 block">{t.phone}</label>
                    <input className="form-input" placeholder="+961 3 709 240" dir="ltr" required
                      value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block">{t.email}</label>
                  <input className="form-input" type="email" placeholder="ahmad@example.com"
                    value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block">{t.message}</label>
                  <textarea className="form-input" rows={4} placeholder={t.messagePh}
                    value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} />
                </div>
                {/* Honeypot — hidden from users, visible to bots */}
                <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true">
                  <input tabIndex={-1} autoComplete="off" name="website" value={form.website}
                    onChange={e => setForm(f => ({...f, website: e.target.value}))} />
                </div>
                {error && <p className="text-brand-red text-sm">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-brand-black font-semibold py-3.5 rounded-xl transition-all">
                  {loading ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} />}
                  {loading ? t.sending : t.send}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
