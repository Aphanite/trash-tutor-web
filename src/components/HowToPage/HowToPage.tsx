import styles from './HowToPage.module.css'

export function HowToPage() {
  return (
    <div>
      <h1>How it works</h1>
      <ol>
        <li>Allow location access to let Trash Tutor find out your local recycling rules</li>
        <li>
          Open camera and take a snap of the trash! <br />
          Make sure to:
          <ul>
            <li>only scan ONE object</li>
            <li>the object is clearly visible</li>
            <li>the picture is on a neutral background</li>
          </ul>
        </li>
        <li>Click Accept when you are happy with the picture!</li>
        <li>Let Trash Tutor do its work!</li>
        <li>Check out the result!</li>
      </ol>
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
