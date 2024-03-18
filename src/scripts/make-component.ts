import fs from 'node:fs'

function createComponentCommand(componentName: string, componentTag = 'div'): void {
  const fullComponentPath = `${process.cwd()}/src/components/${componentName}`
  console.log(`Creating component "${fullComponentPath}"`)
  const scssModuleTemplate = '.base {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n'
  const jsxComponentTemplate = `
import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'
import cls from './${componentName}.module.scss'

// type ${componentName}Props = {} & ComponentPropsWithoutRef<'${componentTag}'>
type ${componentName}Props = {} & Omit<ComponentPropsWithoutRef<'${componentTag}'>, 'children'>

export default function ${componentName}({ className, ...props }: ${componentName}Props) {
  return (
    <${componentTag} className={cn(cls.base, className)} {...props}>
      Lorem ipsum dolor sit amet.
    </${componentTag}>
  )
}
`

  fs.writeFileSync(`${fullComponentPath}.module.scss`, scssModuleTemplate)
  fs.writeFileSync(`${fullComponentPath}.tsx`, `${jsxComponentTemplate.trim()}\n`)

  console.log('DONE.')
}

const componentName = String(process.argv[2] ?? '')
  .trim()
  .replace(/[^a-zA-Z0-9-_]/gi, '')

const componentTag = String(process.argv[3] ?? 'div')

if (!componentName) {
  console.error('Component name is required')
  process.exit(1)
}

createComponentCommand(componentName, componentTag)
