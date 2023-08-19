import { BaseIcon, IconProps } from './BaseIcon'

export default function UserCircle2Icon(props: IconProps) {
  // https://lucide.dev/icons/user-circle-2
  return (
    <BaseIcon {...props}>
      <path d="M18 20a6 6 0 0 0-12 0" />
      <circle cx="12" cy="10" r="4" />
      <circle cx="12" cy="12" r="10" />
    </BaseIcon>
  )
}
