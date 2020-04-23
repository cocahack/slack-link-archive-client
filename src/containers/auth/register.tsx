import React, {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useState,
} from 'react';

import './auth.css';
import { backendAxiosInstance as axios } from '../../http';
import { validateEmailInput } from '../../util';
import { API_VERSION } from '../../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SystemState } from '../../store/system/types';
import { useHistory } from 'react-router-dom';

export const Register: FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const systemState = useSelector<RootState, SystemState>(
    (state) => state.system,
  );
  const history = useHistory();

  // redirect when the user logged in
  if (systemState.loggedIn) {
    history.push('/');
  }

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (validateEmailInput(email)) {
      axios
        .post(`/${API_VERSION}/auth/register`, { email })
        .then((res) => {
          setMessage('슬랙에서 초대 링크를 통해 접속해주세요.');
        })
        .catch((err) => {
          console.error(err.message);
          setMessage('이메일을 서버에 전달하는데 실패했습니다.');
        });
    } else {
      setMessage('이메일 형식이 맞지 않습니다.');
    }
  };

  const changeEmailHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [],
  );

  return (
    <div className={'Auth-form'}>
      <h1>코드스쿼드 링크 저장소 초대</h1>
      <p>
        슬랙에 등록된 이메일을 입력하시면, 확인 후 DM으로 초대 링크를
        보내드립니다.
      </p>
      {message ? <p style={{ color: 'red' }}>{message}</p> : null}
      <form onSubmit={submitHandler}>
        <label htmlFor={'email'}>이메일</label>
        <input
          className={'Auth-input'}
          type={'text'}
          id={'email'}
          autoComplete={'off'}
          value={email}
          onChange={changeEmailHandler}
        />
        <div className='Auth-form__actions'>
          <button type='submit'>보내기</button>
        </div>
      </form>
    </div>
  );
};
