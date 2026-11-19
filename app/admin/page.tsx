
const bolumler = [
  {
    baslik: "📦 Ürün Yönetimi",
    aciklama: "Ürün ekleme, düzenleme ve silme",
  },
  {
    baslik: "🔄 XML Entegrasyonu",
    aciklama: "Tedarikçi XML ve otomatik güncelleme",
  },
  {
    baslik: "📊 Stok ve Fiyat",
    aciklama: "Stok takibi ve fiyat güncelleme",
  },
  {
    baslik: "🛒 Siparişler",
    aciklama: "Sipariş ve kargo yönetimi",
  },
]

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#f8f4ec] p-6 text-[#204b35]">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <p className="text-sm font-bold">CEKUWA PETSHOP</p>
          <h1 className="mt-3 text-3xl font-bold">
            Yönetim Paneli
          </h1>
          <p className="mt-3 text-gray-600">
            Mağazanı tek yerden yönet.
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2">
          {bolumler.map((bolum) => (
            <section
              key={bolum.baslik}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold">
                {bolum.baslik}
              </h2>
              <p className="mt-3 text-gray-600">
                {bolum.aciklama}
              </p>
              <p className="mt-5 text-sm">
                Hazırlanıyor
              </p>
            </section>
          ))}
        </div>

        <a
          href="/"
          className="mt-8 inline-block rounded-xl bg-[#204b35] px-6 py-3 text-white"
        >
          Mağazayı Gör
        </a>
      </div>
    </main>
  )
}
