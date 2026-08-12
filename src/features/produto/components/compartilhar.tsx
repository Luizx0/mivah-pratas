"use client"

import { Share2 } from "lucide-react"
import { useState } from "react"

export function Compartilhar({ nomeProduto }: { nomeProduto: string }) {
  const [copiado, setCopiado] = useState(false)

  async function handleShare() {
    const url = window.location.href

    if (navigator.share) {
      await navigator.share({ title: nomeProduto, url })
      return
    }

    await navigator.clipboard.writeText(url)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
    >
      <Share2 size={16} />
      {copiado ? "Link copiado!" : "Compartilhar"}
    </button>
  )
}