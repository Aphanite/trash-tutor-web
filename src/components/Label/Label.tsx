import { WasteColors } from '../../helpers/types'
import styles from './Label.module.css'
import { Trash2 } from 'react-feather'

export function Label({ color, children }: { color: WasteColors; children: any }) {
  return (
    <div
      className={styles.label}
      style={{
        backgroundColor: `var(--${color === 'null' ? 'dark-grey' : color})`,
      }}
    >
      <Trash2 size={16} color="#f8faed" />
      <p className={styles.labelText}>{children}</p>
    </div>
  )
}
