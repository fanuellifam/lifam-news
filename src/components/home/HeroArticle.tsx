export default function HeroArticle({article}:any){

if(!article) return null

return(

<div className="mb-12">

<img
src={`https://cms.lifamin.site/assets/${article.featured_image}`}
className="w-full h-[400px] object-cover rounded-lg"
/>

<h1 className="text-3xl font-bold mt-4">

<a href={`/article/${article.slug}`}>
{article.headline}
</a>

</h1>

<p className="text-gray-400 mt-2">
{article.summary}
</p>

</div>

)

}
