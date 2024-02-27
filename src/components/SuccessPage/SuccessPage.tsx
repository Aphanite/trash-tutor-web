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

function ToggleMaximised({ maximised, toggleMaximised }: any) {
  const Icon = maximised ? ChevronDown : ChevronUp
  return <Icon style={{ alignSelf: 'center' }} onClick={toggleMaximised} />
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
  const maximisedStyle = styles[isMaximised ? 'show' : 'hidden']

  function capitalize(string: string) {
    return string[0].toUpperCase() + string.substring(1)
  }

  return (
    <ResultPage uri={uri} maximised={isMaximised}>
      <div className={styles.textContainer}>
        <ToggleMaximised
          maximised={isMaximised}
          toggleMaximised={() => setIsMaximised(current => !current)}
        />

        <p className={styles.locationInfo}>How to recycle in {location || 'general'}</p>
        <h2>{capitalize(object)}</h2>

        <Label color={binColor}>{categoryName.toLowerCase()}</Label>

        <p className={`${styles.question} ${maximisedStyle}`}>What belongs in this category?</p>
        <p className={maximisedStyle}>{chosenCategory.description}</p>

        <p className={`${styles.question} ${maximisedStyle}`}>Where can I dispose of it?</p>
        <div className={styles.disposalInfo}>
          <MapPin size={16} style={{ color: `var(--${binColor})` }} />
          <p>{chosenCategory?.domestic ? 'At domestic bin' : 'At drop-off or collection point'}</p>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <p className={`${styles.disclaimer} ${maximisedStyle}`}>
          Please note: For general guidance only. Confirm with your local service as recycling rules
          may vary.
        </p>

        <button
          className="btn secondary"
          onClick={() => {
            navigate('camera')
          }}
        >
          Scan again
        </button>
      </div>
    </ResultPage>
  )
}

export default SuccessPage
