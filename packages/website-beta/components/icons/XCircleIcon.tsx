import { BaseIcon, IconProps } from './BaseIcon'

export default function XCircleIcon(props: IconProps) {
  // https://lucide.dev/icons/x-circle
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </BaseIcon>
  )
}
