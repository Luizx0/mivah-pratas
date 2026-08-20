import { FormularioContato } from "@/features/contato/components/formulario-contato"

export const metadata = {
  title: "Contato",
  description: "Fale com a MIVAH Pratas.",
}

export default function ContatoPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16">
      <div>
        <h1 className="font-heading text-4xl text-foreground mb-6">Contato</h1>
        <p className="text-muted-foreground mb-8">
          Envie sua mensagem ou fale direto com a gente pelo WhatsApp e Instagram.
        </p>
        <FormularioContato />
      </div>

      <div className="aspect-square rounded-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3059.133373378949!2d-48.08284749047076!3d-15.808568784770529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a33354c95c973%3A0x85ee2137c7b37ab!2sSt.%20Qi%20QI%2019%20-%20Taguatinga%2C%20Bras%C3%ADlia%20-%20DF%2C%2072135-190!5e1!3m2!1spt-BR!2sbr!4v1787194535269!5m2!1spt-BR!2sbr"
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </main>
  )
}

