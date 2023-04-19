import React, { forwardRef } from 'react'

import { cn, createClassNameFactory } from '../../../lib/classNames'
import { GridClassesMapping, gridCols, gridColsLg, gridColsMd, gridColsSm } from './styles'

const makeCn = createClassNameFactory('Grid')

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: number
  colsSm?: number
  colsMd?: number
  colsLg?: number
  children: React.ReactNode
}

const Grid = forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  const { cols = 1, colsSm, colsMd, colsLg, children, className, ...other } = props

  const getGridCols = (
    numCols: number | undefined,
    gridColsMapping: GridClassesMapping
  ): string => {
    if (!numCols) return ''
    if (!Object.keys(gridColsMapping).includes(String(numCols))) return ''
    return gridColsMapping[numCols]
  }

  const getColClassNames = () => {
    const colsBaseCn = getGridCols(cols, gridCols)
    const colsSmCn = getGridCols(colsSm, gridColsSm)
    const colsMdCn = getGridCols(colsMd, gridColsMd)
    const colsLgCn = getGridCols(colsLg, gridColsLg)

    return cn(colsBaseCn, colsSmCn, colsMdCn, colsLgCn)
  }

  return (
    <div ref={ref} className={cn(makeCn('root'), 'grid', getColClassNames(), className)} {...other}>
      {children}
    </div>
  )
})

Grid.displayName = 'Grid'

export default Grid
