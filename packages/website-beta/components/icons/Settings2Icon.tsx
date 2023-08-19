import { BaseIcon, IconProps } from './BaseIcon'

export default function Settings2Icon(props: IconProps) {
  // https://lucide.dev/icons/settings-2
  return (
    <BaseIcon {...props}>
      <path d="M20 7h-9" />
      <path d="M14 17H5" />
      <circle cx="17" cy="17" r="3" />
      <circle cx="7" cy="7" r="3" />
    </BaseIcon>
  )
}