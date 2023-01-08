// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {items, onClickTopic} = props
  const {language, id} = items

  const selectedLanguage = () => {
    onClickTopic(id)
  }

  return (
    <li className="LanguageFilterItem-container">
      <button className="button" type="button" onClick={selectedLanguage}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
