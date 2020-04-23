import React, { FC, useEffect } from 'react';
import { RouteProps, useHistory } from 'react-router-dom';
import qs from 'qs';

import BigSpinner from '../../UI/big-spinner';
import axios from '../../http/backend/backend-axios';
import { printError } from '../../util';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SystemState } from '../../store/system/types';
import { API_VERSION } from '../../constants';

const Enter: FC<RouteProps> = (props) => {
  const history = useHistory();
  const { location } = props;
  const systemState = useSelector<RootState, SystemState>(
    (state) => state.system,
  );

  useEffect(() => {
    const { invitation } = qs.parse(location?.search || '', {
      ignoreQueryPrefix: true,
    });

    if (systemState.loggedIn || !invitation) {
      history.push('/register');
    } else {
      axios
        .post(`/${API_VERSION}/auth/enter`, { invitation })
        .then((res) => {
          return axios.post(`/${API_VERSION}/auth/login`);
        })
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

export default Enter;
