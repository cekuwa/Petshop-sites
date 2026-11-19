import Image from 'next/image'
import { CalendarHeart, Scissors, Stethoscope } from 'lucide-react'

const services = [
  {
    icon: Scissors,
    title: 'Özenli tıraş ve bakım',
    body: 'Sakin ve korkutmayan yaklaşımla banyo, tüy kesimi ve tırnak bakımı.',
    price: '750 TL’den başlayan',
  },
  {
    icon: Stethoscope,
    title: 'Sağlık kontrolü',
    body: 'Anlaşmalı veterinerimizle aşı ve rutin kontroller için aylık ziyaretler.',
    price: '600 TL’den başlayan',
  },
  {
    icon: CalendarHeart,
    title: 'Kreş ve pansiyon',
    body: 'Siz yokken gözetimli oyun saatleri ve rahat gece konaklaması.',
    price: '900 TL / gün',
  },
]

export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-muted">
          <Image
            src="/images/grooming.png"
            alt="Kuaför tarafından nazikçe taranan beyaz, tüylü bir köpek"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 id="services-heading" className="font-serif text-3xl font-semibold text-primary md:text-4xl">
            Bakım hizmetleri de mağazamızda
          </h2>
          <p className="mt-3 text-muted-foreground text-pretty">
            Uzman ekibimiz her dostumuza ailesinden biri gibi davranır. Randevusuz gelebilirsiniz, ancak randevu
            almanızı öneririz.
          </p>
          <ul className="mt-8 flex flex-col gap-4">
            {services.map(({ icon: Icon, title, body, price }) => (
              <li key={title} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-semibold">{title}</h3>
                    <span className="text-sm font-medium text-primary">{price}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                </div>
              </li>
            ))}
          </ul>
          <a
            href="tel:+902120000000"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-accent px-6 font-medium text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Randevu için arayın: 0212 000 00 00
          </a>
        </div>
      </div>
    </section>
  )
}
