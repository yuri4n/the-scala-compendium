import { cva } from 'class-variance-authority'

// Inspira UI variants adapted to the starter's semantic token contract.
export const patternBackgroundVariants = cva('relative text-clip', {
  variants: {
    variant: {
      'grid': 'inspira-pattern-grid',
      'dot': 'bg-[radial-gradient(var(--border)_1px,transparent_1px)]',
      'big-dot': 'bg-[radial-gradient(var(--border)_3px,transparent_3px)]',
    },
    size: {
      xs: 'bg-size-[8px_8px]',
      sm: 'bg-size-[16px_16px]',
      md: 'bg-size-[24px_24px]',
      lg: 'bg-size-[32px_32px]',
      xl: 'bg-size-[40px_40px]',
    },
  },
  defaultVariants: { variant: 'grid', size: 'md' },
})
export const patternBackgroundMaskVariants = cva('bg-background', {
  variants: {
    mask: {
      'ellipse':
        'mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]',
      'ellipse-top':
        'mask-[radial-gradient(ellipse_at_top,transparent_20%,black)]',
    },
  },
})
