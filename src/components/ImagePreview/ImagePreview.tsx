import React from 'react'
import { RotateCcw, Check } from 'react-feather'

import styles from './ImagePreview.module.css'

import { usePage } from '../../providers/PageProvider'
import { useKey } from '../../providers/KeyProvider'
import { useLocation } from '../../providers/LocationProvider'
import { useWasteContext } from '../../providers/WasteCategoriesProvider'
import { categorizeWaste } from './utils/categorizeWaste'
import { uploadError } from '../../helpers/error'
import { classify } from './utils/classify'

export function ImagePreview({ uri }: { uri: string }) {
  const [loading, setLoading] = React.useState(false)

  const { location } = useLocation()
  const { getCategories, saveCategories } = useWasteContext()
  const { key } = useKey()
  const { navigate } = usePage()

  async function analyseImage() {
    setLoading(true)

    let result
    let categories = getCategories(location)

    // Immediately classify image if categories for location present
    if (categories) {
      result = await classify(uri, location, categories, key as string)
    } else {
      const categorization = await categorizeWaste(location, key as string)

      if (categorization.status === 'success') {
        categories = categorization.data
        saveCategories({ [location.countryCode]: categories })

        // Classify image with fetched categories
        result = await classify(uri, location, categories, key as string)
      } else {
        result = categorization
      }
    }

    const { status, data, code } = result

    if (status === 'success') {
      navigate('success', {
        uri,
        object: data.item,
        categoryName: data.categoryName,
        reason: data.reason,
      })
    }

    if (status === 'error') {
      const errorData = { result, metaData: { categories, location } }
      uploadError(uri, errorData)

      navigate('error', { uri, code, object: data?.item })
    }

    setLoading(false)
  }

  return (
    <div
      className={`container ${styles.container}`}
      style={{
        backgroundImage: `url(${uri})`,
        backgroundSize: 'cover',
      }}
    >
      <div className={`${styles.buttonContainer} ${loading && styles.loading}`}>
        {loading ? (
          <div className={styles.loader}></div>
        ) : (
          <>
            <button
              className={styles.iconBtn}
              onClick={() => navigate('camera')}
              data-cy="retry-btn"
            >
              <RotateCcw size={14} />
            </button>

            <button
              className={`${styles.iconBtn} ${styles.primary}`}
              onClick={analyseImage}
              data-cy="accept-btn"
            >
              <Check size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
