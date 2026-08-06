import { createClient } from "@/services/supabase/server"
import { FiltrosCatalogo } from "@/types/produto"

const ITENS_POR_PAGINA = 12

export async function buscarProdutos(filtros: FiltrosCatalogo = {}) {
  const supabase = await createClient()
  const pagina = filtros.pagina ?? 1
  const inicio = (pagina - 1) * ITENS_POR_PAGINA
  const fim = inicio + ITENS_POR_PAGINA - 1

  let query = supabase
    .from("produtos")
    .select("*, categorias(nome, slug)", { count: "exact" })
    .eq("ativo", true)
    .range(inicio, fim)

  if (filtros.categoria) {
    query = query.eq("categorias.slug", filtros.categoria)
  }

  if (filtros.precoMin !== undefined) {
    query = query.gte("preco", filtros.precoMin)
  }

  if (filtros.precoMax !== undefined) {
    query = query.lte("preco", filtros.precoMax)
  }

  if (filtros.busca) {
    query = query.ilike("nome", `%${filtros.busca}%`)
  }

  switch (filtros.ordenacao) {
    case "menor-preco":
      query = query.order("preco", { ascending: true })
      break
    case "maior-preco":
      query = query.order("preco", { ascending: false })
      break
    default:
      query = query.order("created_at", { ascending: false })
  }

  const { data, count, error } = await query

  if (error) {
    console.error("Erro ao buscar produtos:", error.message)
    return { produtos: [], total: 0 }
  }

  return { produtos: data ?? [], total: count ?? 0 }
}

export async function buscarCategorias() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("categorias").select("*")

  if (error) {
    console.error("Erro ao buscar categorias:", error.message)
    return []
  }

  return data
}