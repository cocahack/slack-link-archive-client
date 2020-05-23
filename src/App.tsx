import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Enter } from './containers/auth/Enter';
import { Register } from './containers/auth/register';
import Root from './containers/root/Root';


const App: FC = () => {
  return (
    <Switch>
      <Route path={'/register'} component={Register} />
      <Route path={'/enter'} component={Enter} />
      <Route path={'/'} exact component={Root} />
      <Route render={() => <div>404 Not Found</div>} />
    </Switch>
  );
};

export default App;
