import { cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

// Adapted from shadcn-vue. Keep high-frequency atlas controls stationary.
export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'rounded-md text-sm font-medium shrink-0',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:outline-2 focus-visible:outline-ring',
    'focus-visible:outline-offset-4',
  ],
  {
    variants: {
      variant: {
        default: [
          'border border-transparent bg-primary text-primary-foreground',
          'hover:bg-primary/90',
        ],
        outline: [
          'border border-input bg-background',
          'hover:bg-accent hover:text-accent-foreground',
        ],
        secondary: [
          'border border-transparent bg-secondary text-secondary-foreground',
          'hover:bg-secondary/80',
        ],
        ghost: [
          'border border-transparent',
          'hover:bg-accent hover:text-accent-foreground',
        ],
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md gap-1.5 px-3',
        lg: 'h-10 rounded-md px-6',
        icon: 'size-9',
        content: 'h-auto',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)
