"use client"

import { useState } from "react"
import Image from "next/image"

type Props = {
  imagens: string[]
  nome: string
}

export function Galeria({ imagens, nome }: Props) {
  const [imagemAtiva, setImagemAtiva] = useState(0)
  const [zoomAtivo, setZoomAtivo] = useState(false)
  const [posicaoZoom, setPosicaoZoom] = useState({ x: 50, y: 50 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setPosicaoZoom({ x, y })
  }

  if (imagens.length === 0) {
    return <div className="aspect-square bg-muted rounded-lg" />
  }

  return (
    <div>
      <div
        className="aspect-square bg-muted rounded-lg overflow-hidden relative cursor-zoom-in"
        onMouseEnter={() => setZoomAtivo(true)}
        onMouseLeave={() => setZoomAtivo(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={imagens[imagemAtiva]}
          alt={nome}
          fill
          className="object-cover transition-transform duration-200"
          style={
            zoomAtivo
              ? {
                  transform: "scale(2)",
                  transformOrigin: `${posicaoZoom.x}% ${posicaoZoom.y}%`,
                }
              : undefined
          }
          priority
        />
      </div>

      {imagens.length > 1 && (
        <div className="flex gap-3 mt-4">
          {imagens.map((img, index) => (
            <button
              key={img}
              onClick={() => setImagemAtiva(index)}
              className={`w-20 h-20 rounded-md overflow-hidden relative border-2 transition-colors ${
                index === imagemAtiva ? "border-primary" : "border-transparent"
              }`}
            >
              <Image src={img} alt={`${nome} - imagem ${index + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}