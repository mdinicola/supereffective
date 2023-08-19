export type IconProps = {
  size?: number
} & React.SVGAttributes<SVGElement>

export function BaseIcon({
  size = 24,
  ...rest
}: IconProps & {
  children: React.ReactNode
}) {
  // https://lucide.dev/icons
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      {...rest}
    >
      {rest.children}
    </svg>
  )
}
