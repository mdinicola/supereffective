import styles from './PkBox.module.css'
import { PkBoxCell } from './PkBoxCell'
import { PkBoxCellProps } from './pkBoxTypes'
import PkImgFile from './PkImgFile'

export function PkBoxEmptyCell(props: PkBoxCellProps & { usePixelIcons: boolean }) {
  return (
    <PkBoxCell {...{ ...props, className: styles.pkBoxEmptyCell }}>
      <PkImgFile nid="placeholder" variant="3d" />
    </PkBoxCell>
  )
}
