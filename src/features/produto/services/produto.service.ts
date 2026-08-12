import { createClient } from "../../../services/supabase/server"

export async function buscarProdutoPorSlug(slug: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("produtos")
    .select("*, categorias(nome, slug)")
    .eq("slug", slug)
    .eq("ativo", true)
    .single()

  if (error) {
    console.error("Erro ao buscar produto:", error.message)
    return null
  }

  return data
}

export async function buscarProdutosRelacionados(categoriaId: string, produtoIdAtual: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .eq("categoria_id", categoriaId)
    .eq("ativo", true)
    .neq("id", produtoIdAtual)
    .limit(4)

  if (error) {
    console.error("Erro ao buscar relacionados:", error.message)
    return []
  }

  return data
}

export async function buscarTodosSlugs() {
  const supabase = await createClient()
  const { data } = await supabase.from("produtos").select("slug").eq("ativo", true)
  return data ?? []
}