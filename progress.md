# MIVAH Pratas — Checklist de Progresso

Documento de acompanhamento do projeto. Marca o que já está pronto e o que falta, com foco especial nas configurações do Supabase, que ainda não foram executadas.

> **Google Analytics (Etapa 5 da Fase 4) foi movido para o backlog de melhorias futuras** — não faz parte do escopo atual.

---

## Fase 0 — Fundação

- [x] Projeto Next.js criado (TypeScript, Tailwind, App Router, `src/`)
- [x] Dependências principais instaladas (Supabase, Zod, React Hook Form, Framer Motion, Lucide, next-seo)
- [x] shadcn/ui configurado
- [x] Estrutura de pastas criada (`features/`, `services/`, `components/shared/`, `types/`)
- [x] Correção do `tsconfig.json` (`@/*` apontando para `./src/*`)
- [x] `components/` e `lib/` movidos para dentro de `src/`
- [x] Paleta e tipografia configuradas (`globals.css` com tokens shadcn)
- [x] ESLint + Prettier + Husky configurados
- [x] `.env.local` criado corretamente (URL e Key do Supabase preenchidas)
- [x] `.env.example` criado como modelo (sem valores reais)

---

## Fase 1 — Site Institucional

- [x] Header e Footer com navegação
- [x] Ícone/link do Instagram no Header e Footer
- [x] Home com hero, CTAs e seção de benefícios
- [x] Páginas institucionais criadas (Sobre, FAQ, Políticas, Garantia, Cuidados)
- [x] `sitemap.ts` e `robots.ts`
- [x] Metadata, Open Graph e Schema.org configurados

---

## Fase 2 — Catálogo

### Código (Next.js)
- [x] Service `produtos.service.ts` implementado
- [x] Tipos de domínio (`produto.ts`) criados
- [x] Componentes: `card-produto`, `grade-produtos`, `filtros`, `paginacao`
- [x] Página `/catalogo` implementada
- [x] `next.config.ts` com `remotePatterns` para imagens do Supabase

### Supabase 
- [ ] Tabela `categorias` criada
- [ ] Tabela `produtos` criada
- [ ] Índices (`idx_produtos_categoria`, `idx_produtos_ativo`) criados
- [ ] RLS habilitado em `produtos` e `categorias`
- [ ] Policy de leitura pública em `produtos`
- [ ] Policy de leitura pública em `categorias`
- [ ] Categorias de teste cadastradas (2–3)
- [ ] Produtos de teste cadastrados (4–5)
- [ ] CLI do Supabase instalada e logada (`supabase login`)
- [ ] Projeto linkado (`supabase link`)
- [ ] Tipos gerados em `src/types/database.types.ts`

---

## Fase 3 — Página de Produto

### Código (Next.js)
- [x] Service `produto.service.ts` (busca por slug, relacionados, todos os slugs)
- [x] Componente de Galeria com zoom
- [x] Botão de WhatsApp com mensagem dinâmica
- [x] Produtos relacionados
- [x] Compartilhamento (Web Share API + fallback)
- [x] Página `/produto/[slug]` com `generateStaticParams` e `generateMetadata`

### Supabase
- [ ] Depende das mesmas tabelas da Fase 2 (`produtos`, `categorias`) — ver acima

---

## Fase 4 — Contato e Integrações

### Código (Next.js)
- [x] Server Action `enviar-contato.ts`
- [x] Componente `formulario-contato.tsx`
- [x] Server Action `inscrever-newsletter.ts`
- [x] Componente `newsletter-form.tsx`
- [x] Página `/contato` com formulário

### Supabase 
- [ ] Tabela `mensagens_contato` criada
- [ ] RLS habilitado em `mensagens_contato`
- [ ] Policy de insert público em `mensagens_contato`
- [ ] Tabela `newsletter` criada
- [ ] RLS habilitado em `newsletter`
- [ ] Policy de insert público em `newsletter`

### Pendente 
- [x] Embed do Google Maps na página de contato (pegar link real no Google Maps)
- [ ] Sitemap enviado ao Google Search Console
- [x] Bloco/link do Instagram na Home (versão estática, sem feed dinâmico)

### Movido para o futuro
- [ ] ~~Google Analytics~~ → backlog de melhorias

---

## Fase 5 — Performance, SEO e Deploy (ainda não iniciada)

- [ ] Auditoria Lighthouse
- [ ] Otimização de imagens
- [ ] Revisão de Core Web Vitals
- [ ] PWA preparado
- [ ] Deploy de produção (Vercel)
- [ ] Configuração de domínio, DNS (Cloudflare) e SSL

---

## Próximo passo imediato

Como nada foi rodado no Supabase ainda, a sequência recomendada é:

1. Criar tabela `categorias`
2. Criar tabela `produtos` (com índices)
3. Habilitar RLS + policies de leitura em ambas
4. Cadastrar dados de teste
5. Instalar/logar CLI do Supabase e gerar `database.types.ts`
6. Testar `/catalogo` e `/produto/[slug]` com dados reais
7. Criar tabela `mensagens_contato` + RLS
8. Criar tabela `newsletter` + RLS
9. Testar formulário de contato e newsletter