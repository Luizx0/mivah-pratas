import { produtosMock, categoriasMock } from "@/features/catalogo/data/produtos-mock"
import { FiltrosCatalogo } from "@/types/produto"

const ITENS_POR_PAGINA = 12

export async function buscarProdutos(filtros: FiltrosCatalogo = {}) {
  let resultado = produtosMock.filter((p) => p.ativo)

  if (filtros.categoria) {
    resultado = resultado.filter((p) => p.categorias?.slug === filtros.categoria)
  }

  if (filtros.precoMin !== undefined) {
    resultado = resultado.filter((p) => p.preco >= filtros.precoMin!)
  }

  if (filtros.precoMax !== undefined) {
    resultado = resultado.filter((p) => p.preco <= filtros.precoMax!)
  }

  if (filtros.busca) {
    const termo = filtros.busca.toLowerCase()
    resultado = resultado.filter((p) => p.nome.toLowerCase().includes(termo))
  }

  switch (filtros.ordenacao) {
    case "menor-preco":
      resultado = [...resultado].sort((a, b) => a.preco - b.preco)
      break
    case "maior-preco":
      resultado = [...resultado].sort((a, b) => b.preco - a.preco)
      break
    default:
      resultado = [...resultado].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
  }

  const total = resultado.length
  const pagina = filtros.pagina ?? 1
  const inicio = (pagina - 1) * ITENS_POR_PAGINA
  const fim = inicio + ITENS_POR_PAGINA

  return { produtos: resultado.slice(inicio, fim), total }
}

export async function buscarCategorias() {
  return categoriasMock
}