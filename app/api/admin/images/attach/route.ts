
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
        { error: "Giriş gerekli" },
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

    const { productId, imageUrl, position } =
      await request.json()

    const prefix =
      `${url}/storage/v1/object/public/product-images/products/`

    if (
      !Number.isSafeInteger(productId) ||
      productId <= 0 ||
      !Number.isSafeInteger(position) ||
      position < 0 ||
      typeof imageUrl !== "string" ||
      !imageUrl.startsWith(prefix)
    ) {
      return NextResponse.json(
        { error: "Geçersiz fotoğraf bilgisi" },
        { status: 400 }
      )
    }

    const fileName = imageUrl.slice(prefix.length)

    if (
      !/^[0-9a-f-]{36}\.(jpg|png|webp)$/i.test(fileName)
    ) {
      return NextResponse.json(
        { error: "Geçersiz fotoğraf adresi" },
        { status: 400 }
      )
    }

    const productResponse = await fetch(
      `${url}/rest/v1/products?id=eq.${productId}&select=id`,
      {
        headers,
        cache: "no-store",
      }
    )

    if (!productResponse.ok) {
      return NextResponse.json(
        { error: "Ürün kontrol edilemedi" },
        { status: 500 }
      )
    }

    const products = await productResponse.json()

    if (!products.length) {
      return NextResponse.json(
        { error: "Ürün bulunamadı" },
        { status: 404 }
      )
    }

    const response = await fetch(
      `${url}/rest/v1/product_images`,
      {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          product_id: productId,
          image_url: imageUrl,
          position,
        }),
        cache: "no-store",
      }
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: "Fotoğraf ürüne bağlanamadı" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
    })
  } catch {
    return NextResponse.json(
      { error: "İşlem başarısız" },
      { status: 500 }
    )
  }
}
