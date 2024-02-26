import styles from './LocationPermission.module.css'
import location from '../../assets/images/location-permission.png'

export function LocationPermission() {
  return (
    <div>
      <div>
        <img style={{ width: '30%' }} src={location} />
        <h2>Location Access</h2>
      </div>
      <div>
        <p>To find out your local recycling rules, grant Trash Tutor access to your location.</p>
        <button className={styles.btn} onClick={() => console.log('Allowed location!')}>
          Allow
        </button>
      </div>
    </div>
  )
}
