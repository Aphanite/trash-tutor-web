import { Camera, CheckCircle, Eye, Loader, MapPin } from 'react-feather'
import styles from './HowToPage.module.css'

export function HowToPage() {
  return (
    <div className={`container ${styles.container}`}>
      <h1 className={styles.title}>How it works</h1>
      <div className={styles.steps}>
        <div>
          <MapPin />
          <p>Grant location access to find your local recycling rules</p>
        </div>
        <div>
          <Camera />
          <p>Take a snap of the trash</p>
        </div>
        <div>
          <CheckCircle />
          <p>
            Accept after taking a clear photo of <strong>1 item</strong> on a neutral background
          </p>
        </div>
        <div>
          <Loader />
          <p>Let Trash Tutor do the work!</p>
        </div>
        <div>
          <Eye />
          <p>Check out the result!</p>
        </div>
      </div>
      <button
        className={styles.btn}
        onClick={() => {
          console.log('clicked!')
        }}
      >
        Allow location access
      </button>
    </div>
  )
}
