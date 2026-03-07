type Article = {
  id: number
  headline: string
  summary: string
  featured_image?: any
}

export default function Hero({ article }: { article: Article }) {

  if (!article) return null

  return (
    <section style={{ marginBottom: "40px" }}>

      <h2 style={{ fontSize: "32px" }}>
        {article.headline}
      </h2>

      <p>{article.summary}</p>

    </section>
  )
}
