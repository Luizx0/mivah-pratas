import { Produto } from "@/types/produto"
import { CardProduto } from "./card-produto"

export function GradeProdutos({ produtos }: { produtos: Produto[] }) {
  if (produtos.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-24">
        Nenhum produto encontrado com esses filtros.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {produtos.map((produto) => (
        <CardProduto key={produto.id} produto={produto} />
      ))}
    </div>
  )
}