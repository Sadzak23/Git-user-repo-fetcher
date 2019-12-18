import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from '../Header';
import { RepoCard } from './RepoCard';
import Loading from '../Loading';
import { formatError } from '../Format';

export const ReposPage = (props) => {
  const [repos, setRepos] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get(props.location.state)
      .then(response => {
        setRepos(response.data)
        setIsLoading(false)
      })
      .catch(e => {
        formatError(e, setError)
        setIsLoading(false)
      })
  }, [])
  return (
    <div>
      <Header title="Repos" backBtn />
      <div className='page-container'>
        {isLoading ? <Loading /> :
          error ?
            <h2 className='error-msg'>{error}</h2> :
            <div>
              {repos.length > 0 ?
                <div>
                  <div className='list'>
                    {repos.map(repo => <RepoCard key={repo.id} repo={repo} />)}
                  </div>
                </div> :
                <h2 className="center-text">This user has no repositories</h2>
              }
            </div>
        }
      </div>
    </div>
  )
}

export default ReposPage