import Link from "next/link"
import { FaInstagram } from "react-icons/fa";

const links = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
  { href: "/faq", label: "FAQ" },
]

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        <Link href="/" className="font-heading text-2xl text-primary tracking-wide">
          MIVAH
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href="https://www.instagram.com/mivahpratas"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram da MIVAH Pratas"
          className="text-foreground hover:text-primary transition-colors"
        >
          <FaInstagram size={20} strokeWidth={1.5} />
        </a>
      </div>
    </header>
  )
}