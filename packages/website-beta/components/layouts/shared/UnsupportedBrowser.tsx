import { DivAttributes } from '@/lib/types/react'

type UnsupportedBrowserProps = DivAttributes<{}>

export default function UnsupportedBrowser({
  children,
  className,
  ...rest
}: UnsupportedBrowserProps) {
  return (
    <div className="unsupported-browser-overlay" {...rest}>
      <p>
        Oops! Your browser is too old and cannot be used to display this website correctly.
        <br />
        <br />
        Please check the list of{' '}
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/@layer#browser_compatibility"
          target="_blank"
          rel="external noopener noreferrer nofollow"
        >
          compatible browsers
        </a>{' '}
        and use a more recent version,{' '}
        <small>e.g. Chrome 99.0+, Edge 99.0+, Firefox 98.0+ or Safari 15.4+</small>
      </p>
    </div>
  )
}
