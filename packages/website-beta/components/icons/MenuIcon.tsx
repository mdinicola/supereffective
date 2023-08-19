import { BaseIcon, IconProps } from './BaseIcon'

export default function MenuIcon(props: IconProps) {
  // https://lucide.dev/icons/menu
  return (
    <BaseIcon {...props}>
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </BaseIcon>
  )
}
