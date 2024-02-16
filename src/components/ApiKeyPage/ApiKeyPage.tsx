import React from 'react'
import styles from './ApiKeyPage.module.css'
import keyImg from '../../assets/images/key.png'
import { usePage } from '../../providers/PageProvider'
import { isValid, useKey } from '../../providers/KeyProvider'

function ApiKeyPage() {
  const [apiKey, setApiKey] = React.useState('')
  const textInputRef = React.useRef(null)

  const { updateKey } = useKey()
  const { navigate } = usePage()

  const showError = apiKey.length > 0 && !isValid(apiKey)

  function handleSubmit(e: any) {
    e.preventDefault()

    updateKey(apiKey)
    navigate('camera')
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.titleContainer}>
        <img
          style={{
            width: 124,
            height: 61,
          }}
          src={keyImg}
        />

        <h2 className={styles.title}>OpenAI Key</h2>
      </div>

      <div className={styles.inputContainer}>
        <p className={styles.info}>
          Your API Key is stored locally on your browser and never sent anywhere else.
        </p>

        <input
          ref={textInputRef}
          className={showError ? styles.error : undefined}
          onChange={event => setApiKey(event.target.value)}
          value={apiKey}
          placeholder="sk-xxxxxxxxxxxxxxxx"
          autoComplete="off"
        />

        {showError && <span className={styles.errorMsg}>Invalid format</span>}
      </div>

      <button type="submit" {...(!isValid(apiKey) && { disabled: true })} className={styles.btn}>
        Save and Scan
      </button>
    </form>
  )
}

export default ApiKeyPage
