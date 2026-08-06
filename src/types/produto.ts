import { Database } from "./database.types"

export type Produto = Database["public"]["Tables"]["produtos"]["Row"]
export type Categoria = Database["public"]["Tables"]["categorias"]["Row"]

export type FiltrosCatalogo = {
  categoria?: string
  precoMin?: number
  precoMax?: number
  busca?: string
  ordenacao?: "recentes" | "menor-preco" | "maior-preco"
  pagina?: number
}