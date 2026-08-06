import Link from "next/link"
import Image from "next/image"
import { Produto } from "@/types/produto"

export function CardProduto({ produto }: { produto: Produto }) {
  return (
    <Link href={`/produto/${produto.slug}`} className="group block">
      <div className="aspect-square bg-muted rounded-lg overflow-hidden relative">
        {produto.imagem_principal && (
          <Image
            src={produto.imagem_principal}
            alt={produto.nome}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>
      <h3 className="mt-4 font-heading text-lg text-foreground">{produto.nome}</h3>
      <p className="text-sm text-muted-foreground mt-1">
        R$ {produto.preco.toFixed(2).replace(".", ",")}
      </p>
    </Link>
  )
}