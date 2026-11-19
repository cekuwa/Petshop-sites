import { Star } from 'lucide-react'

const reviews = [
  {
    quote: 'Sahiplendiğimiz ürkek köpeğimiz mağazaya girerken kuyruk sallıyor. Bakım ekibi inanılmaz sabırlı.',
    name: 'Elif S.',
    pet: 'Fındık, beagle kırması',
  },
  {
    quote: 'Seçici kedimin sonunda yediği mamayı bulmama yardım ettiler. Samimi tavsiyeler, hiç ısrar yok.',
    name: 'Burak R.',
    pet: 'Tarçın, tekir',
  },
  {
    quote: 'Aynı gün teslimat bizi defalarca kurtardı. Gerçek bir mahalle dükkanı sıcaklığı var.',
    name: 'Aydın ailesi',
    pet: 'Pamuk ve Karabiber',
  },
]

export function Testimonials() {
  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="bg-primary py-16 text-primary-foreground md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 id="reviews-heading" className="font-serif text-3xl font-semibold md:text-4xl">
          Mutlu müşterilerimizden
        </h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <li key={r.name}>
              <figure className="flex h-full flex-col gap-4 rounded-3xl bg-primary-foreground/8 p-6 ring-1 ring-primary-foreground/15">
                <div className="flex gap-0.5 text-accent" role="img" aria-label="5 üzerinden 5 yıldız">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="font-serif text-lg leading-relaxed">{`“${r.quote}”`}</blockquote>
                <figcaption className="mt-auto text-sm">
                  <span className="font-semibold">{r.name}</span>
                  <span className="text-primary-foreground/70">{` · ${r.pet}`}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
