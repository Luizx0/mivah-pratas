import type { Metadata } from "next"
import { Montserrat, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Header } from "../components/shared/header"
import { Footer } from "../components/shared/footer"
import { WhatsappButton } from "../components/shared/whatsapp-button"

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
})

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "MIVAH Pratas | Sua essência em prata",
    template: "%s | MIVAH Pratas",
  },
  description: "Joias em prata premium. Luxo discreto, atemporal.",
  metadataBase: new URL("https://mivahpratas.com.br"),
  openGraph: {
    title: "MIVAH Pratas",
    description: "Sua essência em prata.",
    url: "https://mivahpratas.com.br",
    siteName: "MIVAH Pratas",
    locale: "pt_BR",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "MIVAH Pratas",
            url: "https://mivahpratas.com.br",
            description: "Joias em prata premium.",
          }),
        }}
      />
      <body className={`${montserrat.variable} ${playfair.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
        <WhatsappButton />
      </body>
    </html>
    
  )
}