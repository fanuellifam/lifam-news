export default function BreakingNews({ articles }: { articles: any[] }) {

  if (!articles.length) return null

  return (
    <div style={{
      background: "red",
      color: "white",
      padding: "10px",
      marginBottom: "30px"
    }}>

      <strong>BREAKING:</strong>

      {articles.map((a) => (
        <span key={a.id} style={{ marginLeft: "20px" }}>
          {a.headline}
        </span>
      ))}

    </div>
  )
}
