import styles from './LandingPage.module.css'
import leaves from '../../assets/images/leaves.png'
import { usePage } from '../../providers/PageProvider'
import { useKey } from '../../providers/KeyProvider'
import { useLocation } from '../../providers/LocationProvider'

export function LandingPage() {
  const { navigate } = usePage()
  const { key } = useKey()
  const { location } = useLocation()

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.imageContainer}>
        <img className={styles.logo} src={leaves} />
        <h2 className={styles.title}>
          Snap, Scan, <span>Sort!</span>
        </h2>
      </div>
      <div className={styles.textContainer}>
        <p className={styles.text}>
          Trash Tutor, your AI Recycling Guide,
          <br /> shows you how to sort your recyclable <br />
          ...from just a picture!
        </p>
      </div>
      <button
        className="btn primary"
        onClick={() => {
          navigate(location ? (key ? 'camera' : 'apiKeyForm') : 'location')
        }}
      >
        Start
      </button>
    </div>
  )
}
