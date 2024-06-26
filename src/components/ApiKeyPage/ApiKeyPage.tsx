import React from 'react'
import styles from './ApiKeyPage.module.css'
import keyImg from '../../assets/images/key.png'
import { usePage } from '../../providers/PageProvider'
import { useKey } from '../../providers/KeyProvider'

function ApiKeyPage() {
  const [apiKey, setApiKey] = React.useState('')
  const textInputRef = React.useRef(null)

  const { updateKey } = useKey()
  const { navigate } = usePage()

  function isValid(key: string | null): boolean {
    return typeof key === 'string' && /^sk-[a-zA-Z0-9]{20}T3BlbkFJ[a-zA-Z0-9]{20}$/.test(key.trim())
  }

  const showError = apiKey.length > 0 && !isValid(apiKey)

  return (
    <form
      className={`container ${styles.container}`}
      onSubmit={(e: any) => {
        e.preventDefault()

        updateKey(apiKey.trim())
        navigate('guide')
      }}
    >
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
          Your API Key is needed for using OpenAI - it is stored on your browser and never sent
          anywhere else.
        </p>
        <input
          ref={textInputRef}
          className={showError ? styles.error : undefined}
          onChange={event => setApiKey(event.target.value)}
          value={apiKey}
          placeholder="sk-xxxxxxxxxxxxxxxx"
          autoComplete="off"
        />

        {showError && <span className={styles.errorMsg}>invalid format</span>}
      </div>

      <button type="submit" {...(!isValid(apiKey) && { disabled: true })} className="btn primary">
        Save and Scan
      </button>
    </form>
  )
}

export default ApiKeyPage
