import { WasteColors } from '../../helpers/types'
import styles from './Label.module.css'
import { ChevronRight, Trash2 } from 'react-feather'

export function Label({
  color,
  children,
  onClick,
}: {
  color: WasteColors | 'dark-grey'
  children: any
  onClick: () => void
}) {
  return (
    <div
      className={styles.label}
      style={{
        backgroundColor: `var(--${color})`,
      }}
      onClick={onClick}
    >
      <Trash2 size={16} color="#f8faed" />
      <p className={styles.labelText}>{children}</p>
      <ChevronRight size={16} color="#f8faed" />
    </div>
  )
}
