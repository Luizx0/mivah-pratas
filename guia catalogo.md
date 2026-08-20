# MIVAH Pratas — Guia: Como Montar o Catálogo

Este guia explica como implementar a feature de **Catálogo** seguindo a arquitetura e as convenções já definidas no projeto. Serve tanto para quem está montando do zero quanto para quem vai dar manutenção depois.

---

## 1. Antes de começar — entenda as regras da arquitetura

O projeto segue **Clean Architecture adaptada ao Next.js**, com separação por *feature*. Isso significa:

| Regra | O que significa na prática |
|---|---|
| **Server Components por padrão** | Só use `"use client"` quando o componente precisar de interatividade real (estado, evento de clique, hook do React) |
| **Nenhuma lógica de negócio em componente de UI** | Toda chamada ao Supabase fica em `services/`, nunca direto dentro de um `.tsx` de página ou componente |
| **Separação por feature** | Tudo relacionado ao catálogo mora em `src/features/catalogo/`, não espalhado pelo projeto |
| **Sem arquivos gigantes** | Cada componente tem uma responsabilidade única (filtro, card, grade, paginação — cada um seu arquivo) |
| **Tipagem sempre via Supabase** | Os tipos vêm de `src/types/database.types.ts` (gerado pela CLI do Supabase), nunca digitados à mão |

Se uma dessas regras for quebrada durante a implementação, é sinal de que algo precisa ser reorganizado antes de seguir.

---

## 2. Pré-requisito: banco de dados modelado

Antes de escrever qualquer código do catálogo, as tabelas precisam existir no Supabase.

### Tabelas necessárias

```sql
create table categorias (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  slug text not null unique,
  created_at timestamptz default now()
);

create table produtos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  slug text not null unique,
  descricao text,
  preco numeric(10,2) not null,
  material text default 'Prata 925',
  peso_gramas numeric(6,2),
  dimensoes text,
  categoria_id uuid references categorias(id),
  imagem_principal text,
  imagens text[],
  em_destaque boolean default false,
  ativo boolean default true,
  created_at timestamptz default now()
);
```

### Segurança (RLS)

Como o catálogo é público, habilite RLS com leitura liberada:

```sql
alter table produtos enable row level security;
alter table categorias enable row level security;

create policy "Produtos visíveis publicamente"
on produtos for select
using (ativo = true);

create policy "Categorias visíveis publicamente"
on categorias for select
using (true);
```

**Checklist:**
- [ ] Tabelas criadas
- [ ] RLS habilitado com as policies acima
- [ ] Pelo menos 2-3 categorias e 4-5 produtos de teste cadastrados no Table Editor do Supabase

---

## 3. Gerar os tipos TypeScript do banco

Sempre que o schema do banco mudar, regenere os tipos — nunca edite `database.types.ts` manualmente:

```powershell
npx supabase login
npx supabase link --project-ref SEU_PROJECT_REF
npx supabase gen types typescript --linked > src/types/database.types.ts
```

Depois, crie os tipos de domínio que a feature vai usar, em `src/types/produto.ts`:

```typescript
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
```

---

## 4. Estrutura de pastas da feature

Tudo do catálogo vive dentro de `src/features/catalogo/`:

```
src/features/catalogo/
├── components/
│   ├── grade-produtos.tsx      # exibe a lista de produtos
│   ├── card-produto.tsx        # card individual de produto
│   ├── filtros.tsx             # filtros (categoria, preço, busca, ordenação)
│   └── paginacao.tsx           # navegação entre páginas
├── hooks/                      # hooks específicos do catálogo (se necessário)
└── services/
    └── produtos.service.ts     # toda comunicação com o Supabase
```

A página em si fica fora da feature, em `src/app/catalogo/page.tsx` — ela só **orquestra**, chamando o service e passando dados para os componentes da feature.

---

## 5. Passo a passo de implementação

### Passo 1 — Criar o service (camada de dados)

Arquivo: `src/features/catalogo/services/produtos.service.ts`

Responsabilidades:
- Buscar produtos com filtros (categoria, preço, busca, ordenação)
- Buscar categorias
- Aplicar paginação

Regra importante: o service usa o client de **servidor** do Supabase (`@/services/supabase/server`), não o de browser — porque ele roda em Server Components.

```typescript
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
```

> **Nota sobre filtro de categoria:** filtrar por uma coluna de tabela relacionada (`categorias.slug`) não funciona direto com `.eq()` num join implícito do Supabase. Se for necessário filtrar por categoria, o caminho mais confiável é buscar primeiro o `id` da categoria pelo slug, e então filtrar `produtos` por `categoria_id`.

**Checklist do Passo 1:**
- [ ] Service criado e sem lógica de UI dentro dele
- [ ] Tratamento de erro implementado (retorna array vazio em vez de quebrar a página)

---

### Passo 2 — Construir os componentes (camada de apresentação)

Cada componente tem uma responsabilidade única:

**`card-produto.tsx`** — Server Component, exibe um produto (imagem, nome, preço), com link para a página de produto.

**`grade-produtos.tsx`** — Server Component, recebe a lista de produtos e renderiza os cards em grid. Trata o estado vazio ("nenhum produto encontrado").

**`filtros.tsx`** — Client Component (`"use client"`), porque precisa reagir a eventos de seleção/digitação e atualizar a URL via `useRouter`/`useSearchParams`.

**`paginacao.tsx`** — Client Component, pelo mesmo motivo (interatividade + navegação).

**Regra de decisão Server vs Client:** se o componente só exibe dados vindos de fora, é Server Component. Se ele precisa de `useState`, `onClick`, `onChange` ou hooks do Next voltados a interação (`useRouter`, `useSearchParams` em modo de escrita), é Client Component.

**Checklist do Passo 2:**
- [ ] `card-produto.tsx` — Server Component
- [ ] `grade-produtos.tsx` — Server Component, trata lista vazia
- [ ] `filtros.tsx` — Client Component, atualiza a URL (não estado local solto)
- [ ] `paginacao.tsx` — Client Component, atualiza a URL

---

### Passo 3 — Montar a página (camada de orquestração)

Arquivo: `src/app/catalogo/page.tsx`

A página:
1. Lê os `searchParams` da URL (filtros ativos)
2. Chama o service para buscar produtos e categorias
3. Passa os dados para os componentes da feature
4. Define os metadados de SEO (`title`, `description`)

```tsx
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
```

**Por que a página é dinâmica (não estática):** o catálogo depende de `searchParams` (filtros, busca, paginação), então ela renderiza por request. Isso é esperado — otimizações de cache (`unstable_cache`, `revalidate`) ficam para a fase de performance, não para a implementação inicial.

**Checklist do Passo 3:**
- [ ] Página só orquestra — não tem query direta ao Supabase nela
- [ ] `metadata` configurado
- [ ] Filtros refletidos na URL (compartilhável, funciona com botão voltar do navegador)

---

### Passo 4 — Configurar imagens externas

Como as imagens vêm do Supabase Storage, configure em `next.config.ts`:

```typescript
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
}

export default nextConfig
```

---

## 6. Checklist final — catálogo pronto

- [ ] Tabelas `produtos` e `categorias` criadas no Supabase, com RLS
- [ ] Tipos gerados em `database.types.ts` e tipos de domínio em `produto.ts`
- [ ] Service em `features/catalogo/services/produtos.service.ts`, sem lógica de UI
- [ ] Componentes separados por responsabilidade (`card`, `grade`, `filtros`, `paginacao`)
- [ ] Página `/catalogo` só orquestrando, sem query direta
- [ ] Filtros, busca e ordenação funcionando via query params na URL
- [ ] Paginação funcionando
- [ ] Imagens carregando sem erro de hostname
- [ ] Estado vazio tratado ("nenhum produto encontrado")
- [ ] Nenhum arquivo com mais de uma responsabilidade clara

Se todos os itens estiverem marcados, o catálogo está alinhado com a arquitetura do projeto e pronto para servir de base para a página de produto individual.