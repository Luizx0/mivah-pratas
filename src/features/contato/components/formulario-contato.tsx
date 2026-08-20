"use client"

import { useActionState } from "react"
import { enviarContato, EstadoContato } from "../actions/enviar-contato"

const estadoInicial: EstadoContato = { sucesso: false }

export function FormularioContato() {
  const [estado, formAction, pendente] = useActionState(enviarContato, estadoInicial)

  if (estado.sucesso) {
    return (
      <div className="text-center py-12">
        <p className="text-primary font-heading text-xl">Mensagem enviada!</p>
        <p className="text-muted-foreground mt-2 text-sm">
          Obrigado pelo contato. Retornaremos em breve.
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-5 max-w-lg">
      <div>
        <label htmlFor="nome" className="block text-sm text-foreground mb-1">Nome</label>
        <input
          id="nome"
          name="nome"
          required
          className="w-full border border-border rounded-md px-4 py-2 bg-background text-sm"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-foreground mb-1">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border border-border rounded-md px-4 py-2 bg-background text-sm"
        />
      </div>

      <div>
        <label htmlFor="telefone" className="block text-sm text-foreground mb-1">Telefone (opcional)</label>
        <input
          id="telefone"
          name="telefone"
          className="w-full border border-border rounded-md px-4 py-2 bg-background text-sm"
        />
      </div>

      <div>
        <label htmlFor="mensagem" className="block text-sm text-foreground mb-1">Mensagem</label>
        <textarea
          id="mensagem"
          name="mensagem"
          required
          rows={5}
          className="w-full border border-border rounded-md px-4 py-2 bg-background text-sm resize-none"
        />
      </div>

      {estado.erro && (
        <p className="text-sm text-destructive">{estado.erro}</p>
      )}

      <button
        type="submit"
        disabled={pendente}
        className="bg-primary text-primary-foreground px-8 py-3 rounded-md text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {pendente ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  )
}