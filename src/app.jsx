import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HashRouter } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './app.module.css';
import Login from './components/login/login';
import Maker from './components/maker/maker';

function App({ authService, FileInput, cardRepository }) {
  return (
    <div className={styles.app}>
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Login authService={authService} />
          </Route>
          <Route path="/maker">
            <Maker
              FileInput={FileInput}
              authService={authService}
              cardRepository={cardRepository}
            />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
