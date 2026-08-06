"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Categoria } from "../../../types/produto"

export function Filtros({ categorias }: { categorias: Categoria[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function atualizarFiltro(chave: string, valor: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (valor) {
      params.set(chave, valor)
    } else {
      params.delete(chave)
    }
    params.set("pagina", "1")
    router.push(`/catalogo?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-4 mb-10">
      <select
        className="border border-border rounded-md px-3 py-2 text-sm bg-background"
        onChange={(e) => atualizarFiltro("categoria", e.target.value)}
        defaultValue={searchParams.get("categoria") ?? ""}
      >
        <option value="">Todas as categorias</option>
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.slug}>
            {cat.nome}
          </option>
        ))}
      </select>

      <select
        className="border border-border rounded-md px-3 py-2 text-sm bg-background"
        onChange={(e) => atualizarFiltro("ordenacao", e.target.value)}
        defaultValue={searchParams.get("ordenacao") ?? "recentes"}
      >
        <option value="recentes">Mais recentes</option>
        <option value="menor-preco">Menor preço</option>
        <option value="maior-preco">Maior preço</option>
      </select>

      <input
        type="text"
        placeholder="Buscar..."
        className="border border-border rounded-md px-3 py-2 text-sm bg-background flex-1 min-w-[200px]"
        defaultValue={searchParams.get("busca") ?? ""}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            atualizarFiltro("busca", e.currentTarget.value)
          }
        }}
      />
    </div>
  )
}