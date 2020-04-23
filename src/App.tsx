import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import { Register } from './containers/auth/register';
import { Enter } from './containers/auth/Enter';
import Root from './containers/Root';

const App: FC = () => {
  return (
    <div>
      <Switch>
        <Route path={'/register'} component={Register} />
        <Route path={'/enter'} component={Enter} />
        <Route path={'/'} exact component={Root} />
        <Route render={() => <div>404 Not Found</div>} />
      </Switch>
    </div>
  );
};

export default App;
