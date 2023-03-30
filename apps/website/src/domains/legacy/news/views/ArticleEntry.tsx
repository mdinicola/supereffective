import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import CommentsSection from '@app/src/primitives/legacy/Comments/CommentsSection'
import { abs_url } from '@app/src/primitives/legacy/Link/Links'
import { CmsImage } from '@app/src/services/legacy/cms/HeadlessCms'
import { classNameIf, classNames } from '@app/src/utils/legacyUtils'

import PageMeta, { PageMetaProps } from '../../../../layouts/LegacyLayout/PageMeta'
import { ButtonLink } from '../../../../primitives/legacy/Button/Button'
import styles from './ArticleEntry.module.css'

export interface ArticleEntryProps {
  id: string
  title?: string
  children?: React.ReactNode // content
  canonicalUrl: string
  bannerImage?: CmsImage | null
  publishDate?: Date
  category?: string
  tags?: string[]
  isExcerpt?: boolean
  enableComments?: boolean
  enableSharing?: boolean
  videoUrl?: string | null
}

const containerClass = function (...classes: string[]) {
  return [styles.container, ...classes].join(' ')
}

export function ArticleEntry(props: ArticleEntryProps) {
  const shareText = encodeURIComponent(props.title + ' ( via @supereffectiv )')
  const shareUrl = encodeURIComponent(props.canonicalUrl)
  // const dateFmtOpts: any = {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // }
  //const dateFmt = new Intl.DateTimeFormat("en-US", dateFmtOpts)
  const articleClass = [
    styles.article,
    styles.bordered,
    props.isExcerpt ? styles.listEntry : styles.fullEntry,
  ].join(' ')

  const bannerImageImg = props.bannerImage ? (
    <Image
      src={props.bannerImage.url}
      width={parseInt(String(props.bannerImage.width))}
      height={parseInt(String(props.bannerImage.height))}
      alt={props.bannerImage.alt}
      quality={100}
    />
  ) : null

  const bannerImage = props.bannerImage ? (
    <figure>
      {props.isExcerpt ? <a href={props.canonicalUrl}>{bannerImageImg}</a> : bannerImageImg}
    </figure>
  ) : null

  const utcDate = props.publishDate ? props.publishDate.toUTCString() : '---'

  const publishDate = props.publishDate ? (
    <div className={containerClass(styles.publishDate)}>
      <time dateTime={utcDate}>
        <i className={styles.icon + ' icon-calendar'}></i>
        {utcDate.substring(0, utcDate.length - 13)}
      </time>
      , by{' '}
      <Link href="/about" className={styles.headerLogo}>
        @javikolog
      </Link>
    </div>
  ) : null

  const categoryPill = (
    <section className={containerClass(styles.pills)}>
      {props.category && <small className={styles.category}>{props.category}</small>}
      {!props.category && <br />}
    </section>
  )

  const tagPills = props.tags ? (
    <section className={containerClass(styles.pills)}>
      {props.tags.length > 0 &&
        props.tags.map(tag => (
          <span className={styles.tag} key={tag}>
            {tag}
          </span>
        ))}
    </section>
  ) : null

  const videoIframe = props.videoUrl ? (
    <div className={containerClass(styles.videoContainer)}>
      <iframe
        width="560"
        height="315"
        src={props.videoUrl + '?color=white&origin=' + abs_url('/')}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        sandbox={['allow-forms', 'allow-same-origin', 'allow-scripts', 'allow-presentation'].join(
          ' '
        )}
      ></iframe>
    </div>
  ) : null

  const contentContainer = (
    <section className={containerClass(styles.content)}>
      {videoIframe}
      <div className={styles.contentWrapper}>{props.children}</div>
    </section>
  )

  if (props.isExcerpt) {
    return (
      <article className={articleClass}>
        {bannerImage}
        {categoryPill}
        <div className={containerClass(styles.title)}>
          <h2>
            <a href={props.canonicalUrl}>{props.title}</a>
          </h2>
        </div>
        {publishDate}
        {contentContainer}
        <footer className={containerClass(styles.readMore, 'text-right')}>
          <ButtonLink href={props.canonicalUrl}>Read more</ButtonLink>
        </footer>
      </article>
    )
  }

  const socialLinks = (
    <div className={containerClass(styles.socialLinks)}>
      <span>Share on: </span>
      <a
        className={styles.socialLink}
        href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        title={'Twitter'}
      >
        <i className={'icon icon-brand-twitter'} />
      </a>
      <a
        className={styles.socialLink}
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        title={'Facebook'}
      >
        <i className={'icon icon-brand-facebook'} />
      </a>
      <a
        className={styles.socialLink}
        href={`https://www.reddit.com/submit?url=${shareUrl}&title=${shareText}`}
        target="_blank"
        rel="noopener noreferrer"
        title={'Reddit'}
      >
        <i className={'icon icon-brand-reddit'} />
      </a>
    </div>
  )

  return (
    <article className={classNames(articleClass, classNameIf(!bannerImage, styles.withoutBanner))}>
      {bannerImage}
      {categoryPill}
      <div className={containerClass(styles.title)}>
        <h2>{props.title}</h2>
      </div>
      {props.publishDate && publishDate}

      {props.enableSharing && socialLinks}

      {contentContainer}

      {props.tags && tagPills}

      {props.enableComments && (
        <div className={containerClass(styles.comments)}>
          <CommentsSection pageUrl={props.canonicalUrl} encodedTitle={shareText} />
        </div>
      )}
      {!props.enableComments && <br />}
    </article>
  )
}

export interface ArticlePageProps extends ArticleEntryProps {
  meta: PageMetaProps
}

export function ArticlePage(props: ArticlePageProps) {
  const { meta, ...articleProps } = props
  const isoDate = props.publishDate?.toISOString() || null
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': props.canonicalUrl,
    },
    headline: props.title?.replace(/"/g, '\\"'),
    image: [props.bannerImage?.url?.replace(/"/g, '\\"')],
    datePublished: isoDate,
    dateModified: isoDate,
    author: {
      '@type': 'Person',
      name: 'Javi Aguilar',
      url: 'https://supereffective.gg/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'supereffective.gg',
      logo: {
        '@type': 'ImageObject',
        url: 'https://supereffective.gg/assets/logo/logo.png',
      },
    },
  }
  const jsonLdArticleStr = JSON.stringify(jsonLdArticle, null, 0)
  return (
    <div className={'page-container'}>
      <PageMeta {...meta} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdArticleStr }} />
      <ArticleEntry {...articleProps} />
    </div>
  )
}
