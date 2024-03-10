import { Label } from '../Label/Label'
import { ResultPage } from '../ResultPage/ResultPage'
import { useLocation } from '../../providers/LocationProvider'
import { useWasteContext } from '../../providers/WasteCategoriesProvider'
import styles from './SuccessPage.module.css'
import { usePage } from '../../providers/PageProvider'
import { MapPin } from 'react-feather'
import React from 'react'

export type SuccessParams = {
  uri: string
  object: string
  categoryName: string
  reason: string
}

function SuccessPage({ uri, object, categoryName, reason }: SuccessParams) {
  const { navigate } = usePage()
  const { location } = useLocation()
  const { getCategories } = useWasteContext()

  const [isMaximised, setIsMaximised] = React.useState(false)

  const wasteCategories = getCategories(location)

  const chosenCategory = wasteCategories?.find(c => {
    return c.categoryName === categoryName
  })

  const binColor = chosenCategory?.binColor === 'null' ? 'dark-grey' : chosenCategory?.binColor

  function capitalize(string: string) {
    return string[0].toUpperCase() + string.substring(1)
  }

  return (
    <ResultPage uri={uri} maximised={isMaximised}>
      <div className={styles.textContainer}>
        <p className={styles.locationInfo}>How to recycle in {location || 'general'}</p>
        <h2>
          {isMaximised ? (
            <>
              Category:{' '}
              <span style={{ color: `var(--${binColor})` }}>{capitalize(categoryName)}</span>
            </>
          ) : (
            capitalize(object)
          )}
        </h2>

        {!isMaximised && (
          <Label color={binColor} onClick={() => setIsMaximised(true)}>
            {categoryName.toLowerCase()}
          </Label>
        )}

        {isMaximised && (
          <div className={styles.categoryInfoContainer}>
            <div>
              <p className={styles.question}>What belongs in it?</p>
              <p>{chosenCategory.userDescription || chosenCategory.description}</p>
            </div>

            <div>
              <p className={styles.question}>Where can I dispose of it?</p>
              <div className={styles.disposalInfo}>
                <MapPin size={16} style={{ color: `var(--${binColor})` }} />
                <p>
                  {chosenCategory?.domestic ? 'At domestic bin' : 'At drop-off or collection point'}
                </p>
              </div>
            </div>

            <p className={styles.disclaimer}>Please note: For general guidance only.</p>
          </div>
        )}
      </div>

      {!isMaximised && <p>{reason}</p>}

      <div className={styles.buttonContainer}>
        <button
          className="btn secondary"
          onClick={() => {
            isMaximised ? setIsMaximised(false) : navigate('camera')
          }}
        >
          {isMaximised ? 'Back to result' : 'Scan more'}
        </button>
      </div>
    </ResultPage>
  )
}

export default SuccessPage
