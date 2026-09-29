import { produtosMock } from "@/features/catalogo/data/produtos-mock"

export async function buscarProdutoPorSlug(slug: string) {
  const produto = produtosMock.find((p) => p.slug === slug && p.ativo)
  return produto ?? null
}

export async function buscarProdutosRelacionados(categoriaId: string, produtoIdAtual: string) {
  return produtosMock
    .filter((p) => p.categoria_id === categoriaId && p.id !== produtoIdAtual && p.ativo)
    .slice(0, 4)
}

export async function buscarTodosSlugs() {
  return produtosMock.filter((p) => p.ativo).map((p) => ({ slug: p.slug }))
}