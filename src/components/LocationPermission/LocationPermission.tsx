import styles from './LocationPermission.module.css'
import location from '../../assets/images/location-permission.png'

export function LocationPermission() {
  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.imageContainer}>
        <img style={{ width: '30%' }} src={location} />
        <h2 className={styles.title}>Location Access</h2>
      </div>
      <div className={styles.textContainer}>
        <p>
          To find out your local recycling rules,
          <br /> grant Trash Tutor access to your location.
        </p>
        <button className={styles.btn} onClick={() => console.log('Allowed location!')}>
          Allow
        </button>
      </div>
    </div>
  )
}
