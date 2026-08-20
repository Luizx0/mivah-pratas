"use client"

import { useActionState } from "react"
import { inscreverNewsletter, EstadoNewsletter } from "@/features/contato/actions/inscrever-newsletter"

const estadoInicial: EstadoNewsletter = { sucesso: false }

export function NewsletterForm() {
  const [estado, formAction, pendente] = useActionState(inscreverNewsletter, estadoInicial)

  if (estado.sucesso) {
    return <p className="text-sm text-primary">Inscrição confirmada, obrigado!</p>
  }

  return (
    <form action={formAction} className="flex gap-2 max-w-md">
      <input
        type="email"
        name="email"
        required
        placeholder="Seu e-mail"
        className="flex-1 border border-border rounded-md px-4 py-2 bg-background text-sm"
      />
      <button
        type="submit"
        disabled={pendente}
        className="bg-primary text-primary-foreground px-6 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {pendente ? "..." : "Inscrever"}
      </button>
      {estado.erro && <p className="text-xs text-destructive absolute mt-10">{estado.erro}</p>}
    </form>
  )
}