import styles from './ResultPage.module.css'

export function ResultPage({ uri, children }: React.PropsWithChildren<{ uri: string }>) {
  return (
    <div
      className={`container ${styles.container}`}
      style={{
        backgroundImage: `url(${uri})`,
        backgroundSize: 'cover', // or 'contain' depending on your needs
      }}
    >
      <div className={styles.resultContainer}>{children}</div>
    </div>
  )
}
