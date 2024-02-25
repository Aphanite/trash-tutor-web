import { MapPin } from 'react-feather'
import styles from './HowToPage.module.css'

export function HowToPage() {
  return (
    <div className={`container ${styles.container}`}>
      <h1 className={styles.title}>How it works</h1>
      <div className={styles.steps}>
        <div className={styles.step}>
          <MapPin />
          <p>Allow location access to let Trash Tutor find out your local recycling rules</p>
        </div>
        <div>
          Open camera and take a snap of the trash! <br />
          Make sure to:
          <ul>
            <li>only scan ONE object</li>
            <li>the object is clearly visible</li>
            <li>the picture is on a neutral background</li>
          </ul>
        </div>
        <div>Click Accept when you are happy with the picture!</div>
        <div>Let Trash Tutor do its work!</div>
        <div>Check out the result!</div>
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
