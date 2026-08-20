import { FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-24">
      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-heading text-xl text-primary mb-3">MIVAH</h3>
          <p className="text-sm text-muted-foreground">Sua essência em prata.</p>

          <a
            href="https://www.instagram.com/mivahpratas"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors group"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-full border border-border group-hover:border-primary transition-colors">
              <FaInstagram size={16} strokeWidth={1.5} />
            </span>
            @mivahpratas
          </a>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <a href="/politica-de-privacidade" className="hover:text-primary">Política de Privacidade</a>
          <a href="/trocas-e-devolucoes" className="hover:text-primary">Trocas e Devoluções</a>
          <a href="/garantia" className="hover:text-primary">Garantia</a>
          <a href="/cuidados-com-as-joias" className="hover:text-primary">Cuidados com as Joias</a>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} MIVAH Pratas. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}