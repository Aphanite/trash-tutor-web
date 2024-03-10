import { Label } from '../Label/Label'
import { ResultPage } from '../ResultPage/ResultPage'
import { useLocation } from '../../providers/LocationProvider'
import { useWasteContext } from '../../providers/WasteCategoriesProvider'
import styles from './SuccessPage.module.css'
import { usePage } from '../../providers/PageProvider'
import { ChevronDown, ChevronUp, MapPin } from 'react-feather'
import React from 'react'

export type SuccessParams = {
  uri: string
  object: string
  categoryName: string
}

function SuccessPage({ object, categoryName, uri }: SuccessParams) {
  const { navigate } = usePage()
  const { location } = useLocation()
  const { getCategories } = useWasteContext()

  const [isMaximised, setIsMaximised] = React.useState(false)

  const wasteCategories = getCategories(location)

  const chosenCategory = wasteCategories?.find(c => {
    return c.categoryName === categoryName
  })

  const binColor = chosenCategory?.binColor === 'null' ? 'dark-grey' : chosenCategory?.binColor

  const text =
    'The container is made of plastic and used for transporting mail or packages, and should be recycled in the packaging category if clean and free of hazardous materials.'
  const displayText = isMaximised ? text : `${text.substring(0, 120)}...`

  function capitalize(string: string) {
    return string[0].toUpperCase() + string.substring(1)
  }

  return (
    <ResultPage uri={uri} maximised={isMaximised}>
      <div className={styles.textContainer}>
        <p className={styles.locationInfo}>How to recycle in {location || 'general'}</p>
        <h2>{capitalize(object)}</h2>

        <Label color={binColor}>{categoryName.toLowerCase()}</Label>
      </div>

      <div className={styles.infoContainer}>
        <p>{displayText} </p>
        <button className={styles.readBtn} onClick={() => setIsMaximised(current => !current)}>
          {isMaximised ? 'Read less' : 'Read more'}
        </button>
      </div>

      <p className={`${styles.disclaimer}`}>Please note: For general guidance only.</p>
      <div className={styles.buttonContainer}>
        <button
          className="btn secondary"
          onClick={() => {
            navigate('camera')
          }}
        >
          Scan more
        </button>
      </div>
    </ResultPage>
  )
}

export default SuccessPage
