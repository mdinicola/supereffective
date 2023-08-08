import { TextFieldAria } from 'react-aria'

import { DivAttributes } from '@/lib/types/react'
import { cn } from '@/lib/utils/cn'
import { InputRecipeProps } from '@/styled-system-config/recipes/inputRecipe'
import { css } from '@/styled-system/css'

type TextFieldLayoutProps = DivAttributes<
  {
    children: React.ReactNode
    label?: React.ReactNode
    description?: React.ReactNode
    errorMessage?: React.ReactNode
    ariaProps: TextFieldAria<'input' | 'textarea'>
  } & InputRecipeProps
>

export default function TextFieldLayout({
  size,
  color,
  label,
  ariaProps,
  children,
  className,
  description,
  errorMessage,
  ...rest
}: TextFieldLayoutProps) {
  const { labelProps, descriptionProps, errorMessageProps } = ariaProps

  return (
    <div
      className={cn(
        css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 1,
        }),
        className
      )}
      {...rest}
    >
      <label {...labelProps} className={css({ color: 'gray.300' })}>
        {label}
      </label>
      {children}

      {description && (
        <div
          {...descriptionProps}
          className={css({ fontSize: 'sm', color: 'gray.400', fontStyle: 'italic' })}
        >
          {description}
        </div>
      )}
      {errorMessage && (
        <div {...errorMessageProps} className={css({ color: 'red.400', fontSize: 'sm' })}>
          {errorMessage}
        </div>
      )}
    </div>
  )
}
