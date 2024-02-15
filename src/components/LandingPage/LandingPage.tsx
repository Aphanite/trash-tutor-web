import styles from './LandingPage.module.css'
import leaves from '../../assets/images/leaves.png'
import { usePage } from '../../providers/PageProvider'

export function LandingPage() {
  const { navigate } = usePage()
  const apiKey = window.localStorage.getItem('openAIKey')
  console.log('apiKey', apiKey)

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img className={styles.logo} src={leaves} />
        <h2 className={styles.title}>
          Let's talk <span>trash!</span>
        </h2>
      </div>
      <div className={styles.textContainer}>
        {!false && (
          <p className={`${styles.text} ${styles.optionalText}`}>
            Baffled by bottles and puzzled by plastics?
          </p>
        )}
        <p className={styles.text}>
          Trash Tutor, your friendly AI helper, shows you how to sort your recyclables.
        </p>
      </div>
      <button
        className={styles.btn}
        onClick={() => {
          navigate(apiKey ? 'camera' : 'apiKeyForm')
        }}
      >
        Start
      </button>
    </div>
  )
}
