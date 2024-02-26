import styles from './CameraGuide.module.css'
import camera from '../../assets/images/camera.png'
import { usePage } from '../../providers/PageProvider'
import { ArrowDown } from 'react-feather'

export function CameraGuide() {
  const { navigate } = usePage()
  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.imageContainer}>
        <img style={{ width: '30%' }} src={camera} />
        <h2 className={styles.title}>How it works</h2>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.steps}>
          <p>Allow Camera access</p>
          <ArrowDown size={20} />
          <p>
            Snap a clear picture of <strong>one item</strong>
            <br />
            on a plain background
          </p>
          <ArrowDown size={20} />
          <p>Confirm and scan!</p>
        </div>
        <button className="btn primary" onClick={() => navigate('camera')}>
          Next
        </button>
      </div>
    </div>
  )
}
