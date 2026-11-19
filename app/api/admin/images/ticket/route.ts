
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const token = (await cookies()).get("cekuwa_admin_token")?.value

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    const adminId = process.env.ADMIN_USER_ID

    if (!token || !url || !key || !adminId) {
      return NextResponse.json(
        { error: "Yetkisiz erişim" },
        { status: 401 }
      )
    }

    const headers = {
      apikey: key,
      Authorization: `Bearer ${token}`,
    }

    const authResponse = await fetch(`${url}/auth/v1/user`, {
      headers,
      cache: "no-store",
    })

    if (!authResponse.ok) {
      return NextResponse.json(
        { error: "Oturum geçersiz" },
        { status: 401 }
      )
    }

    const user = await authResponse.json()

    if (user.id !== adminId) {
      return NextResponse.json(
        { error: "Yönetici yetkisi gerekli" },
        { status: 403 }
      )
    }

    const { type } = await request.json()

    const extensions: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
    }

    const extension = extensions[type]

    if (!extension) {
      return NextResponse.json(
        { error: "Desteklenmeyen görsel türü" },
        { status: 400 }
      )
    }

    const path = `products/${crypto.randomUUID()}.${extension}`

    const result = await fetch(
      `${url}/storage/v1/object/upload/sign/product-images/${path}`,
      {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: "{}",
        cache: "no-store",
      }
    )

    if (!result.ok) {
      return NextResponse.json(
        { error: "Yükleme bağlantısı oluşturulamadı" },
        { status: 500 }
      )
    }

    const data = await result.json()

    if (
      typeof data.url !== "string" ||
      !data.url.startsWith("/object/upload/sign/")
    ) {
      return NextResponse.json(
        { error: "Geçersiz yükleme bağlantısı" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      uploadUrl: `${url}/storage/v1${data.url}`,
      publicUrl:
        `${url}/storage/v1/object/public/product-images/${path}`,
    })
  } catch {
    return NextResponse.json(
      { error: "Fotoğraf yükleme bağlantısı hazırlanamadı" },
      { status: 500 }
    )
  }
}
