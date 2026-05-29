'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Send, Loader2 } from 'lucide-react'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('https://crm.rukunrealestate.com/api/leads/website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSent(true)
        setForm({ name: '', phone: '', email: '', message: '' })
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Connection error. Please try again.')
    }
    setLoading(false)
  }

  return (
    <section className="section-padding bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div>
            <p className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-3">Get In Touch</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Let&apos;s Find Your
              <br />Perfect Property
            </h2>
            <div className="gold-divider mb-6" />
            <p className="text-gray-400 leading-relaxed mb-10">
              Whether you&apos;re buying, selling, or just exploring — our team is here to help.
              Leave your details and an agent will contact you within hours.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-brand-gold" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Phone / WhatsApp</div>
                  <a href="tel:+96170000000" className="text-white hover:text-brand-gold transition-colors font-medium">+961 70 000 000</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-brand-gold" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Email</div>
                  <a href="mailto:info@rukunrealestate.com" className="text-white hover:text-brand-gold transition-colors font-medium">info@rukunrealestate.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-brand-gold" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Location</div>
                  <span className="text-white font-medium">Beirut, Lebanon</span>
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
                <h3 className="font-heading text-xl text-white font-semibold mb-2">Message Received!</h3>
                <p className="text-gray-400 text-sm">An agent will contact you within a few hours.</p>
                <button onClick={() => setSent(false)}
                  className="mt-6 text-brand-gold text-sm hover:underline">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-heading text-xl font-semibold text-white mb-6">Send Us a Message</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <label className="text-xs text-gray-400 mb-1.5 block">Full Name *</label>
                    <input className="form-input" placeholder="Ahmad Khalil" required
                      value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="text-xs text-gray-400 mb-1.5 block">Phone *</label>
                    <input className="form-input" placeholder="+961 70 000 000" required
                      value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block">Email</label>
                  <input className="form-input" type="email" placeholder="ahmad@example.com"
                    value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block">Message</label>
                  <textarea className="form-input" rows={4} placeholder="I'm looking for a 3-bedroom apartment in Beirut..."
                    value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} />
                </div>
                {error && <p className="text-brand-red text-sm">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-brand-black font-semibold py-3.5 rounded-xl transition-all">
                  {loading ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} />}
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
