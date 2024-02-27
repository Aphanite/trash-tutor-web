import { motion } from 'framer-motion'
import styles from './ResultPage.module.css'

export function ResultPage({
  uri,
  maximised = false,
  children,
}: React.PropsWithChildren<{ uri: string; maximised?: boolean }>) {
  return (
    <div
      className={`container ${styles.container}`}
      style={{
        backgroundImage: `url(${uri})`,
        backgroundSize: 'cover', // or 'contain' depending on your needs
      }}
    >
      <motion.div
        layout={true}
        className={`${styles.animatedContainer} ${maximised && styles.maximised}`}
      >
        <motion.div className={styles.resultContainer} layout="position">
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}
