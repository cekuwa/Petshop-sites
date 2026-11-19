import { Bird, Bone, Cat, Dog, Fish, Rabbit } from 'lucide-react'

const categories = [
  { label: 'Köpek', count: 420, icon: Dog },
  { label: 'Kedi', count: 310, icon: Cat },
  { label: 'Ödül Maması', count: 145, icon: Bone },
  { label: 'Kuş', count: 88, icon: Bird },
  { label: 'Balık', count: 96, icon: Fish },
  { label: 'Küçük Hayvanlar', count: 74, icon: Rabbit },
]

export function Categories() {
  return (
    <section id="shop" aria-labelledby="shop-heading" className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <h2 id="shop-heading" className="font-serif text-3xl font-semibold text-primary md:text-4xl">
        Evcil dostunuza göre alışveriş yapın
      </h2>
      <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map(({ label, count, icon: Icon }) => (
          <li key={label}>
            <a
              href="#products"
              className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center transition-colors hover:border-primary/40 hover:bg-secondary"
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className="font-medium">{label}</span>
              <span className="text-xs text-muted-foreground">{count} ürün</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
