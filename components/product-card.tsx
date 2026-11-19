'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Check, Plus } from 'lucide-react'
import { useCart } from '@/components/cart-context'

const numberFormatter = new Intl.NumberFormat('tr-TR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})
const priceFormatter = { format: (value: number) => `${numberFormatter.format(value)} TL` }

type ProductCardProps = {
  name: string
  tag: string
  price: number
  image: string
  alt: string
  badge?: string
}

export function ProductCard({ name, tag, price, image, alt, badge }: ProductCardProps) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card">
      <div className="relative aspect-square bg-muted">
        <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        {badge && (
          <span className="absolute top-3 left-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            {badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-5">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{tag}</p>
        <h3 className="font-serif text-lg font-semibold">{name}</h3>
        <div className="mt-auto flex items-center justify-between pt-4">
          <p className="text-lg font-semibold text-primary">{priceFormatter.format(price)}</p>
          <button
            type="button"
            onClick={() => {
              add()
              setAdded(true)
            }}
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {added ? <Check className="size-4" aria-hidden="true" /> : <Plus className="size-4" aria-hidden="true" />}
            {added ? 'Eklendi' : 'Ekle'}
            <span className="sr-only">{`: ${name} sepete`}</span>
          </button>
        </div>
      </div>
    </article>
  )
}
