export default function Home() {
  return (
    <main>
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 bg-background">
        <h1 className="font-heading text-5xl md:text-7xl text-foreground max-w-3xl">
          Sua essência em prata.
        </h1>
        <p className="mt-6 text-muted-foreground max-w-xl">
          Joias atemporais, feitas para acompanhar sua história.
        </p>
        <div className="mt-10 flex gap-4">
          
            href="/catalogo"
            className="bg-primary text-primary-foreground px-8 py-3 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Comprar Agora
          </a>
          
            href="/sobre"
            className="border border-border px-8 py-3 rounded-md text-sm font-medium hover:bg-muted transition-colors"
          >
            Conhecer a Marca
          </a>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <div>
          <h3 className="font-heading text-xl text-primary mb-2">Prata 925</h3>
          <p className="text-sm text-muted-foreground">Qualidade garantida em cada peça.</p>
        </div>
        <div>
          <h3 className="font-heading text-xl text-primary mb-2">Garantia</h3>
          <p className="text-sm text-muted-foreground">Suporte completo após a compra.</p>
        </div>
        <div>
          <h3 className="font-heading text-xl text-primary mb-2">Frete</h3>
          <p className="text-sm text-muted-foreground">Entregamos para todo o Brasil.</p>
        </div>
      </section>
    </main>
  )
}