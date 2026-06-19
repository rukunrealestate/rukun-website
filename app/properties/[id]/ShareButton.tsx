'use client'

import { useState } from 'react'
import { Share2, X, Copy, Check, MessageCircle, Mail, Smartphone, Link } from 'lucide-react'

interface Props {
  title: string
  price: string
  location: string
  url: string
}

export default function ShareButton({ title, price, location, url }: Props) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const message = `🏠 *${title}*\n📍 ${location}\n💰 ${price}\n\nView property: ${url}`

  const options = [
    {
      label: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20',
      href: `https://wa.me/?text=${encodeURIComponent(message)}`,
    },
    {
      label: 'SMS',
      icon: Smartphone,
      color: 'bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20',
      href: `sms:?body=${encodeURIComponent(message)}`,
    },
    {
      label: 'Email',
      icon: Mail,
      color: 'bg-purple-500/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/20',
      href: `mailto:?subject=${encodeURIComponent(`Property: ${title}`)}&body=${encodeURIComponent(message)}`,
    },
  ]

  const copyLink = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center justify-center gap-2 w-full border border-white/10 hover:border-brand-gold/40 text-white hover:text-brand-gold font-semibold py-3.5 rounded-xl transition-colors text-sm">
        <Share2 size={16} /> Share Property
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />

          {/* Modal */}
          <div className="relative w-full max-w-sm bg-[#111] border border-white/10 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-heading text-lg font-bold text-white">Share Property</h3>
                <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{title}</p>
              </div>
              <button onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Property preview */}
            <div className="bg-white/3 border border-white/5 rounded-xl p-4 mb-6">
              <div className="font-heading font-semibold text-white text-sm mb-0.5 line-clamp-1">{title}</div>
              <div className="text-brand-gold font-bold text-lg">{price}</div>
              <div className="text-gray-500 text-xs mt-0.5">{location}</div>
            </div>

            {/* Share options */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {options.map(({ label, icon: Icon, color, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  onClick={() => setTimeout(() => setOpen(false), 300)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors ${color}`}>
                  <Icon size={22} />
                  <span className="text-xs font-medium">{label}</span>
                </a>
              ))}
            </div>

            {/* Copy link */}
            <button onClick={copyLink}
              className="flex items-center gap-3 w-full bg-white/3 hover:bg-white/6 border border-white/5 rounded-xl px-4 py-3 transition-colors group">
              <div className="w-9 h-9 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center shrink-0">
                {copied ? <Check size={16} className="text-green-400" /> : <Link size={16} className="text-brand-gold" />}
              </div>
              <div className="flex-1 text-left">
                <div className="text-white text-sm font-medium">{copied ? 'Copied!' : 'Copy Link'}</div>
                <div className="text-gray-600 text-xs truncate">{url}</div>
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
