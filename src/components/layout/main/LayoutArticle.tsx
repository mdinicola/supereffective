import MdxRenderer from '@/components/MdxRenderer'
import type { MDXPage } from '@/lib/mdx/types'
import { buildPageJsonLd } from '@/lib/pages'
import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef } from 'react'
import { jsonLdScriptProps } from 'react-schemaorg'
import cls from './LayoutArticle.module.scss'

type LayoutArticleProps = (
  | {
      mainTitle: React.ReactNode
      page?: never
    }
  | {
      mainTitle?: never
      page: MDXPage
    }
) &
  ComponentPropsWithoutRef<'article'>

export default function LayoutArticle({ mainTitle, page, className, children, ...props }: LayoutArticleProps) {
  const title = mainTitle ?? page?.title

  return (
    <article className={cn(cls.article, className)} {...props}>
      <section className={cls.prose}>
        {title && <h1>{title}</h1>}
        {page && <MdxRenderer content={page.body} />}
        {children}
      </section>
      {page && <script id="jsonld_data" {...jsonLdScriptProps(buildPageJsonLd(page, 'WebPage'))} />}
    </article>
  )
}
