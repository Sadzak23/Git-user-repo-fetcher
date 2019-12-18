import React from 'react';
import { formatDate } from '../Format';

const RepoCount = ({ name, value }) => (
  <div>
    <p>{name}</p>
    <p className='count'>{value}</p>
  </div>
);

export const RepoCard = ({ repo }) => (
  <button
    className='repo-card'
    onClick={() => window.open(repo.html_url, '_blank')}
  >
    <h1>{repo.name}</h1>
    <div>
      <div className='repo-counts'>
        <RepoCount name='Watchers:' value={repo.watchers_count} />
        <RepoCount name='Stars:' value={repo.stargazers_count} />
        <RepoCount name='Forks:' value={repo.forks_count} />
      </div>
      <p
        className='repo-description'>
        {repo.description ? repo.description : 'No descrioption for this repository'}
      </p>
      <div className='repo-card-footer'>
        <p>License: <span style={{ fontWeight: 'bold' }}>{repo.license ? repo.license.name : 'No license'}</span></p>
        <p>Created at: <span style={{ fontWeight: 'bold' }}>{formatDate(repo.created_at)}</span></p>
      </div>
    </div>
  </button>
)