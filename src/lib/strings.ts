export function safeSlug(slug: string): string {
  return slug.replace(/[^a-zA-Z0-9-_]/g, '')
}

export function camelToKebabCase(str: string): string {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}
