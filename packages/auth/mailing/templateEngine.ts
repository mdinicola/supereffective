export function renderTemplate(code: string, vars: Record<string, any>): string {
  return code.replace(/{{(\w+)}}/g, (match, p1) => {
    return vars[p1] || match
  })
}
