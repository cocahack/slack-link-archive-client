import React, { FC, useEffect } from 'react';
import { RouteProps, useHistory } from 'react-router-dom';
import qs from 'qs';

import BigSpinner from '../../UI/big-spinner';
import axios from '../../http/backend/backend-axios';
import { printError } from '../../util';

const Enter: FC<RouteProps> = (props) => {
  const history = useHistory();

  useEffect(() => {
    const { invitation } = qs.parse(props.location?.search || '', {
      ignoreQueryPrefix: true,
    });

    if (invitation) {
      axios
        .post('/v1/auth/enter', { invitation })
        .then((res) => {
          history.push('/');
        })
        .catch((e) => {
          printError(e);
          history.push('/redirect');
        });
    }
  }, [history, props.location]);

  return <BigSpinner />;
};

export default Enter;
