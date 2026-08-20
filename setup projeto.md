
---

## Pré-requisitos

Antes de começar, tenha instalado:

- **Node.js** (versão 20 ou superior) — [nodejs.org](https://nodejs.org)
- **Git** — [git-scm.com](https://git-scm.com)
- Acesso ao projeto no **Supabase** (peça o convite ou as credenciais para quem administra o projeto)

Confira se está tudo certo:

```powershell
node -v
npm -v
git -v
```

---

## Passo 1: Clonar o repositório

```powershell
git clone <URL_DO_REPOSITORIO>
cd mivah-pratas
```

---

## Passo 2: Instalar as dependências

```powershell
npm install
```

Isso lê o `package.json` e instala tudo (Next.js, Supabase, Tailwind, shadcn/ui, etc.).

---

## Passo 3: Configurar as variáveis de ambiente

O projeto precisa de credenciais do Supabase que **não vêm no repositório** por segurança. Existe um arquivo `.env.example` que serve de modelo:

```powershell
Copy-Item .env.example .env.local
```

Abra `.env.local` e preencha com os valores reais (peça para quem administra o projeto Supabase, ou pegue em **Supabase → Settings → API**):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

**Atenção:**
- Sem aspas, sem espaço ao redor do `=`
- Esse arquivo nunca deve ser commitado (já está no `.gitignore`)
- Confirme que ele existe de verdade rodando:

```powershell
Get-ChildItem -Force
```

Deve aparecer `.env.local` na listagem.

---

## Passo 4: Rodar o projeto

```powershell
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

**Se der erro de Supabase** ("URL and Key are required..."), quase sempre é porque:
1. O `.env.local` não foi criado corretamente, ou
2. O servidor foi iniciado antes de você criar/editar o arquivo (reinicie com `Ctrl+C` e `npm run dev` de novo)


## Comandos úteis do dia a dia

```powershell
npm run dev          # roda o projeto em modo desenvolvimento
npm run build         # gera o build de produção (bom para checar erros antes de subir)
npm run lint           # roda o linter
Remove-Item -Recurse -Force .next    # limpa o cache do Next/Turbopack (use se algo estiver "grudado")
```

---