import mdxRefresh from '../lib/next-plugin/withMDXPageRefresh.meta'

/**
 * Meta tag with a timestamp coming from the lib/next-plugin/withMDXPageRefresh.meta.ts file,
 * that forces a page refresh when a MDX file is changed and therefore the meta file is
 * changed/updated by the next plugin.
 */
export function MDXRefreshMeta(): JSX.Element {
  return <meta name="x-mdx-refresh-timestamp" content={mdxRefresh.timestamp} />
}
