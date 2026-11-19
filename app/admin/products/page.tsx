
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
const adminId = process.env.ADMIN_USER_ID

async function getAdminToken() {
  const token = (await cookies()).get("cekuwa_admin_token")?.value

  if (!token || !url || !key || !adminId) {
    redirect("/admin")
  }

  try {
    const response = await fetch(`${url}/auth/v1/user`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })

    if (!response.ok) redirect("/admin")

    const user = await response.json()
    if (user.id !== adminId) redirect("/admin")

    return token
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "digest" in error
    ) throw error

    redirect("/admin")
  }
}

async function addProduct(formData: FormData) {
  "use server"

  const token = await getAdminToken()

  const name = String(formData.get("name") || "").trim()
  const price = Number(formData.get("price"))
  const stock = Number(formData.get("stock"))
  const category = String(formData.get("category") || "").trim()
  const image_url = String(formData.get("image_url") || "").trim()

  if (
    !name ||
    !Number.isFinite(price) ||
    price < 0 ||
    !Number.isSafeInteger(stock) ||
    stock < 0
  ) {
    redirect("/admin/products?error=invalid")
  }

  const response = await fetch(`${url}/rest/v1/products`, {
    method: "POST",
    headers: {
      apikey: key!,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name,
      price,
      stock,
      category,
      image_url: image_url || null,
      active: true,
    }),
    cache: "no-store",
  })

  if (!response.ok) {
    redirect("/admin/products?error=save")
  }

  redirect("/admin/products?success=1")
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    success?: string
    error?: string
  }>
}) {
  const token = await getAdminToken()
  const params = await searchParams

  const response = await fetch(
    `${url}/rest/v1/products?select=id,name,price,stock,category&order=created_at.desc`,
    {
      headers: {
        apikey: key!,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  const products = response.ok
    ? await response.json()
    : []

  return (
    <main className="min-h-screen bg-[#f8f4ec] p-5 text-[#204b35]">
      <div className="mx-auto max-w-3xl">
        <a href="/admin" className="text-sm underline">
          ← Yönetim Paneli
        </a>

        <h1 className="mt-6 text-3xl font-bold">
          CEKUWA Ürün Yönetimi
        </h1>

        <p className="mt-2 text-gray-600">
          Mağazana yeni ürün ekle.
        </p>

        {params.success && (
          <p className="mt-5 rounded-xl bg-green-100 p-4 text-green-800">
            Ürün başarıyla kaydedildi.
          </p>
        )}

        {params.error && (
          <p className="mt-5 rounded-xl bg-red-100 p-4 text-red-800">
            {params.error === "invalid"
              ? "Ürün bilgilerini kontrol et."
              : "Ürün kaydedilemedi. Veritabanı ayarlarını kontrol et."}
          </p>
        )}

        <form
          action={addProduct}
          className="mt-8 space-y-4 rounded-2xl bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold">
            Yeni Ürün Ekle
          </h2>

          <input
            name="name"
            placeholder="Ürün adı"
            required
            maxLength={200}
            className="w-full rounded-xl border p-3 text-black"
          />

          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            placeholder="Fiyat (TL)"
            required
            className="w-full rounded-xl border p-3 text-black"
          />

          <input
            name="stock"
            type="number"
            step="1"
            min="0"
            placeholder="Stok adedi"
            required
            className="w-full rounded-xl border p-3 text-black"
          />

          <input
            name="category"
            placeholder="Kategori"
            className="w-full rounded-xl border p-3 text-black"
          />

          <input
            name="image_url"
            type="url"
            placeholder="Ürün görseli URL (isteğe bağlı)"
            className="w-full rounded-xl border p-3 text-black"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-[#204b35] p-4 font-bold text-white"
          >
            Ürünü Kaydet
          </button>
        </form>

        <section className="mt-8">
          <h2 className="text-xl font-bold">
            Kayıtlı Ürünler
          </h2>

          {!response.ok && (
            <p className="mt-3 text-red-600">
              Ürün listesi yüklenemedi.
            </p>
          )}

          {response.ok && products.length === 0 && (
            <p className="mt-4 text-gray-600">
              Henüz ürün bulunmuyor.
            </p>
          )}

          <div className="mt-4 space-y-3">
            {products.map((product: {
              id: string
              name: string
              price: number
              stock: number
              category: string | null
            }) => (
              <div
                key={product.id}
                className="rounded-xl bg-white p-4 shadow-sm"
              >
                <h3 className="font-bold">
                  {product.name}
                </h3>
                <p>{product.category || "Kategorisiz"}</p>
                <p>Fiyat: {product.price} TL</p>
                <p>Stok: {product.stock}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
