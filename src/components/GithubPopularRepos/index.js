import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const activeLanguageStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    repoData: [],
    apiStatus: activeLanguageStatus.initial,
    activeLanguageId: languageFiltersData[0].id,
  }

  componentDidMount = () => {
    this.getProducts()
  }

  getProducts = async () => {
    const {activeLanguageId} = this.state

    this.setState({apiStatus: activeLanguageStatus.inProgress})
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`,
    )

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updateData = data.popular_repos.map(each => ({
        id: each.id,
        name: each.name,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({
        repoData: updateData,
        apiStatus: activeLanguageStatus.success,
      })
    } else {
      this.setState({apiStatus: activeLanguageStatus.failure})
    }
  }

  onClickTopicId = id => {
    // const activeId = languageFiltersData.find(each => each.id === id)
    this.setState({activeLanguageId: id}, this.getProducts)
  }

  renderRepositories = () => {
    const {repoData} = this.state
    return (
      <ul className="repositoriesList">
        {repoData.map(each => (
          <RepositoryItem repoItem={each} key={each.key} />
        ))}
      </ul>
    )
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
    </div>
  )

  languageApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case activeLanguageStatus.inProgress:
        return this.renderLoading()
      case activeLanguageStatus.success:
        return this.renderRepositories()
      case activeLanguageStatus.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="github-repo">
        <h1 className="heading">Popular</h1>
        <ul className="github-container">
          {languageFiltersData.map(every => (
            <LanguageFilterItem
              items={every}
              key={every.id}
              onClickTopic={this.onClickTopicId}
            />
          ))}
        </ul>
        <div className="repo-container">{this.languageApiStatus()}</div>
      </div>
    )
  }
}

export default GithubPopularRepos
