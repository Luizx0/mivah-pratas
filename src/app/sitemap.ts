import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mivahpratas.com.br"

  const routes = [
    "",
    "/sobre",
    "/contato",
    "/faq",
    "/politica-de-privacidade",
    "/trocas-e-devolucoes",
    "/garantia",
    "/cuidados-com-as-joias",
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }))
}