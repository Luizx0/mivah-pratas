"use server"

import { z } from "zod"
import { createClient } from "@/services/supabase/server"

const schemaContato = z.object({
  nome: z.string().min(2, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().optional(),
  mensagem: z.string().min(10, "Mensagem muito curta"),
})

export type EstadoContato = {
  sucesso: boolean
  erro?: string
}

export async function enviarContato(
  _estadoAnterior: EstadoContato,
  formData: FormData
): Promise<EstadoContato> {
  const dados = {
    nome: formData.get("nome"),
    email: formData.get("email"),
    telefone: formData.get("telefone"),
    mensagem: formData.get("mensagem"),
  }

  const validacao = schemaContato.safeParse(dados)

  if (!validacao.success) {
    return {
      sucesso: false,
      erro: validacao.error.issues[0]?.message ?? "Dados inválidos",
    }
  }

  const supabase = await createClient()
  const { error } = await supabase.from("mensagens_contato").insert(validacao.data)

  if (error) {
    console.error("Erro ao salvar contato:", error.message)
    return { sucesso: false, erro: "Erro ao enviar. Tente novamente." }
  }

  return { sucesso: true }
}