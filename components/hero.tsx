import Image from 'next/image'
import { ArrowRight, Leaf, Truck } from 'lucide-react'

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:px-6 md:py-20">
      <div className="flex flex-col gap-6">
        <p className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium tracking-wide text-secondary-foreground">
          <Leaf className="size-3.5 text-primary" aria-hidden="true" />
          2012&apos;DEN BERİ DOĞAL ÜRÜNLER
        </p>
        <h1 className="font-serif text-4xl leading-tight font-semibold text-balance text-primary md:text-6xl">
          Can dostunuzun ihtiyacı olan her şey, fazlasıyla.
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
          Kedi ve köpekler için sağlıklı mamalar, el yapımı oyuncaklar ve özenli bakım hizmetleri; onları sizin
          kadar seven bir ekip tarafından seçildi.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#products"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Çok Satanları İncele
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <a
            href="#services"
            className="inline-flex h-12 items-center rounded-full border border-border bg-card px-6 font-medium transition-colors hover:bg-secondary"
          >
            Bakım Randevusu Al
          </a>
        </div>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Truck className="size-4 text-accent" aria-hidden="true" />
          1.000 TL ve üzeri siparişlerde kargo bedava
        </p>
      </div>

      <div className="relative">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-secondary md:aspect-square">
          <Image
            src="/images/hero.png"
            alt="Yan yana oturan bir golden retriever ve turuncu tekir kedi"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute -bottom-5 left-4 rounded-2xl border border-border bg-card px-5 py-4 shadow-lg md:-left-6">
          <p className="font-serif text-2xl font-semibold text-primary">4,9 / 5</p>
          <p className="text-sm text-muted-foreground">2.300+ mutlu müşteriden</p>
        </div>
      </div>
    </section>
  )
}
