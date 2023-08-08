'use client'

import { useEffect, useRef } from 'react'
import { useTextField, type AriaTextFieldProps } from 'react-aria'

import TextFieldLayout from '@/components/primitives/TextFieldLayout'
import { useDebounce } from '@/lib/hooks/useDebounce'
import { inputRecipe, InputRecipeProps } from '@/styled-system-config/recipes/inputRecipe'

type TextFieldProps = Omit<AriaTextFieldProps, 'size'> &
  InputRecipeProps & {
    onChangeDelay?: number
    onChange?: (value: string | undefined) => void
  } & {
    className?: string
  }

export default function TextField({
  size,
  color,
  onChangeDelay = 0,
  onChange: actualOnChange,
  className,
  ...props
}: TextFieldProps) {
  const ref = useRef(null)
  const ariaExtraProps = {
    'aria-label': props.label ? undefined : props.placeholder || props.name || '',
  }

  const [debouncedValue, scheduleSetDebouncedValue] = useDebounce<string>(
    props.defaultValue || props.value,
    onChangeDelay
  )

  const ariaProps = useTextField(
    {
      ...props,
      ...ariaExtraProps,
      onChange: (value: string) => {
        if (onChangeDelay <= 0) {
          actualOnChange?.(value)
          return
        }
        scheduleSetDebouncedValue(value)
      },
    },
    ref
  )

  useEffect(() => {
    if (onChangeDelay <= 0) {
      return
    }
    actualOnChange?.(debouncedValue || '')
  }, [debouncedValue, onChangeDelay, actualOnChange])

  const layoutProps = {
    ariaProps,
    size,
    color,
    label: props.label,
    description: props.description,
    errorMessage: props.errorMessage,
    className,
  }

  return (
    <TextFieldLayout {...layoutProps}>
      <input className={inputRecipe({ size, color })} {...ariaProps.inputProps} ref={ref} />
    </TextFieldLayout>
  )
}
