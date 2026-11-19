'use client'

import { useState } from 'react'
import { Menu, PawPrint, ShoppingBag, X } from 'lucide-react'
import { useCart } from '@/components/cart-context'

const links = [
  { href: '#shop', label: 'Mağaza' },
  { href: '#products', label: 'Çok Satanlar' },
  { href: '#services', label: 'Bakım' },
  { href: '#reviews', label: 'Yorumlar' },
]

export function SiteHeader() {
  const { count } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <a href="#" className="flex items-center gap-2 font-serif text-xl font-semibold text-primary">
          <PawPrint className="size-5 text-accent" aria-hidden="true" />
          PETSHOP
        </a>

        <nav aria-label="Ana menü" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-medium">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-muted-foreground transition-colors hover:text-foreground">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#products"
            className="relative inline-flex size-10 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-secondary/70"
          >
            <ShoppingBag className="size-5" aria-hidden="true" />
            <span className="sr-only">Sepet, {count} ürün</span>
            {count > 0 && (
              <span
                aria-hidden="true"
                className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-accent-foreground"
              >
                {count}
              </span>
            )}
          </a>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            <span className="sr-only">{open ? 'Menüyü kapat' : 'Menüyü aç'}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobil menü" className="border-t border-border/60 md:hidden">
          <ul className="flex flex-col px-4 py-2">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block py-3 font-medium">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
