import Link from 'next/link'

export default function NotFoundView() {
  return (
    <div>
      <h2>Error 404: Page Not Found</h2>
      <p>Could not find the requested page.</p>
      <Link href="/v4">Return Home</Link>
    </div>
  )
}
