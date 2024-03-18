import { generateCssVars, updateCssVarsFile } from '@/lib/css'
import { cssVarsConfig } from '../styles/variables.config'

updateCssVarsFile(generateCssVars(cssVarsConfig), 'src/styles/_variables.css')
updateCssVarsFile(generateCssVars(cssVarsConfig), 'src/styles/_variables.scss')
