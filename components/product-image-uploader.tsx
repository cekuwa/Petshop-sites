
"use client"

import { useState } from "react"

type Props = {
  productId: number
}

export function ProductImageUploader({ productId }: Props) {
  const [files, setFiles] = useState<File[]>([])
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState("")

  async function uploadImages() {
    if (!files.length || busy) return

    setBusy(true)
    setMessage("Fotoğraflar yükleniyor...")

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        if (
          !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
          file.size > 5 * 1024 * 1024
        ) {
          throw new Error("Her fotoğraf JPG, PNG veya WebP ve en fazla 5 MB olmalı.")
        }

        const ticketResponse = await fetch("/api/admin/images/ticket", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: file.type }),
        })

        if (!ticketResponse.ok) {
          throw new Error("Yükleme bağlantısı alınamadı.")
        }

        const { uploadUrl, publicUrl } = await ticketResponse.json()

        const uploadResponse = await fetch(uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        })

        if (!uploadResponse.ok) {
          throw new Error("Fotoğraf yüklenemedi.")
        }

        const saveResponse = await fetch("/api/admin/images/attach", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId,
            imageUrl: publicUrl,
            position: i,
          }),
        })

        if (!saveResponse.ok) {
          throw new Error("Fotoğraf ürüne bağlanamadı.")
        }
      }

      setMessage("Fotoğraflar başarıyla yüklendi.")
      setFiles([])
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Yükleme başarısız."
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mt-4 rounded-xl border p-4">
      <label className="mb-3 block font-semibold">
        Ürün Fotoğrafları
      </label>

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        disabled={busy}
        onChange={(e) => setFiles(Array.from(e.target.files || []))}
        className="w-full text-sm"
      />

      <p className="mt-2 text-sm text-gray-500">
        Birden fazla fotoğraf seçebilirsin. Her biri en fazla 5 MB.
      </p>

      <button
        type="button"
        disabled={busy || files.length === 0}
        onClick={uploadImages}
        className="mt-4 rounded-xl bg-[#204b35] px-5 py-3 text-white disabled:opacity-50"
      >
        {busy ? "Yükleniyor..." : "Fotoğrafları Yükle"}
      </button>

      {message && <p className="mt-3 text-sm">{message}</p>}
    </div>
  )
}
