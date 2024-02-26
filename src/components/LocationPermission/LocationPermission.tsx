import React from 'react'
import styles from './LocationPermission.module.css'
import location from '../../assets/images/location-permission.png'
import { useLocation } from '../../providers/LocationProvider'
import { usePage } from '../../providers/PageProvider'
import { useKey } from '../../providers/KeyProvider'

export function LocationPermission() {
  const { fetchLocation } = useLocation()
  const [loading, setLoading] = React.useState(false)
  const { navigate } = usePage()
  const { key } = useKey()
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
        <button
          disabled={loading}
          className="btn primary"
          onClick={async () => {
            setLoading(true)

            console.log('Allowed location!')
            await fetchLocation()
            console.log('FINISHED!')

            navigate(key ? 'camera' : 'apiKeyForm')
            setLoading(false)
          }}
        >
          Allow
        </button>
      </div>
    </div>
  )
}
