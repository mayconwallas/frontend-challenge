import type { ComponentPropsWithoutRef, ReactNode } from 'react'

interface SectionProps extends ComponentPropsWithoutRef<'section'> {
  children: ReactNode
}

export function Section({
  children,
  className = '',
  ...props
}: SectionProps) {
  return (
    <section
      className={`py-8 md:py-12 lg:py-16 ${className}`}
      {...props}
    >
      {children}
    </section>
  )
}