import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Categories } from '@/components/categories'
import { FeaturedProducts } from '@/components/featured-products'
import { Services } from '@/components/services'
import { Testimonials } from '@/components/testimonials'
import { Newsletter } from '@/components/newsletter'
import { SiteFooter } from '@/components/site-footer'
import { CartProvider } from '@/components/cart-context'

export default function Home() {
  return (
    <CartProvider>
      <SiteHeader />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <Services />
        <Testimonials />
        <Newsletter />
      </main>
      <SiteFooter />
    </CartProvider>
  )
}
