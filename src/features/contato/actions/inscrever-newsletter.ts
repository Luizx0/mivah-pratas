"use server"

import { z } from "zod"
import { createClient } from "@/services/supabase/server"

const schemaEmail = z.string().email()

export type EstadoNewsletter = {
  sucesso: boolean
  erro?: string
}

export async function inscreverNewsletter(
  _estadoAnterior: EstadoNewsletter,
  formData: FormData
): Promise<EstadoNewsletter> {
  const email = formData.get("email")
  const validacao = schemaEmail.safeParse(email)

  if (!validacao.success) {
    return { sucesso: false, erro: "E-mail inválido" }
  }

  const supabase = await createClient()
  const { error } = await supabase.from("newsletter").insert({ email: validacao.data })

  if (error) {
    if (error.code === "23505") {
      return { sucesso: false, erro: "Esse e-mail já está inscrito" }
    }
    return { sucesso: false, erro: "Erro ao inscrever. Tente novamente." }
  }

  return { sucesso: true }
}