import fs from 'node:fs'
import { camelToKebabCase } from './strings'

export type CssVarsConfigValue = string | string[] | Record<string | number, string>
export type CssVarsConfig = {
  [key: string]: {
    [key: string | number]: CssVarsConfigValue
  }
}

export function generateCssVars(config: Partial<CssVarsConfig>): Record<string, string> {
  const vars: Record<string, string> = {}
  for (const [configKey, configValues] of Object.entries(config)) {
    if (!configValues) {
      continue
    }
    const varNamePrefix = camelToKebabCase(String(configKey))

    for (const [key, value] of Object.entries<CssVarsConfigValue>(configValues)) {
      const varName = key === 'DEFAULT' ? '' : `-${camelToKebabCase(String(key))}`
      const varNameFull = `${varNamePrefix}${varName}`
      const varValue = Array.isArray(value) ? value.join(', ') : value

      if (typeof varValue === 'object') {
        for (const [subKey, subValue] of Object.entries(varValue)) {
          const subVarName = subKey === 'DEFAULT' ? '' : `-${camelToKebabCase(String(subKey))}`
          const subVarNameFull = `${varNamePrefix}${varName}${subVarName}`
          const subVarValue = subValue
          vars[subVarNameFull] = subVarValue
        }
        continue
      }

      vars[varNameFull] = varValue
    }
  }
  return vars
}

export function updateCssVarsFile(vars: Record<string, string>, filePath: string): void {
  const isScss = filePath.endsWith('.scss')
  const indent = isScss ? '' : '  '
  const prefix = isScss ? '$' : '--'

  let fileContent = isScss ? '' : ':root {\n'
  for (const [varName, varValue] of Object.entries(vars)) {
    fileContent += `${indent}${prefix}${varName}: ${varValue};\n`
  }
  fileContent += isScss ? '' : '}\n'

  fs.writeFileSync(filePath, fileContent)
}
