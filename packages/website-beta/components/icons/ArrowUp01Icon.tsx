import { BaseIcon, IconProps } from './BaseIcon'

export default function ArrowUp01Icon(props: IconProps) {
  // https://lucide.dev/icons/arrow-up-0-1
  return (
    <BaseIcon {...props}>
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
      <rect x="15" y="4" width="4" height="6" ry="2" />
      <path d="M17 20v-6h-2" />
      <path d="M15 20h4" />
    </BaseIcon>
  )
}