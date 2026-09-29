import { buscarProdutos, buscarCategorias } from "@/features/catalogo/services/produtos.service"
import { GradeProdutos } from "@/features/catalogo/components/grade-produtos"
import { Filtros } from "@/features/catalogo/components/filtros"
import { Paginacao } from "@/features/catalogo/components/paginacao"

export const metadata = {
  title: "Catálogo",
  description: "Conheça toda a coleção MIVAH Pratas.",
}

const ITENS_POR_PAGINA = 12

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>
}

export default async function CatalogoPage({ searchParams }: Props) {
  const params = await searchParams
  const pagina = Number(params.pagina) || 1

  const [{ produtos, total }, categorias] = await Promise.all([
    buscarProdutos({
      categoria: params.categoria,
      busca: params.busca,
      ordenacao: params.ordenacao as "recentes" | "menor-preco" | "maior-preco" | undefined,
      pagina,
    }),
    buscarCategorias(),
  ])

  const totalPaginas = Math.ceil(total / ITENS_POR_PAGINA)

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="font-heading text-4xl text-foreground mb-10">Catálogo</h1>
      <Filtros categorias={categorias} />
      <GradeProdutos produtos={produtos} />
      <Paginacao paginaAtual={pagina} totalPaginas={totalPaginas} />
    </main>
  )
}