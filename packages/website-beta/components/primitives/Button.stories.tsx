import Button from '@/components/primitives/Button'

const config = {
  title: 'Primitives/Button',
  component: Button,
}
export default config

export const Default = {
  args: {
    children: 'Button',
  },
}
export const DifferentColor = {
  args: {
    children: 'Button',
    variant: {
      color: 'gold',
    },
  },
}
export const DifferentSize = {
  args: {
    children: 'Button',
    variant: {
      color: 'purple',
      size: 'xl',
    },
  },
}
