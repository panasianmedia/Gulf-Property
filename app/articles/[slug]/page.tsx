import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getArticleBySlug } from '@/lib/articlesdata';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const rawArticle: any = await getArticleBySlug(slug);

  if (!rawArticle) {
    notFound();
  }

  const article = rawArticle.attributes || rawArticle;

  // Extract Title
  const title = article.Title || article.title || 'Untitled Article';

  // Extract and rewrite Image URL to public domain
  const imageObj = article.Image || article.coverImage;
  let rawImageUrl =
    imageObj?.formats?.large?.url ||
    imageObj?.formats?.medium?.url ||
    imageObj?.url ||
    null;

  let imageUrl = rawImageUrl;
  if (imageUrl) {
    const PUBLIC_R2_URL = 'https://pub-9d1f70c10dca4e94a9b69b8e3f8cbffd.r2.dev'; // <-- Paste your pub-xxx.r2.dev URL here
    imageUrl = imageUrl.replace(
      /^https:\/\/[^/]+\.r2\.cloudflarestorage\.com\/gulf-property-media/,
      PUBLIC_R2_URL
    );
  }

  // Extract Category
  const category = Array.isArray(article.CategorySub)
    ? article.CategorySub[0]
    : article.CategorySub || article.subcategory || article.category || 'General';

  // Extract Date
  const dateline = article.Date || article.publishedAt || new Date().toISOString();

  // Extract Author
  const author = article.Author || article.author || 'Staff Report';

  // Extract Caption / Excerpt
  const excerpt = article.Caption || article.excerpt || '';

  // Render Rich Text Blocks
  const renderContent = (content: any) => {
    if (!content) return null;
    if (typeof content === 'string') {
      return <p className="whitespace-pre-line leading-relaxed text-foreground">{content}</p>;
    }
    if (Array.isArray(content)) {
      return content.map((block: any, idx: number) => {
        if (block.type === 'paragraph') {
          const text = block.children?.map((c: any) => c.text).join('') || '';
          if (!text.trim()) return null;
          return (
            <p key={idx} className="mb-4 text-base leading-relaxed text-foreground sm:text-lg">
              {text}
            </p>
          );
        }
        return null;
      });
    }
    return null;
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-4 flex items-center space-x-3">
        <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded">
          {category}
        </span>
        <span className="text-xs text-muted-foreground">
          {new Date(dateline).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
        <span className="text-xs text-muted-foreground">• By {author}</span>
      </div>

      <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>

      {imageUrl && (
        <div className="relative mb-8 h-80 w-full overflow-hidden rounded-lg bg-muted sm:h-[460px]">
          <Image
            src={imageUrl}
            alt={imageObj?.alternativeText || title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      )}

      {excerpt && (
        <p className="mb-6 border-l-4 border-red-600 pl-4 text-lg font-medium leading-relaxed text-muted-foreground">
          {excerpt}
        </p>
      )}

      <div className="prose prose-lg max-w-none space-y-4 text-foreground">
        {renderContent(article.Content || article.content)}
      </div>
    </article>
  );
}