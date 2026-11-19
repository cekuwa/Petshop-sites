import { Clock, MapPin, PawPrint, Phone } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3 md:px-6">
        <div className="flex flex-col gap-3">
          <p className="flex items-center gap-2 font-serif text-xl font-semibold text-primary">
            <PawPrint className="size-5 text-accent" aria-hidden="true" />
            PETSHOP
          </p>
          <p className="max-w-xs text-sm text-muted-foreground">
            Doğal ürünler ve içten bir ilgiyle mahallemize hizmet veren aile işletmesi pet shop.
          </p>
        </div>
        <address className="flex flex-col gap-3 text-sm not-italic text-muted-foreground">
          <span className="flex items-center gap-2">
            <MapPin className="size-4 text-primary" aria-hidden="true" />
            Moda Caddesi No: 214, Kadıköy / İstanbul
          </span>
          <a href="tel:+902120000000" className="flex items-center gap-2 hover:text-foreground">
            <Phone className="size-4 text-primary" aria-hidden="true" />
            0212 000 00 00
          </a>
        </address>
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <Clock className="mt-0.5 size-4 text-primary" aria-hidden="true" />
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            <dt>Pzt–Cuma</dt>
            <dd>09:00 – 19:00</dd>
            <dt>Cumartesi</dt>
            <dd>09:00 – 18:00</dd>
            <dt>Pazar</dt>
            <dd>10:00 – 16:00</dd>
          </dl>
        </div>
      </div>
      <p className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © 2026 PETSHOP. Tüm hakları saklıdır.
      </p>
    </footer>
  )
}
