import React, { FC, Fragment, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { BrowserRouterProps, Redirect, useLocation } from 'react-router-dom';
import { API_VERSION } from '../../constants';
import axios from '../../http/backend/backend-axios';
import { RootState } from '../../store';
import { login } from '../../store/system/actions';
import { User } from '../../store/user/types';
import BigSpinner from '../../UI/big-spinner';
import { printError } from '../../util';
import { CardList } from './CardList/CardList';


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

const Root: FC<Props> = (props) => {
  const location = useLocation();
  const { setLoggedIn, system } = props;
  const [isInitialized, setIsInitialized] = useState(false);
  const [dest, setDest] = useState('');

  useEffect(() => {
    if (!system.loggedIn && !isInitialized) {
      axios
        .post<LoginDto>(`/${API_VERSION}/auth/login`)
        .then((res) => {
          const payload = res.data;
          setLoggedIn(payload.user);
        })
        .catch((e) => {
          printError(e);
          if (
            !/^\/enter*/.test(location.pathname) &&
            location.pathname !== '/register'
          ) {
            setDest('/register');
          }
        });
    }

    if (system.loggedIn) {
      setIsInitialized(true);
    }
  }, [system, setLoggedIn, location, isInitialized]);

  if (dest) {
    return <Redirect to={dest} />;
  }

  return (
    <div>
      {isInitialized ? (
        <Fragment>
          <CardList />
        </Fragment>
      ) : (
        <BigSpinner />
      )}
    </div>
  );
};

export default connector(Root);
