type Props = {
  nomeProduto: string
  precoProduto: number
}

export function WhatsappComprar({ nomeProduto, precoProduto }: Props) {
  const precoFormatado = precoProduto.toFixed(2).replace(".", ",")
  const mensagem = encodeURIComponent(
    `Olá! Tenho interesse na peça "${nomeProduto}" (R$ ${precoFormatado}). Pode me passar mais informações?`
  )
  const link = `https://wa.me/5561991543257?text=${mensagem}`

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block text-center bg-primary text-primary-foreground w-full py-4 rounded-md font-medium hover:opacity-90 transition-opacity"
    >
      Comprar pelo WhatsApp
    </a>
  )
}