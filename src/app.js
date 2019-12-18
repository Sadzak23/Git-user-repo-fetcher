import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/styles.scss';
import AppRouter from './routers/AppRouter';
import { createStore } from 'redux';

const App = () => {
  const store = createStore((state = null, action) => {
    switch (action.type) {
      case 'SET_LAST_SEARCH_DATA':
        return action.data
      default:
        return state;
    }
  })

  return (
    <div className="App">
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));