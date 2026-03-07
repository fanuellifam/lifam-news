import ArticleCard from "./ArticleCard"

export default function TopStories({articles}:any){

return(

<section className="mb-12">

<h2 className="text-xl font-bold mb-4">
Top Stories
</h2>

<div className="grid grid-cols-3 gap-6">

{articles.slice(1,4).map((article:any)=>(
<ArticleCard key={article.id} article={article}/>
))}

</div>

</section>

)

}
