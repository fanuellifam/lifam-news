export default function LatestNews({articles}:any){

return(

<section>

<h2 className="text-xl font-bold mb-4">
Latest News
</h2>

{articles.map((article:any)=>(

<div key={article.id} className="mb-6">

<a href={`/article/${article.slug}`}>
<h3 className="font-semibold">
{article.headline}
</h3>
</a>

<p className="text-sm text-gray-400">
{article.summary}
</p>

</div>

))}

</section>

)

}
