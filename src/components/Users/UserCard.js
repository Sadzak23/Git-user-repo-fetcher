import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { history } from '../../routers/AppRouter';
import { formatError } from '../Format';

export const UserCard = ({ userData }) => {
  const [user, setUser] = useState(userData)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${userData.login}`)
      .then(response => setUser(response.data))
      .catch(e => formatError(e, setError));
  }, []);

  const goToRepo = () => {
    history.push({
      pathname: '/repos',
      state: user.repos_url
    })
  };
  return (
    <button className='user-card' onClick={goToRepo}>
      <img className='user-avatar' src={user.avatar_url} alt="User avatar image" />
      {error ?
        <div className='user-info'>
          <h2>User info unavailable</h2>
          <h3 className='error-msg'>{error}</h3>
        </div>
        :
        <div className='user-info'>
          <h2>{user.name ? user.name : 'Anonimous'}</h2>
          {
            user.bio ?
              <p className='user-description'>"{user.bio}"</p> :
              <p>No Bio provided</p>
          }
        </div>
      }
    </button>
  )
}