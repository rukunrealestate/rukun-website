'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function ImageGallery({ images, title }: { images: string[], title: string }) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const prev = useCallback(() => setLightbox(i => i != null ? (i - 1 + images.length) % images.length : null), [images.length])
  const next = useCallback(() => setLightbox(i => i != null ? (i + 1) % images.length : null), [images.length])
  const close = () => setLightbox(null)

  useEffect(() => {
    if (lightbox === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, prev, next])

  if (!images.length) return (
    <div className="rounded-2xl overflow-hidden bg-[#111] border border-white/5 h-80 flex items-center justify-center">
      <div className="text-8xl opacity-5 font-heading text-brand-gold select-none">R</div>
    </div>
  )

  return (
    <>
      {/* Gallery grid */}
      <div className="space-y-2">
        <div className="rounded-2xl overflow-hidden bg-[#111] border border-white/5 h-80 cursor-pointer" onClick={() => setLightbox(0)}>
          <img src={images[0]} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        </div>
        {images.length > 1 && (
          <div className="grid grid-cols-3 gap-2">
            {images.slice(1).map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden bg-[#111] border border-white/5 h-32 cursor-pointer" onClick={() => setLightbox(i + 1)}>
                <img src={img} alt={`${title} ${i + 2}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={close}>
          <button onClick={close} className="absolute top-4 right-4 text-white hover:text-brand-gold p-2 z-10">
            <X size={28} />
          </button>
          <button onClick={e => { e.stopPropagation(); prev() }}
            className="absolute left-4 text-white hover:text-brand-gold p-2 z-10">
            <ChevronLeft size={40} />
          </button>
          <button onClick={e => { e.stopPropagation(); next() }}
            className="absolute right-4 text-white hover:text-brand-gold p-2 z-10">
            <ChevronRight size={40} />
          </button>
          <div className="max-w-5xl max-h-screen p-16 w-full" onClick={e => e.stopPropagation()}>
            <img src={images[lightbox]} alt={title} className="w-full h-full object-contain max-h-[80vh] rounded-xl" />
            <div className="text-center text-gray-400 text-sm mt-3">{lightbox + 1} / {images.length}</div>
          </div>
        </div>
      )}
    </>
  )
}
