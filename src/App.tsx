import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  BrowserRouterProps,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';

import './App.css';
import axios from './http/backend/backend-axios';
import { API_VERSION } from './constants';
import { User } from './store/user/types';
import { RootState } from './store';
import { login } from './store/system/actions';
import { printError } from './util';
import Auth from './containers/Auth/auth';
import Enter from './containers/Enter/Enter';

const mapState = (state: RootState) => ({ system: state.system });

const mapDispatch = {
  setLoggedIn: (user: User) => login(user),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & BrowserRouterProps;

type LoginDto = {
  user: User;
};

const App: FC<Props> = (props) => {
  const location = useLocation();
  const history = useHistory();
  const { setLoggedIn } = props;

  useEffect(() => {
    axios
      .post<LoginDto>(`/${API_VERSION}/auth/login`)
      .then((res) => {
        const payload = res.data;
        setLoggedIn(payload.user);
      })
      .catch((e) => {
        printError(e);
        if (!/^\/enter*/.test(location.pathname)) {
          history.push('/register');
        }
      });
  }, []);

  return (
    <div>
      <Switch>
        <Route path={'/'} exact render={() => <div>로그인 성공</div>} />
        <Route path={'/register'} component={Auth} />
        <Route path={'/enter'} component={Enter} />
        <Route render={() => <div>기본 라우터</div>} />
      </Switch>
    </div>
  );
};

export default connector(App);
