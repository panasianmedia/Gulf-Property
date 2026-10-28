import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getArticleBySlug, type Article } from '@/lib/articlesdata';
import { SocialShare } from '@/components/social-share';

const SITE_URL = 'https://www.thegulfproperty.com';

function getValidDate(value?: string): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function getPublicationDate(article: Article): Date | undefined {
  return [article.Date, article.publishedAt, article.createdAt]
    .map(getValidDate)
    .find((date): date is Date => date !== undefined);
}

function getUpdatedDate(article: Article, publicationDate?: Date): Date | undefined {
  const updatedDate = getValidDate(article.updatedAt);
  if (!updatedDate || (publicationDate && updatedDate <= publicationDate)) return undefined;
  return updatedDate;
}

function getSeoDescription(article: Article, title: string): string {
  const description =
    article.Caption?.trim() || `Read ${title} and the latest property news on Gulf Property.`;
  if (description.length <= 160) return description;
  return `${description.slice(0, 157).trimEnd()}...`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const title = article.Title;
  const description = getSeoDescription(article, title);
  const author = article.Author || 'Staff Report';
  const publicationDate = getPublicationDate(article);
  const updatedDate = getUpdatedDate(article, publicationDate);
  const canonicalUrl = new URL(
    `/articles/${encodeURIComponent(article.Slug || article.slug || slug)}`,
    SITE_URL
  ).toString();
  const imageObj = article.Image;
  const rawImageUrl =
    imageObj?.formats?.large?.url ||
    imageObj?.formats?.medium?.url ||
    imageObj?.url ||
    '/images/Gulf Property.png';
  const imageUrl = new URL(rawImageUrl, SITE_URL).toString();
  const imageAlt = imageObj?.alternativeText || title;

  return {
    title: `${title} | Gulf Property`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | Gulf Property`,
      description,
      url: canonicalUrl,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt }],
      type: 'article',
      authors: [author],
      publishedTime: publicationDate?.toISOString(),
      modifiedTime: updatedDate?.toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Gulf Property`,
      description,
      images: [{ url: imageUrl, alt: imageAlt }],
    },
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const title = article.Title;
  const imageObj = article.Image;
  const rawImageUrl =
    imageObj?.formats?.large?.url ||
    imageObj?.formats?.medium?.url ||
    imageObj?.url ||
    null;
  const imageUrl = rawImageUrl ? new URL(rawImageUrl, SITE_URL).toString() : null;
  const category = Array.isArray(article.CategorySub)
    ? article.CategorySub[0]
    : article.CategorySub || article.SubCategorySub || 'General';
  const publicationDate = getPublicationDate(article);
  const updatedDate = getUpdatedDate(article, publicationDate);
  const displayedDate = updatedDate || publicationDate;
  const author = article.Author || 'Staff Report';
  const excerpt = article.Caption || '';
  const canonicalUrl = new URL(
    `/articles/${encodeURIComponent(article.Slug || article.slug || slug)}`,
    SITE_URL
  ).toString();
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description: getSeoDescription(article, title),
    image: imageUrl || `${SITE_URL}/images/Gulf%20Property.png`,
    mainEntityOfPage: canonicalUrl,
    author: {
      '@type': author === 'Staff Report' ? 'Organization' : 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Gulf Property',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/Gulf%20Property.png`,
      },
    },
    ...(publicationDate && { datePublished: publicationDate.toISOString() }),
    ...(updatedDate && { dateModified: updatedDate.toISOString() }),
  };

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
      <article className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded">
            {category}
          </span>
        </div>

        <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {displayedDate && (
              <span>
                {updatedDate ? 'Updated ' : ''}
                <time dateTime={displayedDate.toISOString()}>
                  {displayedDate.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    timeZone: 'UTC',
                  })}
                </time>
              </span>
            )}
            {displayedDate && <span>•</span>}
            <span>By {author}</span>
          </div>

          <SocialShare
            title={title}
            url={canonicalUrl}
            className="justify-end"
          />
        </div>

        {imageUrl && (
          <div className="relative mb-8 h-80 w-full overflow-hidden rounded-lg bg-muted sm:h-[460px]">
            <Image
              src={imageUrl}
              alt=""
              aria-hidden
              fill
              className="scale-125 object-cover opacity-100 blur-md"
              unoptimized
            />
            <Image
              src={imageUrl}
              alt={imageObj?.alternativeText || ''}
              fill
              className="object-contain"
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
          {renderContent(article.Content)}
        </div>
      </article>
    </>
  );
}