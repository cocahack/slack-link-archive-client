import React, { FC } from 'react';

import './error-modal.css';

type Props = {
  onClose: () => void;
};

const ErrorModal: FC<Props> = React.memo((props: any) => {
  return (
    <React.Fragment>
      <div className="backdrop" onClick={props.onClose} />
      <div className="error-modal">
        <h2>에러 발생!</h2>
        <p>{props.children}</p>
        <div className="error-modal__actions">
          <button type="button" onClick={props.onClose}>
            확인
          </button>
        </div>
      </div>
    </React.Fragment>
  );
});

export default ErrorModal;
