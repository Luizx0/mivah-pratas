export const metadata = {
  title: "Sobre | MIVAH Pratas",
  description: "Conheça a história e os valores da MIVAH Pratas.",
}

export default function SobrePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="font-heading text-4xl text-foreground mb-6">Sobre a MIVAH</h1>
      <p className="text-muted-foreground leading-relaxed">
        Conteúdo institucional aqui — história da marca, valores, propósito.
      </p>
    </main>
  )
}