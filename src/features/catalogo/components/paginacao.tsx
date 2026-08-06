"use client"

import { useRouter, useSearchParams } from "next/navigation"

export function Paginacao({ paginaAtual, totalPaginas }: { paginaAtual: number; totalPaginas: number }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function irPara(pagina: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("pagina", String(pagina))
    router.push(`/catalogo?${params.toString()}`)
  }

  if (totalPaginas <= 1) return null

  return (
    <div className="flex justify-center gap-2 mt-16">
      {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
        <button
          key={pagina}
          onClick={() => irPara(pagina)}
          className={`w-9 h-9 rounded-md text-sm ${
            pagina === paginaAtual
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted text-foreground"
          }`}
        >
          {pagina}
        </button>
      ))}
    </div>
  )
}