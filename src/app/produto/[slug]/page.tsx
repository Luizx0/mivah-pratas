import { notFound } from "next/navigation"
import {
  buscarProdutoPorSlug,
  buscarProdutosRelacionados,
  buscarTodosSlugs,
} from "../../../features/produto/services/produto.service"
import { Galeria } from "../../../features/produto/components/galeria"
import { WhatsappComprar } from "../../../features/produto/components/whatsapp-comprar"
import { ProdutosRelacionados } from "../../../features/produto/components/produtos-relacionados"
import { Compartilhar } from "../../../features/produto/components/compartilhar"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await buscarTodosSlugs()
  return slugs.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const produto = await buscarProdutoPorSlug(slug)

  if (!produto) return {}

  return {
    title: produto.nome,
    description: produto.descricao ?? `Conheça ${produto.nome} da coleção MIVAH Pratas.`,
    openGraph: {
      title: produto.nome,
      description: produto.descricao ?? undefined,
      images: produto.imagem_principal ? [produto.imagem_principal] : [],
    },
  }
}

export default async function ProdutoPage({ params }: Props) {
  const { slug } = await params
  const produto = await buscarProdutoPorSlug(slug)

  if (!produto) {
    notFound()
  }

  const relacionados = produto.categoria_id
    ? await buscarProdutosRelacionados(produto.categoria_id, produto.id)
    : []

  const imagens = produto.imagens?.length
    ? produto.imagens
    : produto.imagem_principal
      ? [produto.imagem_principal]
      : []

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <Galeria imagens={imagens} nome={produto.nome} />

        <div>
          <h1 className="font-heading text-4xl text-foreground">{produto.nome}</h1>
          <p className="text-2xl text-primary mt-3">
            R$ {produto.preco.toFixed(2).replace(".", ",")}
          </p>

          <p className="text-muted-foreground mt-6 leading-relaxed">{produto.descricao}</p>

          <dl className="mt-8 space-y-2 text-sm">
            <div className="flex justify-between border-b border-border py-2">
              <dt className="text-muted-foreground">Material</dt>
              <dd className="text-foreground">{produto.material}</dd>
            </div>
            {produto.peso_gramas && (
              <div className="flex justify-between border-b border-border py-2">
                <dt className="text-muted-foreground">Peso</dt>
                <dd className="text-foreground">{produto.peso_gramas}g</dd>
              </div>
            )}
            {produto.dimensoes && (
              <div className="flex justify-between border-b border-border py-2">
                <dt className="text-muted-foreground">Dimensões</dt>
                <dd className="text-foreground">{produto.dimensoes}</dd>
              </div>
            )}
          </dl>

          <div className="mt-8">
            <WhatsappComprar nomeProduto={produto.nome} precoProduto={produto.preco} />
          </div>

          <div className="mt-6">
            <Compartilhar nomeProduto={produto.nome} />
          </div>
        </div>
      </div>

      <ProdutosRelacionados produtos={relacionados} />
    </main>
  )
}