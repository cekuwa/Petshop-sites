
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const cookieName = "cekuwa_admin_token"

async function isAdmin() {
  const token = (await cookies()).get(cookieName)?.value
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  const adminId = process.env.ADMIN_USER_ID

  if (!token || !url || !key || !adminId) return false

  try {
    const res = await fetch(`${url}/auth/v1/user`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })

    if (!res.ok) return false
    const user = await res.json()
    return user.id === adminId
  } catch {
    return false
  }
}

async function login(formData: FormData) {
  "use server"

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  const adminId = process.env.ADMIN_USER_ID

  if (!url || !key || !adminId) {
    redirect("/admin?error=1")
  }

  const email = String(formData.get("email") || "")
  const password = String(formData.get("password") || "")

  let session = null

  try {
    const res = await fetch(
      `${url}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        headers: {
          apikey: key,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        cache: "no-store",
      }
    )

    if (res.ok) session = await res.json()
  } catch {
    session = null
  }

  if (
    !session?.access_token ||
    session.user?.id !== adminId
  ) {
    redirect("/admin?error=1")
  }

  ;(await cookies()).set(cookieName, session.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: Math.min(session.expires_in || 3600, 3600),
  })

  redirect("/admin")
}

async function logout() {
  "use server"
  ;(await cookies()).delete(cookieName)
  redirect("/admin")
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const authorized = await isAdmin()
  const params = await searchParams

  if (!authorized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f4ec] p-5">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
          <h1 className="text-center text-3xl font-bold text-[#204b35]">
            CEKUWA
          </h1>
          <p className="mt-3 text-center text-gray-600">
            Yönetici Girişi
          </p>

          {params.error && (
            <p className="mt-4 text-center text-red-600">
              Giriş başarısız. Bilgilerini kontrol et.
            </p>
          )}

          <form action={login} className="mt-8 space-y-4">
            <input
              type="email"
              name="email"
              placeholder="E-posta adresi"
              autoComplete="email"
              required
              className="w-full rounded-xl border p-4 text-black"
            />
            <input
              type="password"
              name="password"
              placeholder="Şifre"
              autoComplete="current-password"
              required
              className="w-full rounded-xl border p-4 text-black"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-[#204b35] p-4 font-bold text-white"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </main>
    )
  }

  const sections = [
    ["📦 Ürün Yönetimi", "Ürün ekleme, düzenleme ve silme"],
    ["🔄 XML Entegrasyonu", "XML aktarımı ve senkronizasyon"],
    ["📊 Stok ve Fiyat", "Stok ve fiyat güncelleme"],
    ["🛒 Siparişler", "Sipariş ve kargo yönetimi"],
  ]

  return (
    <main className="min-h-screen bg-[#f8f4ec] p-6 text-[#204b35]">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <p className="font-bold">CEKUWA PETSHOP</p>
          <h1 className="mt-3 text-3xl font-bold">
            Yönetim Paneli
          </h1>
          <p className="mt-3">Mağazanı tek yerden yönet.</p>
          <form action={logout} className="mt-4">
            <button className="rounded-xl border px-4 py-2">
              Güvenli Çıkış
            </button>
          </form>
        </header>

        <div className="grid gap-5 sm:grid-cols-2">
          {sections.map(([title, description]) => (
            <section
              key={title}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold">
                {title}
              </h2>
              <p className="mt-3 text-gray-600">
                {description}
              </p>
              <p className="mt-5 text-sm">Hazırlanıyor</p>
            </section>
          ))}
        </div>

        <a href="/" className="mt-8 inline-block underline">
          Mağazayı Gör
        </a>
      </div>
    </main>
  )
}
