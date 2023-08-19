import { BaseIcon, IconProps } from './BaseIcon'

export default function SearchIcon(props: IconProps) {
  // https://lucide.dev/icons/search
  return (
    <BaseIcon {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </BaseIcon>
  )
}
