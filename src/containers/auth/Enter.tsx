import qs from 'qs';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouteProps, useHistory } from 'react-router-dom';
import { API_VERSION } from '../../constants';
import axios from '../../http/backend/backend-axios';
import { RootState } from '../../store';
import { SystemState } from '../../store/system/types';
import BigSpinner from '../../UI/big-spinner';
import { printError } from '../../util';


export const Enter: FC<RouteProps> = (props) => {
  const history = useHistory();
  const { location } = props;
  const systemState = useSelector<RootState, SystemState>(
    (state) => state.system,
  );

  useEffect(() => {
    const { code } = qs.parse(location?.search || '', {
      ignoreQueryPrefix: true,
    });

    if (systemState.loggedIn || !code) {
      history.push('/register');
    } else {
      axios
        .post(`/${API_VERSION}/auth/entrance`, { code })
        .then((res) => {
          history.push('/');
        })
        .catch((e) => {
          printError(e);
          history.push('/register');
        });
    }
  }, [location, history, systemState]);

  return <BigSpinner />;
};
