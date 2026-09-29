export type Categoria = {
  id: string
  nome: string
  slug: string
}

export type Produto = {
  id: string
  nome: string
  slug: string
  descricao: string | null
  preco: number
  material: string
  peso_gramas: number | null
  dimensoes: string | null
  categoria_id: string
  categorias: { nome: string; slug: string } | null
  imagem_principal: string | null
  imagens: string[]
  em_destaque: boolean
  ativo: boolean
  created_at: string
}

export type FiltrosCatalogo = {
  categoria?: string
  precoMin?: number
  precoMax?: number
  busca?: string
  ordenacao?: "recentes" | "menor-preco" | "maior-preco"
  pagina?: number
}