// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoItem} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoItem
  return (
    <li className="repository-item-container">
      <img className="repo-icon" src={avatarUrl} alt={name} />
      <h1 className="repository-heading">{name}</h1>
      <div className="mini-icons">
        <img
          className="mini"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p>{issuesCount} stars</p>
      </div>
      <div className="mini-icons">
        <img
          className="mini"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="mini-icons">
        <img
          className="mini"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p>{starsCount} issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
