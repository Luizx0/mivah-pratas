import { Produto } from "../../../types/produto"
import { CardProduto } from "../../../features/catalogo/components/card-produto"

export function ProdutosRelacionados({ produtos }: { produtos: Produto[] }) {
  if (produtos.length === 0) return null

  return (
    <section className="mt-24">
      <h2 className="font-heading text-2xl text-foreground mb-8">Você também pode gostar</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {produtos.map((produto) => (
          <CardProduto key={produto.id} produto={produto} />
        ))}
      </div>
    </section>
  )
}