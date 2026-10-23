'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export interface Slide { src: string; href: string; caption: string; price: string }

const INTERVAL = 4000 // ms per photo

// Cross-fading background photos for the opening section. Each photo comes from a listing, and the
// "In the photo" link follows the photo that is showing. Stays on the first photo for visitors who
// ask their system for reduced motion.
export function HeroBackground({ slides, index }: { slides: Slide[]; index: number }) {
  return (
    <>
      {slides.map((s, i) => (
        <Image key={s.src} src={s.src} alt="" fill priority={i === 0} sizes="100vw" unoptimized
          className={`object-cover transition-opacity duration-1000 ${i === index ? 'opacity-100' : 'opacity-0'}`} />
      ))}
    </>
  )
}

export default function HeroSlides({ slides, label, children }: { slides: Slide[]; label: string; children: React.ReactNode }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL)
    return () => clearInterval(id)
  }, [slides.length])

  const current = slides[index]

  return (
    <section className="relative min-h-[640px] xl:min-h-[760px] flex items-end overflow-hidden bg-[#0A0A0A]">
      <HeroBackground slides={slides} index={index} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent rtl:bg-gradient-to-l" />

      <div className="relative w-full max-w-7xl mx-auto px-6 pt-36 xl:pt-48 pb-12 xl:pb-16">
        {children}
        {current && (
          <div className="flex flex-wrap items-center justify-end gap-4 mt-4">
            <Link href={current.href}
              className="group inline-flex items-center gap-3 bg-black/55 backdrop-blur-sm border border-white/10 hover:border-brand-gold/50 px-4 py-2.5 rounded-[4px] text-[13px] transition-colors">
              <span className="text-brand-gold-light uppercase tracking-[0.14em] text-[10.5px] font-bold">{label}</span>
              <span className="text-white">{current.caption} · <b dir="ltr">{current.price}</b></span>
              <ArrowRight size={14} className="text-brand-gold rtl:rotate-180 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            {slides.length > 1 && (
              <div className="flex gap-1.5" aria-hidden="true">
                {slides.map((s, i) => (
                  <button key={s.src} type="button" tabIndex={-1} onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-brand-gold' : 'w-1.5 bg-white/40 hover:bg-white/70'}`} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
