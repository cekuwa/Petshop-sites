'use client'

import { useState } from 'react'

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section aria-labelledby="newsletter-heading" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <div className="flex flex-col items-center gap-6 rounded-[2rem] bg-secondary px-6 py-12 text-center md:px-12">
        <h2 id="newsletter-heading" className="font-serif text-3xl font-semibold text-balance text-primary md:text-4xl">
          Aramıza katılın, %10 indirim kazanın
        </h2>
        <p className="max-w-md text-muted-foreground">
          Aylık bakım ipuçları, yeni ürünler ve üyelere özel fırsatlar. Gereksiz e-posta yok, sadece patili haberler.
        </p>
        {submitted ? (
          <p role="status" className="font-medium text-primary">
            Aramıza hoş geldiniz! İndirim kodunuz e-posta adresinize gönderildi.
          </p>
        ) : (
          <form
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
            }}
          >
            <label htmlFor="email" className="sr-only">
              E-posta adresi
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="ornek@eposta.com"
              className="h-12 flex-1 rounded-full border border-input bg-card px-5 outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
            />
            <button
              type="submit"
              className="h-12 rounded-full bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Abone Ol
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
