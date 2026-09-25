import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getArticleBySlug } from '@/lib/articlesdata';
import { SocialShare } from '@/components/social-share';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const rawArticle: any = await getArticleBySlug(slug);
  const article = rawArticle?.attributes || rawArticle;
  const title = article?.Title || article?.title || 'Untitled Article';
  const excerpt = article?.Caption || article?.excerpt || 'Read the latest Gulf Property coverage.';
  const imageObj = article?.Image || article?.coverImage;
  const rawImageUrl =
    imageObj?.formats?.large?.url ||
    imageObj?.formats?.medium?.url ||
    imageObj?.url ||
    '/images/Gulf Property.png';

  const imageUrl = rawImageUrl.startsWith('http') ? rawImageUrl : `https://www.thegulfproperty.com${rawImageUrl}`;

  return {
    title: `${title} | Gulf Property`,
    description: excerpt,
    alternates: {
      canonical: `https://www.thegulfproperty.com/articles/${slug}`,
    },
    openGraph: {
      title: `${title} | Gulf Property`,
      description: excerpt,
      url: `https://www.thegulfproperty.com/articles/${slug}`,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Gulf Property`,
      description: excerpt,
      images: [imageUrl],
    },
  };
}

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
  // Renders a single Strapi rich-text node, preserving bold/italic/underline/etc.
  const renderInline = (node: any, key: number) => {
    let el: React.ReactNode = node.text ?? '';
    if (node.code) el = <code key={`code-${key}`}>{el}</code>;
    if (node.bold) el = <strong key={`b-${key}`}>{el}</strong>;
    if (node.italic) el = <em key={`i-${key}`}>{el}</em>;
    if (node.underline) el = <u key={`u-${key}`}>{el}</u>;
    if (node.strikethrough) el = <s key={`s-${key}`}>{el}</s>;
    if (node.type === 'link' && node.url) {
      el = (
        <a key={`a-${key}`} href={node.url} target="_blank" rel="noopener noreferrer" className="text-realty underline">
          {node.children?.map((c: any, i: number) => renderInline(c, i)) ?? el}
        </a>
      );
    }
    return <span key={key}>{el}</span>;
  };

  const renderContent = (content: any) => {
    if (!content) return null;
    if (typeof content === 'string') {
      return <p className="whitespace-pre-line leading-relaxed text-foreground">{content}</p>;
    }
    if (Array.isArray(content)) {
      return content.map((block: any, idx: number) => {
        const children = block.children?.map((c: any, i: number) => renderInline(c, i)) ?? null;
        const hasText = block.children?.some((c: any) => (c.text || '').trim());

        if (block.type === 'paragraph') {
          if (!hasText) return null;
          return (
            <p key={idx} className="mb-4 text-base leading-relaxed text-foreground sm:text-lg">
              {children}
            </p>
          );
        }
        if (block.type === 'heading') {
          const Tag = `h${block.level || 2}` as React.ElementType;
          return (
            <Tag key={idx} className="mb-4 mt-6 font-bold text-foreground">
              {children}
            </Tag>
          );
        }
        if (block.type === 'list') {
          const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
          return (
            <ListTag key={idx} className="mb-4 ml-6 list-outside space-y-1 text-foreground">
              {block.children?.map((item: any, i: number) => (
                <li key={i}>{item.children?.map((c: any, j: number) => renderInline(c, j))}</li>
              ))}
            </ListTag>
          );
        }
        if (block.type === 'quote') {
          return (
            <blockquote key={idx} className="mb-4 border-l-4 border-red-600 pl-4 italic text-muted-foreground">
              {children}
            </blockquote>
          );
        }
        return null;
      });
    }
    return null;
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-4 flex flex-wrap items-center gap-3">
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
        <div className="ml-auto flex items-center">
          <SocialShare title={title} description={excerpt} url={`https://www.thegulfproperty.com/articles/${slug}`} />
        </div>
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