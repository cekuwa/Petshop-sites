import { ProductCard } from '@/components/product-card'

const products = [
  {
    name: 'Tahılsız Doğal Köpek Maması',
    tag: 'Köpek',
    price: 1249.9,
    image: '/images/food.png',
    alt: 'Kraft kağıt ambalajlı doğal köpek maması',
    badge: 'Çok Satan',
  },
  {
    name: 'Bulut Peluş Yatak',
    tag: 'Kedi & Köpek',
    price: 1899,
    image: '/images/bed.png',
    alt: 'Yuvarlak, bej renkli peluş evcil hayvan yatağı',
  },
  {
    name: 'Yün Keçe Oyuncak Seti',
    tag: 'Kedi',
    price: 349.9,
    image: '/images/toy.png',
    alt: 'El yapımı yün keçe toplar ve fare oyuncağı',
    badge: 'El Yapımı',
  },
  {
    name: 'Halat Gezdirme Tasması',
    tag: 'Köpek',
    price: 599.9,
    image: '/images/leash.png',
    alt: 'Pirinç kancalı orman yeşili halat tasma',
  },
]

export function FeaturedProducts() {
  return (
    <section id="products" aria-labelledby="products-heading" className="bg-secondary/60 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 id="products-heading" className="font-serif text-3xl font-semibold text-primary md:text-4xl">
              Müşterilerimizin favorileri
            </h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              Müşterilerimizin her hafta tekrar tekrar aldığı ürünler.
            </p>
          </div>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <li key={p.name}>
              <ProductCard {...p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
