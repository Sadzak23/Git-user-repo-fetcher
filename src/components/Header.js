import React from 'react';
import { history } from '../routers/AppRouter';

export const Header = ({ title, backBtn }) => (
  <header className="header">
    <div className="header-content">
      <h1>{title}</h1>
      {backBtn && <button onClick={() => history.goBack()} >
        <h1>{'Go Back'}</h1>
      </button>
      }
    </div>
  </header>
);