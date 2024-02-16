import React from 'react'
import { RotateCcw, Check } from 'react-feather'

import styles from './ImagePreview.module.css'

import { usePage } from '../../providers/PageProvider'
import { useKey } from '../../providers/KeyProvider'
import { useLocation } from '../../providers/LocationProvider'
import { useWasteContext } from '../../providers/WasteCategoriesProvider'
import { classifyImage } from '../../services/classifyImage'
import { categorizeWaste } from '../../services/categorizeWaste'

export function ImagePreview({ uri }: { uri: string }) {
  const [loading, setLoading] = React.useState(true)
  const [response, setResponse] = React.useState<any | null>(null) // improve type

  const { navigate } = usePage()
  const { key } = useKey()
  const location = useLocation() || 'Berlin, Germany'
  const { getCategoriesForLocation, saveCategoriesForLocation } = useWasteContext()

  console.log('location', location)
  console.log('response', response)

  // if (!isValid(key)) return { status: 'error', code: 'invalid_key' }

  async function analyseImage() {
    let analysisResult
    setLoading(true)

    const categories = getCategoriesForLocation(location)

    // Immediately classify image if categories for location present
    if (categories) {
      analysisResult = await classifyImage(uri, location, categories, key as string)
    } else {
      const {
        status,
        data: fetchedCategories,
        code,
      } = await categorizeWaste(location, key as string)

      if (status === 'success') {
        // Classify image with fetched categories
        analysisResult = await classifyImage(uri, location, fetchedCategories, key as string)
        saveCategoriesForLocation({ [location]: fetchedCategories })
      } else {
        analysisResult = { status, code }
      }
    }

    setResponse(analysisResult)
    setLoading(false)
  }

  React.useEffect(() => {
    if (response === null) return

    const { status, data, code } = response

    if (status === 'success') {
      console.log('category: ', data.category)

      // navigation.navigate('SuccessPage', {
      //   uri,
      //   object: data.object,
      //   categoryName: data.category,
      // })
    }

    if (status === 'error') {
      console.log('code', code)
      // navigation.navigate('ErrorPage', { uri, code, object: data?.object })
    }
  }, [response])

  return (
    <div
      className={styles.imageContainer}
      style={{
        backgroundImage: `url(${uri})`,
        backgroundSize: 'cover', // or 'contain' depending on your needs
      }}
    >
      <div className={`${styles.buttonContainer} ${loading && styles.loading}`}>
        {loading ? (
          <div className={styles.loader}></div>
        ) : (
          <>
            <button className={styles.iconBtn} onClick={() => navigate('camera')}>
              <RotateCcw size={14} />
            </button>
            <button className={`${styles.iconBtn} ${styles.primary}`} onClick={analyseImage}>
              <Check size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
