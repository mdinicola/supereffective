'use client'

import { useRef } from 'react'
import { useTextField, type AriaTextFieldProps } from 'react-aria'

import TextFieldLayout from '@/components/primitives/TextFieldLayout'
import { inputRecipe, InputRecipeProps } from '@/styled-system-config/recipes/inputRecipe'

type TextAreaFieldProps = Omit<AriaTextFieldProps, 'size'> & InputRecipeProps

export default function TextAreaField({ size, color, ...props }: TextAreaFieldProps) {
  const ref = useRef(null)
  const ariaProps = useTextField({ ...props, inputElementType: 'textarea' }, ref)
  const layoutProps = {
    ariaProps,
    size,
    color,
    label: props.label,
    description: props.description,
    errorMessage: props.errorMessage,
  }

  return (
    <TextFieldLayout {...layoutProps}>
      <textarea className={inputRecipe({ size, color })} {...ariaProps.inputProps} ref={ref} />
    </TextFieldLayout>
  )
}
