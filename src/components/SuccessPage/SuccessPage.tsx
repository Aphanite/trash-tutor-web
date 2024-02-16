import { Label } from '../Label/Label'
import { ResultPage } from '../ResultPage/ResultPage'
import { useLocation } from '../../providers/LocationProvider'
import { useWasteContext } from '../../providers/WasteCategoriesProvider'
import styles from './SuccessPage.module.css'
import { usePage } from '../../providers/PageProvider'
import { wasteColors } from '../../helpers/wasteHelpers'

export type SuccessParams = {
  uri: string
  object: string
  categoryName: string
}

function SuccessPage({ object, categoryName, uri }: SuccessParams) {
  const { navigate } = usePage()
  const location = useLocation()
  const { getCategoriesForLocation } = useWasteContext()

  const wasteCategories = getCategoriesForLocation(location)

  const chosenCategory = wasteCategories?.find(c => {
    return c.categoryName === categoryName
  })

  // is fallback color necessary?
  const binColor = chosenCategory?.binColor || 'null'

  return (
    <ResultPage uri={uri}>
      <div className={styles.titleContainer}>
        <p className={styles.locationInfo}>How to recycle in {location || 'general'}</p>
        <h2>{capitalize(object)}</h2>
        <Label color={wasteColors[binColor]}>{categoryName.toLowerCase()}</Label>
      </div>
      <p className={styles.disclaimer}>
        Please note: For general guidance only. Confirm with your local service as recycling rules
        may vary.
      </p>

      <button
        className={styles.btn}
        onClick={() => {
          navigate('camera')
        }}
      >
        Scan again
      </button>
    </ResultPage>
  )
}

function capitalize(string: string) {
  return string[0].toUpperCase() + string.substring(1)
}

export default SuccessPage
