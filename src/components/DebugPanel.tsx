'use client'

import { XIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { type ComponentPropsWithoutRef, useEffect, useState } from 'react'
import cls from './DebugPanel.module.scss'

export default function DebugPanel({ disabled, ...props }: DebugPanelProps) {
  const pathName = usePathname()
  const [isOpened, setIsOpened] = useState<boolean>(true)
  const [domNodeCount, setDomNodeCount] = useState<number>(0)
  const [domMaxDepth, setDomMaxDepth] = useState<number>(0)
  const [docSize, setDocSize] = useState<number>(0)

  const docSizeKb = (docSize / 1024).toFixed(2)
  const domNodeCountEmoji = domNodeCount <= 1000 ? '✅' : domNodeCount > 1400 ? '❌' : '🫣' // LightHouse max = 1500
  const domNodeDepthEmoji = domMaxDepth <= 20 ? '✅' : domMaxDepth > 30 ? '❌' : '🫣' // LightHouse max = 32
  const docSizeEmoji = docSize <= 1500 * 1024 ? '✅' : docSize > 2000 * 1024 ? '❌' : '🫣' // LightHouse max = 2MB

  useEffect(() => {
    if (pathName === null || disabled || !isOpened) {
      return
    }

    setDomNodeCount(document.querySelectorAll('.root-layout *').length)
    setDocSize(document.documentElement.innerHTML.length)

    let maxDepth = 0
    const walk = (node: Node, depth: number) => {
      if (depth > maxDepth) maxDepth = depth
      for (let i = 0; i < node.childNodes.length; i++) {
        walk(node.childNodes[i], depth + 1)
      }
    }
    walk(document.getElementsByClassName('root-layout')[0], 0)
    setDomMaxDepth(maxDepth)
  }, [pathName, disabled, isOpened])

  if (disabled || !isOpened) {
    return null
  }

  return (
    <div className={cls.base} {...props}>
      <XIcon onClick={() => setIsOpened(false)} className={cls.closeBtn} width={16} height={16} />
      <div>DEBUG: {pathName}</div>
      <hr />
      <div>
        DOM Nodes: {domNodeCount} {domNodeCountEmoji}
      </div>
      <div>
        DOM Max Depth: {domMaxDepth} {domNodeDepthEmoji}
      </div>
      <div>
        Document Size: {docSizeKb}KB {docSizeEmoji}
      </div>
    </div>
  )
}

type DebugPanelProps = {
  disabled?: boolean
} & Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className'>
