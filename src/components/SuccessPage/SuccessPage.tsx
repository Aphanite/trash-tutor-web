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

  let text =
    'The container is made of plastic and used for transporting mail or packages, and should be recycled in the packaging category if clean and free of hazardous materials.'

  text =
    'It is a glass packaging item typically used for food or beverages and is not a non-recyclable type like window or mirror glass.'

  function capitalize(string: string) {
    return string[0].toUpperCase() + string.substring(1)
  }

  const Result = () => {
    return (
      <>
        <div className={styles.textContainer}>
          <p className={styles.locationInfo}>How to recycle in {location || 'general'}</p>
          <h2>{capitalize(object)}</h2>

          <Label color={binColor} onClick={() => setIsMaximised(true)}>
            {categoryName.toLowerCase()}
          </Label>
        </div>

        <p>{text}</p>

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
      </>
    )
  }

  const CategoryExplained = () => {
    return (
      <>
        <div className={styles.textContainer}>
          <p className={styles.locationInfo}>How to recycle in {location || 'general'}</p>
          <h2>
            Category:{' '}
            <span style={{ color: `var(--${binColor})` }}>{capitalize(categoryName)}</span>
          </h2>
        </div>

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

        <div className={styles.buttonContainer}>
          <button
            className="btn secondary"
            style={{
              color: `var(--${binColor})`,
              borderColor: `var(--${binColor})`,
            }}
            onClick={() => {
              setIsMaximised(false)
            }}
          >
            Back to result
          </button>
        </div>
      </>
    )
  }

  const content = isMaximised ? <CategoryExplained /> : <Result />
  return (
    <ResultPage uri={uri} maximised={isMaximised}>
      {content}
    </ResultPage>
  )
}

export default SuccessPage
