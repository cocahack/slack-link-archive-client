import React, { FC, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Auth from './auth/auth';
import BigSpinner from './UI/big-spinner';

const App: FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return isLoaded ? (
    <Switch>
      <Route path={'/register'} component={Auth} />
      <Route path={'/enter'} />
    </Switch>
  ) : (
    <BigSpinner />
  );
};

export default App;
