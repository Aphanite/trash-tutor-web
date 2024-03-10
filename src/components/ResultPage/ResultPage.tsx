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
      <div className={`${styles.animatedContainer} ${maximised && styles.maximised}`}>
        <div className={styles.resultContainer}>{children}</div>
      </div>
    </div>
  )
}
