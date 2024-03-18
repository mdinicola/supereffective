'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentPropsWithoutRef } from 'react'
import cls from './NavLink.module.scss'

type NavLinkProps = ComponentPropsWithoutRef<typeof Link>

export default function NavLink({ className, children, ...props }: NavLinkProps) {
  const pathname = usePathname()
  return (
    <Link className={cn(cls.link, { active: pathname === props.href }, className)} {...props}>
      {children}
    </Link>
  )
}
